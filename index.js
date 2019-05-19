const robot = require("robotjs")
const getPixels = require("get-pixels")
const screenshot = require('screenshot-desktop')
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


const datas = {
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
                                if (sumNum / item.color.length > 0.5) {
                                    pxArr[mts] = { x: j - global.windowPixel.x, y: i - global.windowPixel.y }

                                } else {
                                    pxArr[mts] = pxArr[mts] || false
                                }
                                if (sumNum / item.color.length > 0.9) {
                                    console.log(1)
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
    }
}

module.exports = datas