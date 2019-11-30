const getPixels = require('get-pixels')
const screenshot = require('screenshot-desktop')
const robot = require('robotjs')
const oldIndex = require('../index')
var fs = require('fs')
let getWindow = async px => {
  return new Promise((resole, reject) => {
    oldIndex.getWindow(r => {
      resole(r)
    })
  })
}
let datas = {
  getImg() {
    return screenshot({ filename: 'shot.png' })
      .then(imgPath => {
        global.imgPath = imgPath
        return imgPath
      })
      .catch(err => {
        datas.getImg
      })
  },
  async getZZ(path) {
    return new Promise(async (resole, reject) => {
      let zz = []
      getPixels(path, function(err, pixels) {
        if (err) return
        for (let i = 0; i < 21; i++) {
          zz.push(
            pixels.get(i, i, 0) +
              ',' +
              pixels.get(i, i, 1) +
              ',' +
              pixels.get(i, i, 2) +
              ',' +
              pixels.get(i, i, 3)
          )
          zz.push(
            pixels.get(i + 1, i + 1, 0) +
              ',' +
              pixels.get(i + 1, i + 1, 1) +
              ',' +
              pixels.get(i + 1, i + 1, 2) +
              ',' +
              pixels.get(i + 1, i + 1, 3)
          )
        }
        resole(zz)
      })
    })
  },
  getCutImg: async r => {
    return screenshot({ filename: 'shot.png' })
  },
  getWindow: async px => {
    return new Promise((resole, reject) => {
      oldIndex.getWindow(r => {
        global.windowPixel = r
        resole(r)
      })
    })
  },
  async getMose() {
    let zzArr = [await datas.getZZ('D:/project/ganemh/img/zhizhen.png')]
    global.windowPixel = await datas.getWindow()
    return new Promise((resole, reject) => {
      global.windowPixel = global.windowPixel
      let arrJt = []

      getPixels(imgPath, function(err, pixels) {
        if (err) {
          getZZPx = (zz, imgPath)
          return
        }
        let nowPy = []
        let nums = 0
        let heighth = global.windowPixel.h + global.windowPixel.y
        let widthx = global.windowPixel.w + global.windowPixel.x
        let zzPx = robot.getMousePos()

        for (let j = zzPx.y - 100; j <= zzPx.y + 100; j++) {
          for (let i = zzPx.x - 100; i <= zzPx.x + 100; i++) {
            let rgba =
              pixels.get(i, j, 0) +
              ',' +
              pixels.get(i, j, 1) +
              ',' +
              pixels.get(i, j, 2) +
              ',' +
              pixels.get(i, j, 3)
            arrJt.push(rgba)
            zzArr.forEach(zz => {
              if (rgba == zz[0]) {
                let num = 0
                for (var t = 0; t < 21; t++) {
                  nowRgb =
                    pixels.get(t, t, 0) +
                    ',' +
                    pixels.get(t, t, 1) +
                    ',' +
                    pixels.get(t, t, 2) +
                    ',' +
                    pixels.get(t, t, 3)
                  onnowRgb =
                    pixels.get(t + i, t + j, 0) +
                    ',' +
                    pixels.get(t + i, t + j, 1) +
                    ',' +
                    pixels.get(t + i, t + j, 2) +
                    ',' +
                    pixels.get(t + i, t + j, 3)

                  if (zz.indexOf(onnowRgb) >= 0) {
                    num++
                  }
                }
                if (num > nums) {
                  //console.log([i, j], num)
                  nums = num
                  nowPy = [i, j]
                }
              }
            })
          }
        }
        resole(nowPy)
        //thenFun(nowPy, robot.getMousePos())
      })
    })
  },
  getIconPx: icons => {
    return new Promise((resole, reject) => {
      //  console.log(icons)
      oldIndex.getPx(icons, (pxArr, iconLength, jsons) => {
        resole({
          pxArr,
          iconLength,
          jsons
        })
      })
    })
  },
  isStop: async () => {
    global.icons.isStop =
      global.icons.isStop ||
      (await func.getIcon('D:/project/ganemh/img/isStop.png', 'isStop'))
    let stopPx = await datas.getIconPx(global.icons.isStop)
    stopPx = stopPx.jsons.isStop
    await datas.getCutImg()
    return new Promise((resole, reject) => {
      getPixels(global.imgPath, function(err, pixels) {
        if (err) return
        let isStops = []
        for (let i = stopPx.x; i < stopPx.x + 15; i++) {
          for (let j = stopPx.y; j < stopPx.y + 80; j++) {
            isStops.push(pixels.get(i, j, 0))
          }
        }
        global.isStop = global.isStop || []
        let isnotok = 0
        isStops.forEach((item, index) => {
          if (item != global.isStop[index]) {
            isnotok++
          }
        })
        if (isnotok > 5) {
          global.isStop = isStops
          resole(false)
          return false
        } else {
          resole(true)
        }
      })
    })
  }
}
module.exports = datas
