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
      ),
      bangpaimenk: await func.getIcon(
        appDir + '/img/bangpaimenk.png',
        'bangpaimenk'
      ),
      bangpaizhuguan: await func.getIcon(
        appDir + '/img/bangpaizhuguan.png',
        'bangpaizhuguan'
      ),
      bangpaineishiye: await func.getIcon(
        appDir + '/img/bangpaineishiye.png',
        'bangpaineishiye'
      ),
      jinrujinku: await func.getIcon(
        appDir + '/img/jinrujinku.png',
        'jinrujinku'
      ),
      jinkuzongguan: await func.getIcon(
        appDir + '/img/jinkuzongguan.png',
        'jinkuzongguan'
      ),
      lingqurenwu: await func.getIcon(
        appDir + '/img/lingqurenwu.png',
        'lingqurenwu'
      ),
      huo: await func.getIcon(
        appDir + '/img/huo.png',
        'huo',
      ),
      huoshangdlg: await func.getIcon(
        appDir + '/img/huoshangdlg.png',
        'huoshangdlg'
      ),
      'a0': await func.getIcon(appDir + '/img/0.png', 0, '0,0,0,255'),
      'a1': await func.getIcon(appDir + '/img/1.png', 1, '0,0,0,255'),
      'a2': await func.getIcon(appDir + '/img/2.png', 2, '0,0,0,255'),
      'a3': await func.getIcon(appDir + '/img/3.png', 3, '0,0,0,255'),
      'a4': await func.getIcon(appDir + '/img/4.png', 4, '0,0,0,255'),
      'a5': await func.getIcon(appDir + '/img/5.png', 5, '0,0,0,255'),
      'a6': await func.getIcon(appDir + '/img/6.png', 6, '0,0,0,255'),
      'a7': await func.getIcon(appDir + '/img/7.png', 7, '0,0,0,255'),
      'a9': await func.getIcon(appDir + '/img/9.png', 9, '0,0,0,255'),
      'a8': await func.getIcon(appDir + '/img/8.png', 8, '0,0,0,255'),
      'psdao': await func.getIcon(appDir + '/img/psdao.png', 5000),//刀
      'psmianbu': await func.getIcon(appDir + '/img/psmianbu.png', 3200),//棉布
      'psshanzi': await func.getIcon(appDir + '/img/psshanzi.png', 4500),//扇子

      'psmianfen': await func.getIcon(appDir + '/img/psmianfen.png', 2600),//面粉
      'psmutou': await func.getIcon(appDir + '/img/psmutou.png', 4000),//木头
      'psfu': await func.getIcon(appDir + '/img/psfu.png', 5500),//符咒
      'pslurong': await func.getIcon(appDir + '/img/pslurong.png', 7000),//鹿茸

      'psyan': await func.getIcon(appDir + '/img/psyan.png', 8000),//盐
      'psmaozi': await func.getIcon(appDir + '/img/psmaozi.png', 3300),//帽子
      'psjiu': await func.getIcon(appDir + '/img/psjiu.png', 4000),//酒
      'pslazhu': await func.getIcon(appDir + '/img/pslazhu.png', 2000),//蜡烛

      //  bpcf:await func.getIcon(appDir + '/img/pslazhu.png', 'che','')
      //只是判断当前所在区域incsc
      'cs': await func.getIcon(appDir + '/img/incsc.png', 'cs'), //在长寿
      cashangrenpang: await func.getIcon(appDir + '/img/cashangrenpang.png', 'cashangrenpang'),
      cashangren: await func.getIcon(appDir + '/img/cashangren.png', 'cashangren'),
      jiaoyi: await func.getIcon(appDir + '/img/jiaoyitext.png', 'jiaoyi', '255,0,0,255'),//交易文字
    }
  }
}
