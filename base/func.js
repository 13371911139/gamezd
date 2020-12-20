const getPixels = require('get-pixels')
const screenshot = require('screenshot-desktop')
const robot = require('robotjs')
const oldIndex = require('../index')
const domt = require('../shimen/dosomeThing')
var fs = require('fs')
let getWindow = async px => {
  return new Promise((resole, reject) => {
    oldIndex.getWindow(r => {
      resole(r)
    })
  })
}
let datas = {
  getImg () {
    return screenshot({ filename: 'shot.png' })
      .then(imgPath => {
        global.imgPath = imgPath
        return imgPath
      })
      .catch(err => {
        datas.getImg
      })
  },
  async getZZ (path) {
    return new Promise(async (resole, reject) => {
      let zz = []
      getPixels(path, function (err, pixels) {
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
        console.log(r, 99999)
        resole(r)
      })
    })
  },
  async getMose () {
    let zzArr = [await datas.getZZ(appDir + '/img/zhizhen.png')]
    global.windowPixel = await datas.getWindow()
    return new Promise((resole, reject) => {
      global.windowPixel = global.windowPixel
      let arrJt = []

      getPixels(imgPath, function (err, pixels) {
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
  getIconPx: (icons, send) => {
    return new Promise((resole, reject) => {
      //  console.log(icons)
      oldIndex.getPx(icons, (pxArr, iconLength, jsons, list) => {
        resole({
          pxArr,
          iconLength,
          jsons,
          list
        })
      }, send)
    })
  },
  getColor: (pic, x, y) => {
    return `${pic.get(x, y, 0)}${pic.get(x, y, 1)}${pic.get(x, y, 2)}${pic.get(
      x,
      y,
      3
    )}`
  },
  getTextPosition: async (text) => {

  },
  isStop: async () => {
    global.oldc = global.oldc || ''
    global.icons.isStop =
      global.icons.isStop ||
      (await func.getIcon(appDir + '/img/alltitle.png', 'isStop'))
    let stopPx = await datas.getIconPx(global.icons.isStop)
    let pxs = stopPx.jsons.isStop || {}

    pxs.oldc = global.oldc
    await datas.getCutImg()
    return new Promise((resole, reject) => {
      getPixels(global.imgPath, function (err, pixels) {
        if (err) return
        let newc =
          parseInt(datas.getColor(pixels, pxs.x + 5, pxs.y - 20)) +
          parseInt(datas.getColor(pixels, pxs.x + 5, pxs.y - 25)) +
          parseInt(datas.getColor(pixels, pxs.x + 10, pxs.y - 20)) +
          parseInt(datas.getColor(pixels, pxs.x + 10, pxs.y - 25)) +
          parseInt(datas.getColor(pixels, pxs.x + 20, pxs.y - 20)) +
          parseInt(datas.getColor(pixels, pxs.x + 20, pxs.y - 25))

        if (pxs.oldc !== newc) {
          console.log(pxs.oldc, newc, 111)
          global.isStop = false
          global.oldc = pxs.oldc = newc

          resole(false)
        } else {
          console.log('似乎停了')
          if (!global.isStop) {
            global.isStop = true
            resole(false)
          } else {
            global.isStop = false
            resole(true)
          }
        }
      })
    })
  },
  selectMini: async () => {
    let iconsm = await datas.getIconPx(allIcons.fcs.huoshangdlg)
    let sp = await datas.getIconPx([
      allIcons.fcs.psdao,
      allIcons.fcs.psmianbu,
      allIcons.fcs.psshanzi,

      allIcons.fcs.psmianfen,
      allIcons.fcs.psmutou,
      allIcons.fcs.psfu,
      allIcons.fcs.pslurong,

      allIcons.fcs.psyan,
      allIcons.fcs.psmaozi,
      allIcons.fcs.psjiu,
      allIcons.fcs.pslazhu,
    ])
    sp.list = sp.list.filter(r => {
      return r
    })
    let buyItem = { se: 0 }
    let sellItem = { se: 0 }
    let upbuyNum = global.buyNum || 0
    for (let i = 0; i < sp.list.length; i++) {
      let item = sp.list[i]
      await events.mouseMove([item.x + 10, item.y + 10])
      await events.click()
      await events.mouseMove([item.x + 10, item.y - 40])

      let number = 0
      //判断是买还是卖
      if (item.x > iconsm.jsons.huoshangdlg.x + 150) {
        number = await datas.getNum(iconsm, true)

        if (global.buyNum < number || !number) {
          await events.mouseMove([
            iconsm.jsons.huoshangdlg.x + 225,
            iconsm.jsons.huoshangdlg.y + 309
          ])
          await events.click()
          await events.mouseMove([
            iconsm.jsons.huoshangdlg.x + 225,
            iconsm.jsons.huoshangdlg.y + 359
          ])
          await events.click()
          await events.sleep(400)
          await events.click()
        }
      } else {
        number = await datas.getNum(iconsm)
        let se = number - item.name
        if (se < buyItem.se && item.x < iconsm.jsons.huoshangdlg.x + 150) {
          //获取到价格合适的进行购买
          buyItem.se = se
          item.buyNum = number
          buyItem.item = item

        } else {
          return false
        }
      }
      console.log(number)
    }
    global.buyNum = buyItem.item.buyNum
    await events.mouseMove([buyItem.item.x, buyItem.item.y])
    await events.click()
    await events.mouseMove([
      iconsm.jsons.huoshangdlg.x - 70,
      iconsm.jsons.huoshangdlg.y + 309
    ])
    await events.click()
    await events.mouseMove([
      iconsm.jsons.huoshangdlg.x - 70,
      iconsm.jsons.huoshangdlg.y + 359
    ])
    await events.click()
    await events.sleep(400)
    await events.click()
    await events.sleep(10000)

    return sp
  },
  getNum: async (iconsm, issell) => {
    console.log(issell, issell ? iconsm.jsons.huoshangdlg.x + 290 : iconsm.jsons.huoshangdlg.x - 10)
    let iconsms = await datas.getIconPx(
      [
        allIcons.fcs.a0,
        allIcons.fcs.a1,
        allIcons.fcs.a2,
        allIcons.fcs.a3,
        allIcons.fcs.a4,
        allIcons.fcs.a5,
        allIcons.fcs.a6,
        allIcons.fcs.a7,
        allIcons.fcs.a8,
        allIcons.fcs.a9,
      ],
      {
        x: issell ? iconsm.jsons.huoshangdlg.x + 260 : iconsm.jsons.huoshangdlg.x - 10,
        y: iconsm.jsons.huoshangdlg.y + 270,
        w: 90,
        h: 22
      })
    iconsms.list.sort((item, item1) => {
      return item.x - item1.x
    })
    console.log(iconsms)
    return iconsms.list.map(item => { return item.name }).join('')
  }
}
module.exports = datas
