const robot = require("robotjs")
const getPixels = require("get-pixels")
const screenshot = require('screenshot-desktop')
const checks = require('../check/index')
var fs = require('fs');
var AipOcrClient = require("baidu-aip-sdk").ocr;
var APP_ID = "16059958";
var API_KEY = "j7ECvujFdkjVVOZvgddu6kR0";
var SECRET_KEY = "hEpClWTOApsB8bGwnTZaQnMhwQwNYOOf";
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);
var HttpClient = require("baidu-aip-sdk").HttpClient;
HttpClient.setRequestOptions({ timeout: 5000 });

let PS={
    whatToDo:()=>{
        return new Promise((resolve, reject) => {
            checks.djl({fun:function(){
                resolve(true)
            }})
        })
        
    },
    where:()=>{

    },
    toGangs:()=>{
        robot.keyTap('tap')
    }
}

module.exports = ()=>{
    PS.whatToDo().then((io)=>{
        console.log(io)
    })
}