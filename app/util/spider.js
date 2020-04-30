const cheerio = require('cheerio');
const superagent = require('superagent');
async function getTeamList(url){
    return new Promise((resolve,reject) => {
        superagent.get(url)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    let team = [];
                    $(".players_list").each((index, element) => {
                        //let arr={area:$(element).prev(".title").text(),team:[]};
                        //console.log($(element).prev(".title").text());
                        let area = $(element).prev(".title").text();
                        $(element).children("li").each((index, element) => {
                            team.push({
                                area: area,
                                name: $(element).children("span").children("a").text(),
                                href: $(element).children("span").children("a").attr("href")
                            })
                        });
                    });
                    resolve(team);
                }
            });
    })
}

async function getPlayerList(url){
    return new Promise((resolve,reject) => {
        superagent.get(url)
            .end(async (err, sres) => { //页面获取到的数据
                if (sres !== undefined && sres !== null) {
                    let html = sres.text;             //整个页面html
                    let $ = cheerio.load(html, {
                        decodeEntities: false
                    });
                    let players = [];
                    let total = $(".players_table tbody tr").length-1;
                    $(".players_table tbody tr").each((index,element)=>{
                        if(index>0){
                            let player={
                                nickname:$(element).children("td").eq(1).children("b").text(),
                                name:$(element).children("td").eq(1).children("p").text(),
                                number:$(element).children("td").eq(2).text(),
                                position:$(element).children("td").eq(3).text(),
                                height:$(element).children("td").eq(4).text(),
                                weight:$(element).children("td").eq(5).text(),
                                birth:$(element).children("td").eq(6).text(),
                                contract:$(element).children("td").eq(7).text(),
                            };
                            players.push(player);
                        }
                    });
                    if(players.length === total){
                        resolve(players);
                    }

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

    /*const url="https://nba.hupu.com/players";
    //getTeamList(url);
    getPlayerList("https://nba.hupu.com/players/rockets").then(res=>{
        console.log("-------");
        console.log(res);
    });*/
module.exports=async function(url){
    //const url="https://nba.hupu.com/players";
    return await getPlayerList(url);
}
