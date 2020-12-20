const baseFun = require('../base/func.js')

module.exports = async () => {
  return {
    fcs: {
      //方寸山
      shule: await func.getIcon(appDir + '/dubo/img/shule.png', 'shule'), //上把输了
      he: await func.getIcon(appDir + '/dubo/img/he.png', 'he'), //师门入口房顶
      next: await func.getIcon(appDir + '/dubo/img/xt.png', 'next'), //师门入口房顶
    }
  }
}
