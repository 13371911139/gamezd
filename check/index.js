//const func = require('../index')
const robot = require("robotjs")
const getPixels = require("get-pixels")

const check = {
    djl: (obj) => {
        console.log('验证道具栏是否打开,延迟截图50毫秒')
        setTimeout(() => {
            func.getPx([global.icons.djl], (a, b) => {
                if (!a[0]) {
                    console.log('未打开物品栏，开始执行打开物品栏操作')
                    robot.keyTap('e', 'alt')
                    check.djl(obj)
                } else {
                    console.log('物品栏打开成功，开始执行后续操作', obj.fun)
                    obj.fun ? obj.fun(obj) : obj.resolve(true)
                }
            })
        }, 50)

    },
    dian777: (obj) => {
        func.getPx([global.icons[global.nowObj.checkBefore], global.icons.djl], (a, b) => {
            console.log(a, '22', b)
            if (!a[0]) {
                if (!a[1]) {
                    console.log('当前未打开物品栏，开始打开物品栏并校验')
                    robot.keyTap('e', 'alt')
                    check.djl({
                        fun: () => {
                            console.log('已打开物品栏')
                            func.robotAction({
                                xy: [537, 309], key: false, mouseKey: 'right', check: 'buqi', checkBefore: 'djl', fun: () => {
                                    check[global.nowObj.checkBefore](resolve, reject)
                                }
                            })
                        }
                    })
                } else {
                    console.log('验证物品栏已经打开，但是飞行棋窗口没有打开开始尝试重新打开飞行棋')
                    func.robotAction({
                        xy: [537, 309], key: false, mouseKey: 'right', checkBefore: 'djl', fun: () => {
                            check[global.nowObj.checkBefore](resolve, reject)
                        }
                    })
                }

            } else {
                obj.fun ? obj.fun(obj) : obj.resolve(true)
            }
        })
    },
    gml: (obj) => {
        func.getPx([global.icons.gml], (a, b) => {
            if (!a[0]) {
                robot.keyTap('f3')
                check.gml(obj)
            } else {
                obj.fun ? obj.fun(obj) : obj.resolve(true)
            }
        })
    },
    //判断飞行符是否打开，如果没有判断是否打开物品栏，如果也没有执行alt e
    zzffIcon: (obj) => {
        func.getPx([global.icons.zzffIcon], (a, b) => {
            if (!a[0]) {
                check.djl({
                    fun: () => {
                        func.robotAction([488, 309], 'right', false, () => {
                            check[global.nowObj.checkBefore](resolve, reject)
                        })
                    }
                })

            } else {
                obj.fun ? obj.fun(obj) : obj.resolve(true)
            }
        })
    },
    cktext: (obj) => {
        func.getPx([global.icons.cktext], (a, b) => {
            if (!a[0]) {
                func.robotAction({
                    xy: [143, 316], checkBefore: 'cktext', fun: () => {
                        check.cktext(obj)
                    }
                })


            } else {
                obj.fun ? obj.fun(obj) : obj.resolve(true)
            }
        })
    },
    ...(() => {
        let ck = {}
        for (let i = 1; i <= 7; i++) {
            ck['ck' + i] = (obj) => {
                func.getPx([global.icons['ck' + i]], (a, b) => {
                    if (!a[0]) {
                        func.robotAction({
                            xy: [55 + i * 19, 386], mouseKey: 'left', checkBefore:'ck', fun: () => {
                                check['ck' + i](obj)
                            }
                        })
                    } else {
                        obj.fun ? obj.fun(obj) : obj.resolve(true)
                    }
                })
            }

        }
        return ck
    })(),
    ck: (obj) => {
        //判断是否再西凉ff位置，不是飞一下否则判断是否打开仓库，没打开去打开打开了就继续
        // { xy: [323, 177], mouseKey: 'left', check: 'npc' },//打开仓库管理员
        // { xy: [143, 316], mouseKey: 'left', beforeKey: ['f9'], checkBefore: 'cktext', type: 'have' },//进入仓库
        func.getPx([global.icons.ck, global.icons.xlff], (a, b) => {
            if (!a[0], !a[1]) {
                console.log('没有打开仓库且没有在西凉ff')
                func.robotAction({
                    xy: [143, 316], checkBefore: 'djl', fun: () => {
                        check.cktext(obj)
                    }
                })
            } else if (a[0] && !a[1]) {
                console.log('仓库存在但是位置不是西凉ff')
                func.robotAction({
                    xy: [143, 316], checkBefore: 'cktext', fun: () => {
                        check.ck(obj)
                    }
                })

            } else if (!a[0] && a[1]) {
                console.log('我在西凉ff但是没有打开仓库')
                func.robotAction({
                    xy: [323, 177], mouseKey: 'left', check: 'npc', fun: () => {
                        func.robotAction({
                            xy: [143, 316], mouseKey: 'left', beforeKey: ['f9'], checkBefore: 'cktext', type: 'have', fun: () => {
                                check.ck(obj)
                            }
                        })
                    }
                })
            } else {
                obj.fun ? obj.fun(obj) : obj.resolve(true)
            }
        })
    },
    fbl: (obj) => {
        console.log('验证道具栏是否打开,延迟截图50毫秒')
        func.getPx([global.icons.fbl], (a, b) => {
            if (!a[0]) {
                console.log('未打开物品栏，开始执行打开物品栏操作')
                robot.keyTap('e', 'alt')
                check.djl(obj)
            } else {
                console.log('法宝栏已打开，开始执行后续操作', obj.fun)
                obj.fun ? obj.fun(obj) : obj.resolve(true)
            }
        })

    },
    select77:(obj)=>{
        
        func.getPx([global.icons.select77], (a, b) => {
            if (!a[0]) {
                console.log('未打开物品栏，开始执行打开物品栏操作')
                robot.keyTap('e', 'alt')
                check.djl(obj)
            } else {
                console.log('法宝栏已打开，开始执行后续操作', obj.fun)
                obj.fun ? obj.fun(obj) : obj.resolve(true)
            }
        })
    }
}
module.exports = check