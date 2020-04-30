const cheerio = require('cheerio');
const superagent = require('superagent');
async function getRaceList(url){
    return new Promise((resolve,reject) => {
        superagent.get(url)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    $(".left").not(".linglei").not("td").each((index,element)=>{
                        console.log($(element).children("td").eq(2).children("a").attr("href"));
                    })
                }

            });
    })
}

//unicode转中文
function decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
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

const url="https://nba.hupu.com/schedule/2019-12-17";
getRaceList(url);
/*let playerList = [],teamList = [],host = "",guest = "";
module.exports=async function(ctx,url){
    playerList = JSON.parse(await ctx.app.redis.get("player"));
    teamList = JSON.parse(await ctx.app.redis.get("teams"));
    return await getRaceList(ctx,url);
};*/
