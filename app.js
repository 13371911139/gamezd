
const robot = require("robotjs")
const getPixels = require("get-pixels")
const screenshot = require('screenshot-desktop')

var gm = require('gm');
var events = require("events");
var twoPI = Math.PI * 2.0;
robot.setMouseDelay(20);
robot.setKeyboardDelay(200)
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;
var isOpen = false
const path = './'

// robot.mouseClick=(mouse)=>{

// }

const func = require('./index')
global.icons = {}
//func.getIcon(path + 'img/mhxiicon.png','login')
func.getIcon(path + 'img/isZhandou.png', 'tabs')
func.getIcon(path + 'img/isZhandou.png', 'iszd')
func.getIcon(path + 'img/d4icon.png', 'd4icon')
func.getIcon(path + 'img/zidongzd.png', 'zidongzd')
func.getIcon(path + 'img/fff.png', 'fff')
func.getIcon(path + 'img/ca777.png', 'ca777')
func.getIcon(path + 'img/qh.png', 'qh')
func.getIcon(path + 'img/ishq.png', 'ishq')

func.getIcon(path + 'img/ckglyzhizhen.png', 'npc')
func.getIcon(path + 'img/zhizhen.png', 'zz')
func.getIcon('img/bggezi.png', 'bggezi')
func.getIcon('img/777dian.png', 'dian777')
func.getIcon('img/zzffIcon.png', 'zzffIcon')
func.getIcon('img/ckglyxz.png', 'cktext')

func.getIcon('img/closeDefult.png', 'closeDefult')
func.getIcon('img/bianKuang.png', 'bianKuang')
func.getIcon('img/djl.png', 'djl')
func.getIcon('img/fbl.png', 'fbl')
func.getIcon('img/useqh.png', 'useqh')
func.getIcon('img/ck.png', 'ck')
func.getIcon('img/ck1.png', 'ck1')
func.getIcon('img/ck2.png', 'ck2')
func.getIcon('img/ck3.png', 'ck3')
func.getIcon('img/ck4.png', 'ck4')
func.getIcon('img/ck5.png', 'ck5')
func.getIcon('img/ck6.png', 'ck6')
func.getIcon('img/ck7.png', 'ck7')
func.getIcon('img/gml.png', 'gml')
func.getIcon('img/xtxx.png', 'xtxx')
func.getIcon('img/xlff.png', 'xlff')
func.getIcon('img/select77.png', 'select77')
setTimeout(() => {
	func.getWindow()
}, 3000)

setTimeout(function () {
	//func.getWindow()
	//console.log(global.icons)
	func.getPx([global.icons.ca777], (a, b) => {
		
	})
}, 10000)
let zz = [], apczz = []
const zzObj = {
	zz: [], apczz: []
}
//获取指针对象
let getZZFun = (zz, imgpath) => {
	getPixels(imgpath, function (err, pixels) {
		if (err) return
		for (let i = 0; i < 21; i++) {
			zz.push(
				pixels.get(i, i, 0) + ',' + pixels.get(i, i, 1) + ',' + pixels.get(i, i, 2) + ',' + pixels.get(i, i, 3)
			)
			zz.push(
				pixels.get(i + 1, i + 1, 0) + ',' + pixels.get(i + 1, i + 1, 1) + ',' + pixels.get(i + 1, i + 1, 2) + ',' + pixels.get(i + 1, i + 1, 3)
			)

		}

	})
}
getZZFun(zzObj.apczz, path + 'img/ckglyzhizhen.png')
getZZFun(zzObj.zz, path + 'img/zhizhen.png')
//测试指针位置相对位置
let nums = 0, nowPy = [], arrJt = []
let getZZPx = (zz, imgPath) => {
	if (!isOpen) return false
	nums = 0
	nowPy = []
	arrJt = []
	getPixels(imgPath, function (err, pixels) {
		if (err) {
			getZZPx = (zz, imgPath)
			return
		}
		let heighth = global.windowPixel.h + global.windowPixel.y
		let widthx = global.windowPixel.w + global.windowPixel.x
		let zzPx = robot.getMousePos()
		for (let j = zzPx.y - 100; j <= zzPx.y + 100; j++) {
			for (let i = zzPx.x - 100; i <= zzPx.x + 100; i++) {
				let rgba = pixels.get(i, j, 0) + ',' + pixels.get(i, j, 1) + ',' + pixels.get(i, j, 2) + ',' + pixels.get(i, j, 3)
				arrJt.push(rgba)

				if (rgba == zz[0]) {
					let num = 0
					for (var t = 0; t < 21; t++) {
						nowRgb = pixels.get(t, t, 0) + ',' + pixels.get(t, t, 1) + ',' + pixels.get(t, t, 2) + ',' + pixels.get(t, t, 3)
						onnowRgb = pixels.get(t + i, t + j, 0) + ',' + pixels.get(t + i, t + j, 1) + ',' + pixels.get(t + i, t + j, 2) + ',' + pixels.get(t + i, t + j, 3)

						if (zz.indexOf(onnowRgb) >= 0) {
							num++
						}
					}

					if (num > nums) {
						//console.log([i, j], num)
						nums = num;
						nowPy = [i, j]
					}
					console.log(nums, nowPy, 'sdfsdfasdfsadf')
				}
			}
		}

		thenFun(nowPy, robot.getMousePos())
	})

	return nowPy
}
let getPic = (zzArr) => {
	let imgPaths
	try {
		screenshot({ filename: 'shot.png' }).then((imgPath) => {
			getZZPx(zzArr, imgPath)

		}).catch((err) => {
			//console.log('asdlfkjasldkfjlaskdjflksdjfkl')
			getPic(zzArr)
		});
	} catch (e) {

	}


}


let robotAction = (xy, mouse, key, fun) => {
	
	setTimeout(() => {
		let nowpy = robot.getMousePos()
		var pyxc = (nowpy.x - xy[0]) / 10, pyyc = (nowpy.y - xy[1]) / 10
		for (let i = 0; i <= 10; i++) {
			robot.moveMouse(nowpy.x - pyxc * i, nowpy.y - pyyc * i);
		}
		thenFun = (zz, py) => {
			//func.getPx()
			y = py.y + (xy[1] - zz[1])
			x = py.x + (xy[0] - zz[0])
			tx = Math.abs(xy[0] - zz[0])
			ty = Math.abs(xy[1] - zz[1])
			let ofsets = global.nowObj.ofset || [5, 5]
			if ((tx < ofsets[0] && ty < ofsets[1]) || !zz[0]) {
				if (global.nowObj.check == 'npc') {
					for (let i = 0; i <= 10; i++) {
						robot.moveMouse(py.x, py.y - i * 10);
					}
				}

				var pp = new Promise((resolve, reject) => {
					if (global.nowObj.checkBefore) {
						func.getPx([global.icons[global.nowObj.checkBefore]], (a, b) => {
							
							switch (global.nowObj.type) {
								case 'have'://存在继续执行
									!a[0] && resolve(true)
									break;
								case 'have1'://存在重新执行
									a[0] && robotFun()
									break;
								case 'have-1'://存在执行上一个
									a[0] && zzIndex-- && robotFun()
									break;
								case 'have+1'://存在执行下一个
									a[0] && zzIndex++ && robotFun()
									break;
								case 'notfont1'://不存在重新
								 !a[0] && robotFun()
									break;
								case 'notfont'://不存在继续执行
								 !a[0] && resolve(true)
									break;
								case 'notfont-1'://不存在执行上一个
								console.log(a[0])
								!a[0] && zzIndex-- && robotFun()
									resolve(false)
									break;
								case 'notfont+1'://不存在执行上一个
								!a[0] && zzIndex++ && robotFun()
									break;
								case 'dididi':
									if(!a[0] || b[0].length <7){
										setInterval(()=>{
											process.stdout.write('\x07')
										},500)
									}else if(a[0] && b[0].length >=7){
										resolve(true)
									}else{
										setInterval(()=>{
											process.stdout.write('\x07')
										},500)
									}
									return;
								default:
									resolve(true)
							}
							resolve(true)
						})
					}else{
						resolve(true)
					}

				});
				//在那之前的判断
				Promise.all([pp]).then((values) => {
					if(!values[0])return;
					global.nowObj.beforeKey && robot.keyTap(...global.nowObj.beforeKey)
					global.nowObj.beforeKeyArr && global.nowObj.beforeKeyArr.forEach((item) => {
						robot.keyTap(item)
					})
					setTimeout(() => {
						mouse && robot.mouseClick(mouse)
						setTimeout(() => {

							if (global.nowObj.checkAfter) return func.getPx([global.icons[global.nowObj.checkAfter]], (a, b) => {
								
								//点击后判断是否存在某物
								if (a[0]) {
									robotFun()//getPic(zz[0] ? zzObj.zz : zzObj.apczz)
								} else {
									global.nowObj.keyArr && global.nowObj.keyArr.forEach((item) => {
										
										robot.keyTap(item)
									})
									global.nowObj.mcArr && global.nowObj.mcArr.forEach((item) => {
										robot.mouseClick(item)
									})
									key && robot.keyTap(...key)
									fun && fun()
								}
							})
							global.nowObj.keyArr && global.nowObj.keyArr.forEach((item) => {
								
								robot.keyTap(item)
							})
							global.nowObj.mcArr && global.nowObj.mcArr.forEach((item) => {
								robot.mouseClick(item)
							})
							key && robot.keyTap(...key)
							fun && fun()
						}, 200)
					}, 100)

				})



				return
			}
			if (!zz[0]) {
				x = xy[0], y = xy[1]
			}
			let nowpys = robot.getMousePos()
			var pyxcs = (nowpys.x - x) / 3, pyycs = (nowpys.y - y) / 3
			for (let i = 0; i <= 3; i++) {
				robot.moveMouse(nowpys.x - pyxcs * i, nowpys.y - pyycs * i);
			}
			robot.moveMouse(x, y);
			getPic(zz[0] ? zzObj.zz : zzObj.apczz)

		}
		ok = () => {
			robot.mouseClick(mouse)
		}
		getPic(zzObj.zz)

	}, 50)
}

let arrs = []


let getCQArr = (ins) => {
	return [
		//打开仙灵店铺并选择
		{ xy: [324, 137], keyArr: [6, 6, 6, 6], mouseKey: 'left',checkBefore: 'gml', type: 'have' },//选中并输入数量
		{ xy: [405, 393], mouseKey: 'left' },//购买777
		{ xy: [402, 359], key: false, mouseKey: 'right', ofset: [17, 17] },//关闭仙灵店铺
		...(new Array(18).fill({}).map((item, index) => {
			let x = 334, y = 154
			if (index % 5 == 0) {
				x = 334
				y = 154 + 51 * parseInt(index / 5)
			} else {
				x = 334 + 51 * (index % 5)
				y = 154 + 51 * parseInt(index / 5)
			}
			return { xy: [x, y], key: false, mouseKey: 'right', ofset: [17, 17] ,checkBefore: index==0&&'gml', type: 'notfont'}
		})),
		{ xy: [488, 309], key: false, mouseKey: 'right' },//打开飞行符
		{ xy: [222, 193], mouseKey: 'left', ofset: [5, 5], checkAfter: 'zzffIcon',checkBefore: 'zzffIcon', type: 'notfont' },//前往宝象国 关闭物品栏 并判断是否已经完成飞行;
		{ xy: [440, 370], beforeKey: ['f9'], key: ['e', 'alt'],  ofset: [3000, 30000] }, //关闭物品栏
		{ xy: [323, 177], mouseKey: 'left', check: 'npc' },//打开仓库管理员
		{ xy: [143, 316], mouseKey: 'left', beforeKey: ['f9'], checkBefore: 'cktext', type: 'have' },//进入仓库
		{ xy: [55 + ins * 19, 386], mouseKey: 'left' },//选择指定仓库
		...(new Array(18).fill({}).map((item, index) => {//放入仓库
			let x = 371, y = 185
			if (index % 5 == 0) {
				x = x
				y = y + 51 * parseInt(index / 5)
			} else {
				x = x + 51 * (index % 5)
				y = y + 51 * parseInt(index / 5)
			}
			return { xy: [x, y], key: false, mouseKey: 'right', ofset: [10, 10] , checkBefore: index==0 && 'ck'+(ins+1), type: 'have'}
		})),
		//ins == 6 ? { xy: [319, 353], ofset: [1117, 1711] } : { xy: [319, 353], key: false, mouseKey: 'right', ofset: [17, 17] },//关闭仓库打开背包继续下一个
		ins == 6 ? { xy: [319, 353], ofset: [1117, 1711] } : { xy: [319, 353], key: ['e', 'alt'], ofset: [175, 157] },
	]
}

//zuoqizi
let made777 = (ins) => {
	let arr77 = []
	for (let i = 0; i < 7; i++) {
		let index = ins * 2
		arr77.push({ xy: [55 + i * 19, 383], mouseKey: 'left' })//选仓库
		if (index % 5 == 0) {
			x = 68
			y = 186 + 51 * parseInt(index / 5)
		} else {
			x = 68 + 51 * (index % 5)
			y = 186 + 51 * parseInt(index / 5)
		}
		arr77.push({ xy: [x, y], key: false, mouseKey: 'right', ofset: [10, 10] , checkBefore: 'ck'+(i+1), type: 'notfont-1'})//取第一个旗子
		index++
		if (index % 5 == 0) {
			x = 68
			y = 186 + 51 * parseInt(index / 5)
		} else {
			x = 68 + 51 * (index % 5)
			y = 186 + 51 * parseInt(index / 5)
		}
		arr77.push({ xy: [x, y], key: false, mouseKey: 'right', ofset: [10, 10] })
	}
	//打开背包 打开法宝
	arr77.push({ xy: [208, 388], beforeKey: ['e', 'alt'], ofset: [200, 200] })
	arr77.push({ xy: [208, 388], mouseKey: 'left' , checkBefore: 'djl', type: 'notfont-1'})//打开物品栏并点击法宝
	//选择旗盒
	arr77.push({ xy: [331, 175], mouseKey: 'right', ofset: [13, 13] , checkBefore: 'fbl', type: 'notfont-1'})
	return [
		...arr77,
		...heQi(),
		...heQi(true),
		{ xy: [414, 119], key: ['e', 'alt'], mouseKey: 'right', ofset: [20, 20] },//关闭法宝并关闭物品栏
		{ xy: [57, 423], key: false, mouseKey: 'left' , checkBefore: 'djl', type: 'have-1'},//进入8号仓库
		{ xy: [379, 185], key: false, mouseKey: 'right', ofset: [13, 13] },//把77放入仓库
		{ xy: [428, 188], key: false, mouseKey: 'right', ofset: [13, 13] },//把77放入仓库
	]
}
let heQi = (ts) => {
	return [
		{ xy: [103, 344], key: false, mouseKey: 'left' },//点击使用法宝
		...(new Array(7).fill({}).map((item, indexs) => {
			index = ts ? indexs * 2 + 1 : indexs * 2
			if (index % 5 == 0) {
				x = 218
				y = 146 + 51 * parseInt(index / 5)
			} else {
				x = 218 + 51 * (index % 5)
				y = 146 + 51 * parseInt(index / 5)
			}
			return { xy: [x, y], key: false, mouseKey: 'left', ofset: [13, 13] }
		})),
		{ xy: [271, 422], key: false, mouseKey: 'left', checkBefore: 'select77',cblength:7, type: 'dididi' },//点击合旗按钮
	]
}
let nnk = 0
var zzArr = [
	// { xy: [537, 309], key: false, mouseKey: 'right', check: 'buqi' ,checkBefore: 'djl', type: 'dididi' },
	// nnk === 1 ?
	// 	{ xy: [133, 130], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://傲来
	// 	nnk === 2 ?
	// 		{ xy: [363, 116], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://长寿
	// 		{ xy: [556, 110], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777', checkBefore: 'dian777', type: 'have' },//长安
	// //打开仙灵店铺并选择
	// ...getCQArr(0),
	// { xy: [537, 309], key: false, mouseKey: 'right' },
	// nnk === 1 ?
	// 	{ xy: [511, 126], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://傲来
	// 	nnk === 2 ?
	// 		{ xy: [274, 172], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://长寿
	// 		{ xy: [512, 215], keyArr: ['f3'], mouseKey: 'left', checkAfter: 'dian777' , checkBefore: 'dian777', type: 'have'},
	// ...getCQArr(1),
	// { xy: [537, 309], key: false, mouseKey: 'right' },
	// nnk === 1 ?
	// 	{ xy: [184, 221], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://傲来
	// 	nnk === 2 ?
	// 		{ xy: [248, 241], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://长寿
	// 		{ xy: [591, 379], keyArr: ['f3'], mouseKey: 'left', checkAfter: 'dian777' , checkBefore: 'dian777', type: 'have'},
	// ...getCQArr(2),
	// { xy: [537, 309], key: false, mouseKey: 'right' },
	// nnk === 1 ?
	// 	{ xy: [311, 274], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://傲来
	// 	nnk === 2 ?
	// 		{ xy: [393, 236], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://长寿
	// 		{ xy: [374, 368], keyArr: ['f3'], mouseKey: 'left', checkAfter: 'dian777', checkBefore: 'dian777', type: 'have' },
	// ...getCQArr(3),
	// { xy: [537, 309], key: false, mouseKey: 'right' },
	// nnk === 1 ?
	// 	{ xy: [468, 250], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://傲来
	// 	nnk === 2 ?
	// 		{ xy: [237, 339], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://长寿
	// 		{ xy: [327, 339], keyArr: ['f3'], mouseKey: 'left', checkAfter: 'dian777', checkBefore: 'dian777', type: 'have' },
	// ...getCQArr(4),
	// { xy: [537, 309], key: false, mouseKey: 'right' },
	// nnk === 1 ?
	// 	{ xy: [437, 348], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://傲来
	// 	nnk === 2 ?
	// 		{ xy: [287, 358], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://长寿
	// 		{ xy: [59, 377], keyArr: ['f3'], mouseKey: 'left', checkAfter: 'dian777', checkBefore: 'dian777', type: 'have' },
	// ...getCQArr(5),
	// { xy: [537, 309], key: false, mouseKey: 'right' },
	// nnk === 1 ?
	// 	{ xy: [211, 323], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://傲来
	// 	nnk === 2 ?
	// 		{ xy: [409, 374], mouseKey: 'left', key: ['f3'], checkAfter: 'dian777' } ://长寿
	// 		{ xy: [245, 212], keyArr: ['f3'], mouseKey: 'left', checkAfter: 'dian777', checkBefore: 'dian777', type: 'have' },
	// ...getCQArr(6),

	//...made777(0),
	//...made777(1),
	...made777(2),
	...made777(3),
	...made777(4),
	...made777(5),
	...made777(6),
	...made777(7),
	...made777(8),
	{ xy: [321, 154], key: false, mouseKey: 'right', ofset: [17, 17] },

	{ xy: [260, -14], check: 'Arr77', mouseKey: 'left' },
	{ xy: [537, 309], key: false, mouseKey: 'right', ofset: [15, 15] },
	{ xy: [512, 215], mouseKey: 'left' },
	{ xy: [512, 215], key: ['f', 'alt'], ofset: [135, 153] },//打开好友栏

	{ xy: [564, 236], key: false, mouseKey: 'right' },//选中第一个
	{ xy: [454, 390], mouseKey: 'left' },//开启给与
	{ xy: [454, 390], ofset: [1000, 1000], check: 'give' },//开启给与

]





let zzIndex = 0;
var robotFun = () => {
	if (!isOpen) {
		//zzIndex = 0
		return false
	}
	if (zzIndex == 0) {
		robot.keyTap('e', 'alt')
	}
	global.nowObj = zzArr[zzIndex]
	let x = zzArr[zzIndex].xy[0] + global.windowPixel.x, y = zzArr[zzIndex].xy[1] + global.windowPixel.y

	switch (global.nowObj.check) {
		case 'Arr77'://查看上一层还有多少个
			zzIndex = 0;
			robotFun()
			return;
			robot.moveMouse(x, y);
			robot.mouseClick('left')
			setTimeout(() => {
				func.getPx([global.icons.bggezi], (a, b) => {
					robot.moveMouse(global.windowPixel.x + 80, global.windowPixel.y - 14);
					robot.mouseClick('left')
					global.giveArr = b[0]
					zzIndex++
					robotFun()
				})
			}, 500)
			break;
		case 'give':
			global.giveAs = global.giveAs//执行的动作
			for (let i = 0; i < global.giveArr.length; i++) {
				if (i % 3 == 0) {
					global.giveAs.push({ xy: [454, 390], mouseKey: 'left', check: 'giveBQ' })//点击给与
					global.giveAs.push({ xy: [454, 390], mouseKey: 'left', check: 'giveBQ' })
				} else if (i == 4) {
					global.giveAs.push({ xy: [321, 447], mouseKey: 'left', check: 'give' })//选好 给与
				} else {
					if (i % 5 == 0) {
						x = 68
						y = 186 + 51 * parseInt(index / 5)
					} else {
						x = 68 + 51 * (index % 5)
						y = 186 + 51 * parseInt(index / 5)
					}
					global.giveAs.push({ xy: [323, 449], mouseKey: 'left', check: 'give' })//选择
				}

			}
			break;
		case 'giveBQ':
			robotAction([x, y], zzArr[zzIndex].mouseKey, zzArr[zzIndex].key, () => {
				zzIndex++
				if (!zzArr[zzIndex]) zzIndex = 0
				
				robotFun()
			});
			break;
		default:
			robotAction([x, y], zzArr[zzIndex].mouseKey, zzArr[zzIndex].key, () => {
				zzIndex++
				global.giveAs = []
				if (!zzArr[zzIndex]) zzIndex = 0
				
				robotFun()
			});
	}




	return true
}
//robotFun()

// setInterval(function(){
// 	//iszd d4icon
// 	func.getPx(global.icons.d4icon,(a)=>{
// 		if(a){
// 			if(a[0])
// 			global.windowPixel
// 			robotAction(zzArr[zzIndex].xy, zzArr[zzIndex].mouseKey, zzArr[zzIndex].key)
// 		}
// 	})
// },4000)



const ioHook = require('iohook');

ioHook.on('mousemove', event => {

});
ioHook.on('mouseclick', event => {
	
})
ioHook.on('keydown', event => {
	
	if (event.ctrlKey && event.keycode == 30) {
		if (isOpen) {
			isOpen = false
		} else {
			(isOpen = true) && setTimeout(robotFun, 1000)
		}

	}
	if (event.keycode == 60) {
		setInterval(() => {
			robot.keyTap('f2')
		}, 200)
		return
		setInterval(() => {
			//parseInt(str,16)
			
			robot.keyTap('tab')
			func.getPx([global.icons.iszd, global.icons.d4icon, global.icons.zidongzd], (a, b) => {
				if (a[1] && a[1].x > 408) {
					robotAction([381 + global.windowPixel.x, 180 + global.windowPixel.y], 'left', false, () => {
						robot.keyTap('tab')
						robot.moveMouse(40 + global.windowPixel.x, 40 + global.windowPixel.y)
					})

					return
				} if (a[1] && a[1].x < 408) {
					robotAction([440 + global.windowPixel.x, 180 + global.windowPixel.y], 'left', false, () => {
						robot.keyTap('tab')
						robot.moveMouse(40 + global.windowPixel.x, 40 + global.windowPixel.y)
					})

					return
				} else if (!a[0] || (a[0] && !a[2])) {
					//robot.keyTap('tab')
					process.stdout.write('\x07')
					process.stdout.write('\x07')
					process.stdout.write('\x07')
					process.stdout.write('\x07')
					process.stdout.write('\x07')
				} else if (
					parseInt(robot.getPixelColor(global.windowPixel.x + 70, global.windowPixel.y - 10), 16) == 16762263 ||
					parseInt(robot.getPixelColor(global.windowPixel.x + 194, global.windowPixel.y - 10), 16) == 16762263 ||
					parseInt(robot.getPixelColor(global.windowPixel.x + 313, global.windowPixel.y - 10), 16) == 16762263 ||
					parseInt(robot.getPixelColor(global.windowPixel.x + 432, global.windowPixel.y - 10), 16) == 16762263 ||
					parseInt(robot.getPixelColor(global.windowPixel.x + 544, global.windowPixel.y - 10), 16) == 16762263
				) {
					console.log('err')
					for (let t = 0; t < 10; t++) {
						process.stdout.write('\x07')
					}

				}


			})
		}, 7000)

		//func.getText()
	}
	
});

const id = ioHook.registerShortcut([32, 33], (keys) => {
	//console.log('Shortcut called with keys:', keys)
});

// Register and start hook
ioHook.start();

