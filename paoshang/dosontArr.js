/***
 * shijie  打开地图世界那俩字
 */
module.exports = {
  getrw: [

    {
      name: '前往帮派',
      key: 'tab',
      check: 'shijie',
      checkmosec: [-40, -270],
      checkClick: true,
      stop: true,
    },
    {
      name: '帮派门口',
      key: ['tab', 'f9'],
      check: 'bangpaimenk',
      checkmose: [95, 26],
      checkClick: true,
    },
    {
      name: '进入帮派',
      check: 'bangpaizhuguan',
      checkmose: [-0, 68],
      checkClick: true,
    },
    {
      name: '电机帮派师爷',
      check: 'bangpaineishiye',
      beforeAwait: 2000,
      checkmose: [-25, 30],
      checkClick: true,
    },
    {
      name: '进入金库',
      check: 'jinrujinku',
      checkmosec: [15, 70],
      checkClick: true,
    },
    {
      name: '点帮派纵观',
      beforeAwait: 2000,
      check: 'jinkuzongguan',
      checkmose: [10, 80],
      checkClick: true,
    },
    {
      name: '领取跑商任务',
      check: 'lingqurenwu',
      checkmosec: [-8, 88],
      checkClick: true,
    },
  ],
  toBP: [
    {
      name: '长安货商',
      key: 'tab',
      check: 'cahuoshang',
      checkClick: true,
      stop: true,
    },



    {
      name: '前往国境路口',
      key: 'tab',
      checkmosec: [-405, -35],
      check: 'shijie',
      checkClick: true,
      stop: true
    },
    {
      name: '长安进入国境',
      check: 'alltitle',
      key: 'tab',
      checkmose: [-600, -50],
      checkClick: true,
      afterAwait: 5000
    },
    {
      name: '国境前往境外门口',
      key: 'tab',
      checkmose: [5, -7],
      check: '国境前往境外门口',
      checkClick: true,
      stop: true
    },
    {
      name: '国境进入境外',
      check: 'alltitle',
      key: 'tab',
      checkmosec: [-644, -300],
      checkClick: true,
      afterAwait: 3000
    },
    {
      name: '境外长寿传送',
      check: 'shijie',
      key: 'tab',
      checkmosec: [-376, -19],
      checkClick: true,
      afterAwait: 5000,
      stop: true
    },

    {
      name: '境外到达长寿郊外传送',
      check: '境外到达长寿郊外传送',
      key: ['tab', 'f9'],
      checkmose: [104, 154],
      checkClick: true
    },
    {
      name: '点击我要去',
      check: 'closebut',
      checkmosec: [-457, 43],
      checkClick: true
    },
    {
      name: '郊外去长寿门口',
      check: 'shijie',
      key: 'tab',
      checkmosec: [-72, -195],
      checkClick: true,
      afterAwait: 5000,
      stop: true
    },
    {
      name: '郊外进入长寿',
      check: 'alltitle',
      //key: 'tab',
      checkmosec: [-200, -500],
      checkClick: true,
      afterAwait: 5000
    },
    {
      name: '从长寿村去郊外的路',
      key: 'tab',
      checkmose: [-2, -2],
      check: 'fctocsjw',
      checkClick: true,
      stop: true
    },
    {
      name: '从长寿村去郊外的路',
      key: ['tab', 'f9'],
      checkmose: [53, 150],
      check: 'infc',
      checkClick: true
    },
    {
      name: '去长寿郊外驿站',
      key: 'tab',
      checkmose: [-37, 46],
      check: 'csjwyz',
      checkClick: true,
      stop: true
    },
    {
      name: '长寿郊外驿站旁',
      key: 'tab',
      checkmose: [-86, 64],
      check: '长寿郊外驿站旁',
      checkClick: true
    },
    {
      name: '驿站点击我要去',
      key: 'tab',
      check: '驿站点击我要去',
      checkClick: true
    },
    {
      name: '前往北俱驿站',
      key: 'tab',
      checkmose: [-37, 46],
      check: '前往北俱驿站',
      checkClick: true,
      stop: true
    },
    {
      name: '北俱驿站旁',
      key: 'tab',
      checkmose: [89, -244],
      check: '北俱驿站旁',
      checkClick: true,
      stop: true
    },
    {
      name: '驿站点击我要去',
      key: 'tab',
      check: '驿站点击我要去',
      checkClick: true
    },

    {
      name: '在长安打开地图去帮派',
      key: 'tab',
      check: 'xunlu',
      checkmose: [112, 10],
      checkClick: true,
      //closeall: true,
      //closeMap: true,
      stop: true
    },
    {
      name: '在长安打开地图去帮派',
      key: [...'jiangdaquan', 'space', 'enter'],

      checkClick: true,
      //closeall: true,
      //closeMap: true,
      stop: true
    }
  ]
}
let data={
  projectId:'xxx',
  problemList:[
    {
      describe:'xxx',
      classification:'分类',
      type:'状态',
      riskType:'G',
      fileBusinessID:'xxxxx',
      ProgressId:'问题进展id'
    }
  ]
}
// 返回一个问题进展的id用作关联问题列表
let Progress={
  projectId:'xxx',
  ProgressList:[
    {
      message:'问题进展',
      startTime:'生成时间',
      userId:'操作人id',
      userName:'操作人名称'
    }
  ]
}