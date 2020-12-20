var path = require('path');
global.appDir = path.join(__dirname, '../')

const checks = require('../check/index')
const func = require('../index.js')
const allIcon = require('../base/map/allMapIcons')
const baseFun = require('../base/func.js')
global.events = require('../base/events')
const robot = require('robotjs')
const getPixels = require('get-pixels')
const screenshot = require('screenshot-desktop')
const pianduan = require('./pianduan')
const domt = require('./dosontArr')
global.icons = {}

let myfun = async function () {
  await events.sleep(5000)
  global.allIcons = await allIcon()
  console.log(allIcon.fcs,'fsdf')
  await events.moveStop()
  await baseFun.getWindow()
  let iconsm = await baseFun.getIconPx(allIcons.fcs)
  await pianduan.buyAndsell()
  for (let i = 0; i < 100; i++) {

  }

  let mosPx = await baseFun.getMose()
  let shimenArr = ['toBP', 'ptrw']
  await events.doSomeThing(shimenArr, domt)
  await events.mouseMove([iconsm.jsons.fcsmMap.x, iconsm.jsons.fcsmMap.y])
  events.click()
  await events.moveStop()
  console.log('stop')
  events.click('right')
}
myfun()
