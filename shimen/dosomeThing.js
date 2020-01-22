let toputi = [
  { name: '回师门', key: 'f8' },
  {
    name: '开地图去门口',
    key: 'tab',
    check: 'fcsmMap',
    checkClick: true,
    closeall: true,
    closeMap: true,
    stop: true
  },
  {
    name: '进入灵台宫',
    check: 'toltg',
    stop: true,
    checkClick: true
  }
]
let ptrw = [
  {
    name: '前往灵台宫中央',
    key: 'f9',
    stop: true,
    checkClick: true,
    check: 'ltgcenter'
  },
  {
    name: '到菩提老祖旁边',
    key: 'f9',
    stop: true,
    checkClick: true,
    check: 'fchen'
  },
  {
    name: '到师傅旁边',
    stop: true,
    checkClick: true,
    key: 'f9',
    check: 'ptdeluzi',
    checkmose: [-32, -119]
  }
]
module.exports = { toputi, ptrw }
