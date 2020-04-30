const cheerio = require('cheerio');
const superagent = require('superagent');
async function getRaceList(ctx,url){
    return new Promise((resolve,reject) => {
        superagent.get(url)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    let raceData={
                        score:{
                            host:[],
                            guest:[]
                        },
                        player_statistics:{
                            host:[],
                            guest:[]
                        },
                        host:"",
                        guest:"",
                        beginTime:""
                    };
                    const sss = $(".time_f").text().split("：")[1];
                    raceData.beginTime = format(sss);
                    $(".away_score td").each((index,element)=>{
                        if(index===0){
                            raceData.guest = getTeamId($(element).text())
                            guest =getTeamId($(element).text());
                        } else{
                            raceData.score.guest.push(parseInt(dele($(element).text())))
                        }
                    });
                    $(".home_score td").each( (index,element)=>{
                        if(index===0){
                            raceData.host =  getTeamId($(element).text());
                            host =  getTeamId($(element).text());
                        } else{
                            raceData.score.host.push(parseInt(dele($(element).text())))
                        }
                    });
                    //客队数据
                    const len = $("#J_away_content  tbody tr").length;
                    $("#J_away_content  tbody tr").each((index,element)=>{
                        if(index>0&&index!==6&&index<len-2){
                            let playerData = {
                                //name:$(element).children("td").eq(0).text(),
                                //playerId:getPlayerId($(element).children("td").eq(0).text(),guest),
                                time:parseInt($(element).children("td").eq(2).text()),
                                shotHit:parseInt($(element).children("td").eq(3).text().split("-")[0]),
                                totalShot:parseInt($(element).children("td").eq(3).text().split("-")[1]),
                                threeHit:parseInt($(element).children("td").eq(4).text().split("-")[0]),
                                threeShot:parseInt($(element).children("td").eq(4).text().split("-")[0]),
                                penaltyShot:parseInt($(element).children("td").eq(5).text().split("-")[0]),
                                totalPenalty:parseInt($(element).children("td").eq(5).text().split("-")[0]),
                                offensive_rebound:parseInt($(element).children("td").eq(6).text()),
                                defensive_rebound:parseInt($(element).children("td").eq(7).text()),
                                rebound:parseInt(dele($(element).children("td").eq(8).text())),
                                assistance:parseInt(dele($(element).children("td").eq(9).text())),
                                foul:parseInt($(element).children("td").eq(10).text()),
                                steal:parseInt($(element).children("td").eq(11).text()),
                                fault:parseInt($(element).children("td").eq(12).text()),
                                block:parseInt($(element).children("td").eq(13).text()),
                                score:parseInt(dele($(element).children("td").eq(14).text())),
                                positive_negative_point:parseInt(dele($(element).children("td").eq(15).text())),
                            };
                            let data ={
                                playerId:getPlayerId($(element).children("td").eq(0).text(),guest),
                                data:playerData
                            };
                            raceData.player_statistics.guest.push(data)
                        }
                    });
                    //主队数据
                    const len2 = $("#J_home_content  tbody tr").length;
                    $("#J_home_content  tbody tr").each((index,element)=>{
                        if(index>0&&index!==6&&index<len2-2){
                            let playerData = {
                                //name:$(element).children("td").eq(0).text(),
                                //playerId:getPlayerId($(element).children("td").eq(0).text(),host),
                                time:parseInt($(element).children("td").eq(2).text()),
                                shotHit:parseInt($(element).children("td").eq(3).text().split("-")[0]),
                                totalShot:parseInt($(element).children("td").eq(3).text().split("-")[1]),
                                threeHit:parseInt($(element).children("td").eq(4).text().split("-")[0]),
                                threeShot:parseInt($(element).children("td").eq(4).text().split("-")[0]),
                                penaltyShot:parseInt($(element).children("td").eq(5).text().split("-")[0]),
                                totalPenalty:parseInt($(element).children("td").eq(5).text().split("-")[0]),
                                offensive_rebound:parseInt($(element).children("td").eq(6).text()),
                                defensive_rebound:parseInt($(element).children("td").eq(7).text()),
                                rebound:parseInt(dele($(element).children("td").eq(8).text())),
                                assistance:parseInt(dele($(element).children("td").eq(9).text())),
                                foul:parseInt($(element).children("td").eq(10).text()),
                                steal:parseInt($(element).children("td").eq(11).text()),
                                fault:parseInt($(element).children("td").eq(12).text()),
                                block:parseInt($(element).children("td").eq(13).text()),
                                score:parseInt(dele($(element).children("td").eq(14).text())),
                                positive_negative_point:parseInt(dele($(element).children("td").eq(15).text())),
                            };
                            let data ={
                                playerId:getPlayerId($(element).children("td").eq(0).text(),host),
                                data:playerData
                            }
                            raceData.player_statistics.host.push(data)
                        }
                    });
                    resolve(raceData);
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
    console.log(str);
    str = str.replace(/年/g,"-");
    str = str.replace(/月/g,"-");
    str = str.replace(/日/g,"");
    console.log(str);
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
let playerList = [],teamList = [],host = "",guest = "";
module.exports=async function(ctx,url){
    playerList = JSON.parse(await ctx.app.redis.get("player"));
    teamList = JSON.parse(await ctx.app.redis.get("teams"));
    return await getRaceList(ctx,url);
};
