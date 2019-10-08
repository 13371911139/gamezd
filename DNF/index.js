const robot = require("robotjs")
//import robot from 'robotjs'
const getPixels = require("get-pixels")
const screenshot = require('screenshot-desktop')
const checks = require('../check/index')
var gm = require('gm');
var events = require("events");
let PS = require('../paoshang/index')
var twoPI = Math.PI * 2.0;
robot.setMouseDelay(200);
robot.setKeyboardDelay(200)
var screenSize = robot.getScreenSize();
var height = (screenSize.height / 2) - 10;
var width = screenSize.width;
global.isOpen = false
const path = './'
var http = require('http');
global.func = require('../index')
global.icons = {}

func.getIcon(path + 'DNF/images/bottom.png', 'bottom')
func.getIcon(path + 'DNF/images/left.png', 'left')
func.getIcon(path + 'DNF/images/top.png', 'top')
func.getIcon(path + 'DNF/images/right.png', 'right')
func.getIcon(path + 'DNF/images/my.png', 'my')
func.getIcon(path + 'DNF/images/leftTop.png', 'leftTop')
func.getIcon(path + 'DNF/images/bigmap.png', 'bigmap')
func.getIcon(path + 'DNF/images/startTask.png', 'startTask')
func.getIcon(path + 'DNF/images/space.png', 'space')
func.getIcon(path + 'DNF/images/toSpace.png', 'toSpace')
func.getIcon(path + 'DNF/images/fouck.png', 'fouck')

func.getIcon(path + 'DNF/images/nextmap1.png', 'nextmap1')
func.getIcon(path + 'DNF/images/nextmap2.png', 'nextmap2')

func.getIcon(path + 'DNF/images/nextmap3.png', 'nextmap3')
func.getIcon(path + 'DNF/images/nextmap4.png', 'nextmap4')

func.getIcon(path + 'DNF/images/nextmap5.png', 'nextmap5')
func.getIcon(path + 'DNF/images/nextmap6.png', 'nextmap6')
//xiaoniu.png
func.getIcon(path + 'DNF/images/xiaoniu.png', 'xiaoniu')
func.getIcon(path + 'DNF/images/xiaoniu1.png', 'xiaoniu1')
func.getIcon(path + 'DNF/images/xiaoniu2.png', 'xiaoniu2')
func.getIcon(path + 'DNF/images/xiaoniu3.png', 'xiaoniu3')
function sleep(delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
}
let mouseClick=(type)=>{
    robot.mouseToggle('down',type)
    sleep(200)
    robot.mouseToggle('up',type)
   
}
let keytap=(type)=>{
    robot.keyToggle(type, 'down')
    sleep(200)
    robot.keyToggle(type, 'up')
    sleep(200)
}
var arr = []
setTimeout(function () {
    arr = [
        global.icons.left,
        global.icons.right,
        global.icons.top,
        global.icons.bottom,
        global.icons.my,//我
        global.icons.bigmap,//大地图
        global.icons.startTask,//选择任务地图
        global.icons.nextmap1,
        global.icons.nextmap2,
        global.icons.nextmap3,
        global.icons.nextmap4,
        global.icons.xiaoniu,//小地图牛头
        global.icons.xiaoniu1,//小地图牛头1
        global.icons.fouck,
        global.icons.space,
        global.icons.toSpace,
        global.icons.leftTop,
    ]



    func.getPx([global.icons.leftTop], (a, b) => {
        
        var item = a[0]
        item && (global.windowPixel = { x: item.x - 40, y: item.y - 40, w: 840, h: 640 })
        gotos()
    })
   
}, 5000)
let gotos = () => {
    // func.getPx([global.icons.xiaoniu2,global.icons.xiaoniu1,global.icons.xiaoniu,global.icons.fouck,
    //     global.icons.nextmap1,global.icons.nextmap2,global.icons.nextmap3,global.icons.nextmap4,global.icons.nextmap5,global.icons.nextmap6], (a, b) => {
    //     console.log(a,99999)
    //     gotos()
    // })
    // return
    func.getPx(arr, (a, b,dat) => {
       // console.log(a[7],a[8],a.length,'小牛')
        var imgo = false
        dat=dat||{}
        //选择某个apc移动到他的位置
        if(dat.toSpace){
            global.buttonType && robot.keyToggle(global.buttonType, 'up')
            sleep(200)
            robot.moveMouse(dat.toSpace.x+windowPixel.x,dat.toSpace.y+windowPixel.y+100)
            console.log([dat.toSpace.x,windowPixel.x,dat.toSpace.y,windowPixel.y])
            sleep(200)
            mouseClick('right')
        }
        //任务空格选择apc
        if(dat.space){
            keytap('space')
            sleep(200)
            keytap('escape')
            sleep(200)
            keytap('space')
            sleep(200)
            keytap('space')
            sleep(200)
            keytap('escape')
            sleep(200)
            keytap('space')
        }
console.log(dat)
        //选择大地图
        if(a[5]){
            console.log('点击大地图')
            sleep(200)
            robot.moveMouse(a[5].x+windowPixel.x,a[5].y+windowPixel.y-30)
            console.log([a[5].x,windowPixel.x,a[5].y,windowPixel.y]-30)
            sleep(200)
            mouseClick('left') 
            sleep(200)
            mouseClick('left')
            sleep(200)
            gotos()
            return
        }
        //进图打架
        if(a[7]){
            console.log('进图打架')
        }
        //选择任务地图
        if(a[6]){
            console.log('进入地下城')
            keytap('space')
        }
        

        a.forEach((item, index) => {
            
            var where = ['left', 'right', 'up', 'down', global.buttonType][index]
            if (index == 4) {
                
                switch (where) {
                    case 'left':
                        if(a[0].y-item.y>30){
                            robot.keyToggle(global.buttonType, 'up')
                            global.buttonType='down'
                            robot.keyToggle('down', 'down')
                            return
                        }else if(a[0].y-item.y<-30){
                            robot.keyToggle(global.buttonType, 'up')
                            global.buttonType='up'
                            robot.keyToggle('up', 'down')
                            return
                        }
                        
                        break;
                    case 'right':
                        break;
                    case 'up':
                        if(!a[2])return;
                        robot.keyToggle(global.buttonType, 'up')
                        sleep(200)
                        robot.moveMouse(a[2].x+windowPixel.x-50,a[2].y+windowPixel.y+50)
                        console.log([a[2].x,windowPixel.x,a[2].y,windowPixel.y])
                        sleep(200)
                        mouseClick('right')
                        return
                            // if(a[2].x-item.x>20){
                            //     robot.keyToggle(global.buttonType, 'up')
                            //     global.buttonType='right'
                            //     robot.keyToggle('right', 'down')
                            //     return
                            // }else if(a[2].x-item.x<-20){
                            //     robot.keyToggle(global.buttonType, 'up')
                            //     global.buttonType='left'
                            //     robot.keyToggle('left', 'down')
                            //     return
                            // }
                        break;
                    case 'down':
                            if(a[2].x-item.x>20){
                                robot.keyToggle(global.buttonType, 'up')
                                global.buttonType='right'
                                robot.keyToggle('right', 'down')
                                return
                            }else if(a[2].x-item.x<-20){
                                robot.keyToggle(global.buttonType, 'up')
                                global.buttonType='left'
                                robot.keyToggle('left', 'down')
                                return
                            }
                        break;
                }
            }

            
           
            if (item && index < 4 && where != global.buttonType) {
                console.log(where, global.buttonType, index)
                global.buttonType && robot.keyToggle(global.buttonType, 'up')
                global.buttonType = where
                robot.keyToggle(global.buttonType, 'down')

            }
            item && index < 4 && (imgo = true)
        });

        !imgo && global.buttonType && robot.keyToggle(global.buttonType, 'up') && (global.buttonType = false);
        gotos()
    })
}


//robot.keyTap(item)
setTimeout(() => {
    //  robot.keyToggle('right','down')
}, 1000)

const ioHook = require('iohook');
ioHook.on('keydown', event => {
	console.log(event)
	if (event.ctrlKey) {
		
    }
})









http.createServer(function (request, response) {

}).listen(8000);