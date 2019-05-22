const robot = require("robotjs")
const getPixels = require("get-pixels")
const screenshot = require('screenshot-desktop')
const checks=require('./check/index')
var fs = require('fs');
var AipOcrClient = require("baidu-aip-sdk").ocr;
var APP_ID = "16059958";
var API_KEY = "j7ECvujFdkjVVOZvgddu6kR0";
var SECRET_KEY = "hEpClWTOApsB8bGwnTZaQnMhwQwNYOOf";
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
var HttpClient = require("baidu-aip-sdk").HttpClient;
HttpClient.setRequestOptions({ timeout: 5000 });


// var image = fs.readFileSync("./buildwx/wxstatic/media/bindBanner.48174932.png").toString("base64");
// client.generalBasic(image).then(function(result) {
// console.log(JSON.stringify(result));
// }).catch(function(err) {
// // 如果发生网络错误
// console.log(err);
// });


const datas =func = {
    //获取图信息
    getIcon: (imgpath, ico) => {

        getPixels(imgpath, function (err, pixels) {
            if (err) {
                console.log(err)
                return
            }
            global.icons[ico] = { pixels: pixels.shape, color: [], obj: pixels }
            console.log(imgpath, ico)
            for (let i = 0; i < pixels.shape[1]; i++) {
                for (let j = 0; j < pixels.shape[0]; j++) {
                    global.icons[ico].color.push(
                        pixels.get(j, i, 0) + ',' + pixels.get(j, i, 1) + ',' + pixels.get(j, i, 2) + ',' + pixels.get(j, i, 3)
                    )
                }
            }

        })
    },
    //获取
    getScreen: (fun) => {
        screenshot({ filename: 'shot.png' }).then((imgPath) => {
            global.imgPath = imgPath
            fun()
        }).catch((err) => {
            getScreen(fun)
        });
    },
    getCapture: (a, b, c, d) => {
        return robot.screen.capture(a, b, c, d)
    },
    getWindow: () => {
        datas.getScreen(() => {
            getPixels(global.imgPath, function (err, pixels) {
                if (err) return
                global.icons[icons] = { pixels: pixels.shape, color: [] }
                console.log('开始循环')
                for (let i = 0; i < pixels.shape[1]; i++) {
                    for (let j = 0; j < pixels.shape[0]; j++) {
                        let thisColor = (pixels.get(j, i, 0) + ',' + pixels.get(j, i, 1) + ',' + pixels.get(j, i, 2) + ',' + pixels.get(j, i, 3))

                        let windowColor = 122 + ',' + 158 + ',' + 194 + ',' + 255
                        if (thisColor == windowColor) {

                            if (global.windowPixel && global.windowPixel.w > 500 && global.windowPixel.h > 500) {
                                i = j = 1000000000
                                console.log(global.windowPixel)
                                return;
                            }
                            for (var h = 0; h < 10000; h++) {

                                let hColor = pixels.get(j, i + h, 0) + ',' + pixels.get(j, i + h, 1) + ',' + pixels.get(j, i + h, 2) + ',' + pixels.get(j, i + h, 3)
                                if (hColor != thisColor) {
                                    if (!global.windowPixel) {
                                        global.windowPixel = {
                                            h: h - 1,
                                            x: j,
                                            y: i,
                                        }
                                    } else {
                                        if (!global.windowPixel.h || global.windowPixel.h < h - 1) {
                                            global.windowPixel.h = h - 1
                                            global.windowPixel.x = j
                                            global.windowPixel.y = i
                                        }
                                    }

                                    h = 10000000;
                                }
                            }
                            for (var w = 0; w < 10000; w++) {
                                let wColor = pixels.get(j + w, i, 0) + ',' + pixels.get(j + w, i, 1) + ',' + pixels.get(j + w, i, 2) + ',' + pixels.get(j + w, i, 3)
                                if (wColor != thisColor) {
                                    if (!global.windowPixel.w || global.windowPixel.w < w - 1) {
                                        global.windowPixel.w = w - 1

                                    }
                                    w = 10000000;
                                }

                            }
                        }
                    }
                }
                console.log(global.windowPixel)
            })
        })
    },
    //获取指定元素位置
    getPx: (icons, fun,funArr) => {
        // console.log(icons)
        if (icons.color) {
            icons = [icons]
        }
        datas.getScreen(() => {
            getPixels(global.imgPath, function (err, pixels) {
                if (err) return
                // global.icons[icons] = { pixels: pixels.shape, color: [] }
                var findIs = false, pxArr = [],iconLength=[]
                for (let i = global.windowPixel.y; i < global.windowPixel.y + global.windowPixel.h; i++) {
                    for (let j = global.windowPixel.x; j < global.windowPixel.x + global.windowPixel.w; j++) {
                        let thisColor = (pixels.get(j, i, 0) + ',' + pixels.get(j, i, 1) + ',' + pixels.get(j, i, 2) + ',' + pixels.get(j, i, 3))
                        //console.log(i,j,'color',thisColor,'jjj',icons.color[0])
                        //console.log(icons)
                        for (let mts = 0; mts < icons.length; mts++) {
                            let item = icons[mts]
                            if (item.color[0] == thisColor) {
                                let sumNum = 0
                                for (let m = 0; m < item.pixels[1]; m++) {
                                    for (let s = 0; s < item.pixels[0]; s++) {
                                        let mcolor = (pixels.get(j + s, i + m, 0) + ',' + pixels.get(j + s, i + m, 1) + ',' + pixels.get(j + s, i + m, 2) + ',' + pixels.get(j + s, i + m, 3))
                                        let scolor = (item.obj.get(s, m, 0) + ',' + item.obj.get(s, m, 1) + ',' + item.obj.get(s, m, 2) + ',' + item.obj.get(s, m, 3))
                                        if (mcolor == scolor) {
                                            sumNum++
                                        }
                                    }
                                }
                                if (sumNum / item.color.length > 0.8) {
                                    pxArr[mts] = { x: j - global.windowPixel.x, y: i - global.windowPixel.y }

                                } else {
                                    pxArr[mts] = pxArr[mts] || false
                                }
                                if (sumNum / item.color.length > 0.8) {
                                    iconLength[mts]=iconLength[mts] || []
                                    iconLength[mts].push({ x: j - global.windowPixel.x, y: i - global.windowPixel.y })

                                } else {
                                    iconLength[mts] = iconLength[mts] || []
                                }
                            }
                        }
                    }
                }
                fun && fun(pxArr,iconLength)

            })
        })
    },
    getText: () => {
        let picData = datas.getCapture(global.windowPixel.x, global.windowPixel.y, global.windowPixel.w, global.windowPixel.h)
        // console.log(picData,9999999999999999999999999999999999999)
        var image = fs.readFileSync("./shot.png");
        fs.writeFileSync('./cat.text', picData.image);

        //console.log(imgData)
        client.generalBasic(picData.image).then(function (result) {
            console.log(JSON.stringify(result));
        }).catch(function (err) {
            // 如果发生网络错误
            console.log(err);
        });
    },
    robotAction: (xy, mouse, key, fun) => {
        let getPic=datas.getPic
        setTimeout(() => {
            let nowpy = robot.getMousePos()
            var pyxc = (nowpy.x - xy[0]) / 10, pyyc = (nowpy.y - xy[1]) / 10
            for (let i = 0; i <= 10; i++) {
                robot.moveMouse(nowpy.x - pyxc * i, nowpy.y - pyyc * i);
            }
            thenFun = (zz, py) => {
                console.log('到达指定位置开始验证虚拟坐标')
                y = py.y + (xy[1] - zz[1])
                x = py.x + (xy[0] - zz[0])
                tx = Math.abs(xy[0] - zz[0])
                ty = Math.abs(xy[1] - zz[1])
                let ofsets = global.nowObj.ofset || [5, 5]
                if ((tx < ofsets[0] && ty < ofsets[1]) || !zz[0]) {
                    console.log('位置坐标验证通过')
                    if (global.nowObj.check == 'npc') {
                        for (let i = 0; i <= 10; i++) {
                            robot.moveMouse(py.x, py.y - i * 10);//sdfasdf
                        }
                    }
    
                    var pp = new Promise((resolve, reject) => {
                        if (global.nowObj.checkBefore) {
                            console.log('开始验证执行条件判断',global.nowObj.checkBefore)
                            checks[global.nowObj.checkBefore] ? checks[global.nowObj.checkBefore](resolve, reject):false&&resolve(true)
    
                        }else{
                            console.log('位置坐标验证通过')
                            resolve(true)
                        }
    
                    });
                    //在那之前的判断
                    Promise.all([pp]).then((values) => {
                        if(!values[0])return;
                        global.nowObj.beforeKey && robot.keyTap(...global.nowObj.beforeKey)
                        global.nowObj.beforeKeyArr && global.nowObj.beforeKeyArr.forEach((item) => {
                            robot.keyTap(item)
                        })
                        setTimeout(() => {
                            mouse && robot.mouseClick(mouse)
                            setTimeout(() => {
    
                                if (global.nowObj.checkAfter) return func.getPx([global.icons[global.nowObj.checkAfter]], (a, b) => {
                                    
                                    //点击后判断是否存在某物
                                    if (a[0]) {
                                        robotFun()//getPic(zz[0] ? zzObj.zz : zzObj.apczz)
                                    } else {
                                        global.nowObj.keyArr && global.nowObj.keyArr.forEach((item) => {
                                            
                                            robot.keyTap(item)
                                        })
                                        global.nowObj.mcArr && global.nowObj.mcArr.forEach((item) => {
                                            robot.mouseClick(item)
                                        })
                                        key && robot.keyTap(...key)
                                        fun && fun()
                                    }
                                })
                                global.nowObj.keyArr && global.nowObj.keyArr.forEach((item) => {
                                    
                                    robot.keyTap(item)
                                })
                                global.nowObj.mcArr && global.nowObj.mcArr.forEach((item) => {
                                    robot.mouseClick(item)
                                })
                                key && robot.keyTap(...key)
                                fun && fun()
                            }, 200)
                        }, 100)
    
                    })
    
    
    
                    return
                }
                if (!zz[0]) {
                    x = xy[0], y = xy[1]
                }
                let nowpys = robot.getMousePos()
                var pyxcs = (nowpys.x - x) / 3, pyycs = (nowpys.y - y) / 3
                for (let i = 0; i <= 3; i++) {
                    robot.moveMouse(nowpys.x - pyxcs * i, nowpys.y - pyycs * i);
                }
                
                if(!zz[0]){
                    robot.moveMouse(global.windowPixel.x +100, global.windowPixel.y+100);
                }
                getPic(zzObj.zz)
    
            }
            ok = () => {
                robot.mouseClick(mouse)
            }
            getPic(zzObj.zz)
    
        }, 50)
    },
    getPic:(zzArr) => {
        let imgPaths,getZZPx=datas.getZZPx,getPic=datas.getPic
        debugger
        console.log('开始截取图片')
        try {
            screenshot({ filename: 'shot.png' }).then((imgPath) => {
                console.log('开始截取图片成功')
                getZZPx(zzArr, imgPath)
    
            }).catch((err) => {
                console.log(err)
                getPic(zzArr)
            });
        } catch (e) {
            console.log(e)
        }
    
    
    },
    getZZPx :(zz, imgPath) => {
        if (!isOpen) return false
        nums = 0
        nowPy = []
        arrJt = []
        getPixels(imgPath, function (err, pixels) {
            console.log(imgPath)
            if (err) {
                getZZPx = (zz, imgPath)
                return
            }
            let heighth = global.windowPixel.h + global.windowPixel.y
            let widthx = global.windowPixel.w + global.windowPixel.x
            let zzPx = robot.getMousePos()
            for (let j = zzPx.y - 100; j <= zzPx.y + 100; j++) {
                for (let i = zzPx.x - 100; i <= zzPx.x + 100; i++) {
                    let rgba = pixels.get(i, j, 0) + ',' + pixels.get(i, j, 1) + ',' + pixels.get(i, j, 2) + ',' + pixels.get(i, j, 3)
                    arrJt.push(rgba)
    
                    if (rgba == zz[0]) {
                        let num = 0
                        for (var t = 0; t < 21; t++) {
                            nowRgb = pixels.get(t, t, 0) + ',' + pixels.get(t, t, 1) + ',' + pixels.get(t, t, 2) + ',' + pixels.get(t, t, 3)
                            onnowRgb = pixels.get(t + i, t + j, 0) + ',' + pixels.get(t + i, t + j, 1) + ',' + pixels.get(t + i, t + j, 2) + ',' + pixels.get(t + i, t + j, 3)
    
                            if (zz.indexOf(onnowRgb) >= 0) {
                                num++
                            }
                        }
    
                        if (num > nums) {
                            //console.log([i, j], num)
                            nums = num;
                            nowPy = [i, j]
                        }
                    }
                }
            }
    
            thenFun(nowPy, robot.getMousePos())
        })
    
        return nowPy
    }
}

module.exports = datas