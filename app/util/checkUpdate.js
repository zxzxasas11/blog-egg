const cheerio = require('cheerio');
const superagent = require('superagent');
const moment = require('moment');
async function checkUpdate(ctx,url){
    return new Promise((resolve,reject) => {
        superagent.get(url)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    let arr = [];
                    $("a").each((index,element)=>{
                        if($(element).text()==='数据统计'){
                            arr.push($(element).attr("href"));
                        }
                    });
                    resolve(arr);
                }
            });
    })
}

//unicode转中文
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
}

function format(str){
    str = str.replace(/年/g,"-");
    str = str.replace(/月/g,"-");
    str = str.replace(/日/g,"");
    return new Date(str);
}

//去除\符号
function dele(str){
    return str.replace(/[\'\"\\\\b\f\n\r\t]/g, '');
}

function splitByBr(str){
    const sp = "<br>";
    //let arr = [];
    let arr = str.split("<br>");
    if(arr.length>1){
        arr.splice(arr.length-1,1);
    }
    return arr;
}

function getTeamId(name){
    for(let i in teamList){
        if(teamList[i].name.indexOf(name)>=0){
            return teamList[i]._id
        }
    }
}
function getPlayerId(name,teamId){
    for(let i in playerList){
        if(name===playerList[i].nickname&&teamId===playerList[i].teamId){
            return playerList[i]._id
        }
    }
}

/*const url="https://nba.hupu.com/games/boxscore/157524";
getRaceList(url);*/

/*const str = moment(new Date()).format("YYYY-MM-DD");
const url = "https://nba.hupu.com/schedule/"+str;*/
module.exports=async function(ctx,date){
    const str = date!==undefined?date:moment(new Date()).format("YYYY-MM-DD");
    console.log(str);
    const url = "https://nba.hupu.com/schedule/"+str;
    return await checkUpdate(ctx,url);
};
