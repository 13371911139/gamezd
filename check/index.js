//const func = require('../index')
const robot = require("robotjs")
const getPixels = require("get-pixels")

const check={
    djl:(resolve, reject,type)=>{
        console.log('验证道具栏是否打开')
        func.getPx([global.icons[global.nowObj.checkBefore]], (a, b) => {
           
			if(!a[0]){
                robot.keyTap('e','alt')
                check.djl(resolve, reject)
            }else{
                resolve(true)
            }
        })
    },
    dian777:(resolve, reject)=>{
        func.getPx([global.icons[global.nowObj.checkBefore],global.icons.djl], (a, b) => {
            console.log(a,'22',b)
			if(!a[0]){
                if(!a[1]){
                    robot.keyTap('e','alt')
                    //{ xy: [537, 309], key: false, mouseKey: 'right', check: 'buqi' ,checkBefore: 'djl', type: 'dididi' }
                }
                robot.keyTap('e','alt')
                check.djl(resolve, reject)
            }else{
                resolve(true)
            }
        })
    },
    gml:(resolve, reject)=>{
        func.getPx([global.icons[global.nowObj.checkBefore]], (a, b) => {
			if(!a[0]){
               robot.keyTap('f3')
               check[global.nowObj.checkBefore](resolve, reject)
            }else{
                resolve(true)
            }
        })
    },
    //判断飞行符是否打开，如果没有判断是否打开物品栏，如果也没有执行alt e
    zzffIcon:(resolve, reject)=>{
        func.getPx([global.icons[global.nowObj.checkBefore]], (a, b) => {
			if(!a[0]){
               func.robotAction([488, 309], 'right', false, ()=>{
                check[global.nowObj.checkBefore](resolve, reject)
               })
               
            }else{
                resolve(true)
            }
        })
    },
}
module.exports = check