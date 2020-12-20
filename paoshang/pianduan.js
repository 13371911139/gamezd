const baseFun = require('../base/func.js')
let getrw = [
  ['altoca'],//傲来到长安
  ['altohgs', 'hgstobjlz', 'bjlztocsjw', 'csjwtocs'],//傲来到长寿
  ['cstocsjw', 'csjwtobjlz', 'bjlztohgs', 'hgstoal'],//长寿到傲来
  ['cstocsjw', 'csjwtobjlz', 'bjlztoca'],// 长寿到长安
  ['catodtgj', 'dtgjtodtjw', 'dtjwtocsjw', 'csjwtocs'],//长安到长寿村
]
module.exports = {
  getrw: async (domt) => {
    // 获取当前位置 获取前往路线，目标长安
    await events.doSomeThing(['getrw'], domt)
  },
  buyAndsell: async () => {
    console.log('sdfsdfsdf')
    // await baseFun.getIconPx(['ca'], domt)
    let domt = {
      ca: [
        {
          name: '商人旁边',
          key: ['tab'],
          check: 'shijie',
          checkmosec: [-20, -185],
          checkClick: true,
          stop: true,
        },
        {
          key: ['tab'],
          name: '商人',
          check: 'cashangren',
          checkmosec: [-250, -46],
          checkClick: true
        },
        {
          name: '商人',
          check: 'jiaoyi',
          checkt: true,
          checkmosec: [0, 5],
          checkClick: true
        }
      ]
    }
    await events.doSomeThing(['ca'], domt)
    return await events.sleep(10000)

  },
  getNowWhere: async () => {
    //判断要做什么 根据背包物品 所在位置判断要做的事情
    return baseFun.getIconPx([

    ])
  }
}