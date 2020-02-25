const baseFun = require('../func.js')

module.exports = async () => {
  return {
    fcs: {
      //方寸山
      fcmk: await func.getIcon(appDir + '/shimen/img/fcmk.png', 'fcmk'), //师门入口房顶
      fcsx: await func.getIcon(appDir + '/shimen/img/fcsx.png', 'fcsx'), //方寸山首席fcsmMap
      fcsmMap: await func.getIcon(
        appDir + '/shimen/img/fcsmMap.png',
        'fcsmMap'
      ), //方寸山地图师门门口
      toltg: await func.getIcon(
        appDir + '/img/mapName/fcs/toltg.png',
        'toltg'
      ), //进入灵台宫的位置

      //灵台宫
      ltgcenter: await func.getIcon(
        appDir + '/img/mapName/fcs/center.png',
        'ltgcenter'
      ),
      fchen: await func.getIcon(
        appDir + '/img/mapName/fcs/fchen.png',
        'fchen'
      ),
      ptdeluzi: await func.getIcon(
        appDir + '/img/mapName/fcs/ptdeluzi.png',
        'ptdeluzi'
      ),
      xianglu: await func.getIcon(
        appDir + '/shimen/img/xianglu.png',
        'xianglu'
      ), //师门里面的香炉
      smjx: await func.getIcon(appDir + '/shimen/img/smjx.png', 'smjx'), //菩提后面
      luzi: await func.getIcon(appDir + '/img/luzi.png', 'luzi'), //菩提后面炉子，用来计算菩提位置
      xunlu: await func.getIcon(appDir + '/img/xunlu.png', 'xunlu'),
      zdxlu: await func.getIcon(appDir + '/img/zdxlu.png', 'zdxlu'),
      fctocsjw: await func.getIcon(
        appDir + '/img/fctocsjw.png',
        'fctocsjw'
      ),
      infc: await func.getIcon(appDir + '/img/infc.png', 'infc'),
      csjwyz: await func.getIcon(
        appDir + '/img/长寿郊外驿站.png',
        'csjwyz'
      ),
      长寿郊外驿站旁: await func.getIcon(
        appDir + '/img/长寿郊外驿站旁.png',
        '长寿郊外驿站旁'
      ),
      驿站点击我要去: await func.getIcon(
        appDir + '/img/驿站点击我要去.png',
        '驿站点击我要去'
      ),
      前往北俱驿站: await func.getIcon(
        appDir + '/img/前往北俱驿站.png',
        '前往北俱驿站'
      ),
      长安国境门口: await func.getIcon(
        appDir + '/img/长安国境门口.png',
        '长安国境门口'
      ),
      长安进入国境: await func.getIcon(
        appDir + '/img/长安进入国境.png',
        '长安进入国境'
      ),
      国境前往境外门口: await func.getIcon(
        appDir + '/img/国境前往境外门口.png',
        '国境前往境外门口'
      ),
      mapAll: await func.getIcon(appDir + '/img/mapAll.png', 'mapAll'),
      alltitle: await func.getIcon(
        appDir + '/img/alltitle.png',
        'alltitle'
      ),
      shijie: await func.getIcon(appDir + '/img/shijie.png', 'shijie'),
      境外到达长寿郊外传送: await func.getIcon(
        appDir + '/img/境外到达长寿郊外传送.png',
        '境外到达长寿郊外传送'
      ),
      closebut: await func.getIcon(
        appDir + '/img/closebut.png',
        'closebut'
      )
    }
  }
}
