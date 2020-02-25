const robot = require("robotjs")
var path = require('path');
global.appDir = path.join(__dirname, '../')

var screenSize = robot.getScreenSize();
const baseFun = require(appDir + '/base/func')
const events = require(appDir + '/base/events')
var http = require('http');
global.icons = {}
let iconsArr = require('./icons')
let nowLv = 0
let iconsArrs = []

let fack = async () => {

}
global.windowPixel = {
    x: 0,
    y: 0,
    w: 920,//800,
    h: 750,//600
}
let fight
let dodo = async (arr) => {
    let iconsPxArr = await baseFun.getIconPx(iconsArrs)
    //验证是否存在指示箭头 如果存在直接右键点击
    let zzjtpx = iconsPxArr.jsons.left ||
        iconsPxArr.jsons.right ||
        // iconsPxArr.jsons.right1 ||
        iconsPxArr.jsons.top ||
        iconsPxArr.jsons.bottom
    if (zzjtpx) {
        await events.mouseMove([zzjtpx.x, zzjtpx.y])
        await events.click('right')
        fight = true
    }
    if (iconsPxArr.jsons.rwstart) {
        events.keytap('space')
    }
    await events.sleep(1000)
    console.log(iconsPxArr.jsons)
    return await dodo(arr)
}
let fun = async () => {
    let iconsA = await iconsArr()

    for (let i in iconsA) {
        iconsArrs.push(iconsA[i])
    }
    for (let i = 1; i < 95; i++) {
        let lvIcon = iconsA[i] && await baseFun.getIconPx(iconsA[i])
        if (lvIcon && lvIcon.jsons[i] && lvIcon.jsons[i].x) {
            nowLv = i
            i = 100000;
        }
    }

    await dodo(iconsArrs)
}

fun()


http.createServer(function (request, response) {

}).listen(8000);