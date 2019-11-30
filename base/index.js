const robot = require("robotjs")
const getPixels = require("get-pixels")
const screenshot = require('screenshot-desktop')

global.baseFun={
    //get
    getImgs(errrj){
        return new Promise((rl,rj)=>{
            screenshot({ filename: 'shot.png' }).then((imgPath) => {
                console.log('开始截取图片成功',imgPath)
                errrj? errrj(imgPath):rl(imgPath)
            }).catch((err) => {
                baseFun.getImgs(rl)
            });
        })
    },
}
module.exports=baseFun