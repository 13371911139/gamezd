const baseFun = require('../base/func.js')

console.log(appDir)
let icons = async () => {
  return {
    bottom: await func.getIcon(appDir + 'DNF/images/bottom.png', 'bottom'),
    left: await func.getIcon(appDir + 'DNF/images/left.png', 'left'),
    top: await func.getIcon(appDir + 'DNF/images/top.png', 'top'),
    right: await func.getIcon(appDir + 'DNF/images/right.png', 'right'),
    rwstart: await func.getIcon(appDir + 'DNF/images/rwstart.png', 'rwstart'),
    nextmap1: await func.getIcon(appDir + '/DNF/images/nextmap1.png', 'nextmap1'),
    nextmap2: await func.getIcon(appDir + '/DNF/images/nextmap2.png', 'nextmap2'),
    nextmap3: await func.getIcon(appDir + '/DNF/images/nextmap3.png', 'nextmap3'),
    nextmap4: await func.getIcon(appDir + '/DNF/images/nextmap4.png', 'nextmap4'),
    nextmap5: await func.getIcon(appDir + '/DNF/images/nextmap5.png', 'nextmap5'),
    nextmap6: await func.getIcon(appDir + '/DNF/images/nextmap6.png', 'nextmap6'),
    nextmap7: await func.getIcon(appDir + '/DNF/images/nextmap7.png', 'nextmap7'),
    nextmap8: await func.getIcon(appDir + '/DNF/images/nextmap7.png', 'nextmap8'),
    // right1: await func.getIcon(appDir + 'DNF/images/right1.png', 'right1'),
    //40级 远古墓穴深处
    40: await func.getIcon(appDir + '/DNF/images/lv40.png', '40'),
    '40_mudi': await func.getIcon(appDir + '/DNF/images/40_mudi.png', '40_mudi'),
    inahmk: await func.getIcon(appDir + '/DNF/images/inahmk.png', 'inahmk'),
    getPixelColor(x, y)
    //
  }
}
module.exports = icons
