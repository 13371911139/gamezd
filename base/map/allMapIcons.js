const baseFun = require('../func.js')
module.exports = async () => {
  return {
    fcs: [
      //方寸山
      await func.getIcon('D:/project/ganemh/shimen/img/fcmk.png', 'fcmk'), //师门入口房顶
      await func.getIcon('D:/project/ganemh/shimen/img/fcsx.png', 'fcsx'), //方寸山首席fcsmMap
      await func.getIcon('D:/project/ganemh/shimen/img/fcsmMap.png', 'fcsmMap') //方寸山地图师门门口
    ],
    ltg: [
      //灵台宫
      await func.getIcon('D:/project/ganemh/shimen/img/xianglu.png', 'xianglu'), //师门里面的香炉
      await func.getIcon('D:/project/ganemh/shimen/img/smjx.png', 'smjx'), //菩提后面
      await func.getIcon('D:/project/ganemh/img/luzi.png', 'luzi') //菩提后面炉子，用来计算菩提位置
    ]
  }
}
