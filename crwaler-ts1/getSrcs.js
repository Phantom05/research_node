// const axios = require("axios");
// const cheerio = require("cheerio");
// const log = console.log;

// const getHtml = async () => {
//   try {
//     return await axios.get("https://www.naver.com/");
//   } catch (error) {
//     console.error(error);
//   }
// };

// getHtml()
//   .then(html => {
//     let ulList = [];
//     const $ = cheerio.load(html.data);
//     const $bodyList = $("div.ah_list.PM_CL_realtimeKeyword_list_base ul.ah_l").children("li.ah_item");

//     // console.log(
//       // $bodyList,'!!!');
    
//       // console.log($bodyList);
//     $bodyList.each(function(i, elem) {
//       ulList[i] = { 
//         title: $(this).find('span.ah_k').text(), 
//         url: $(this).find('a.ah_a').attr('href') 
//       };

//     });

//     const data = ulList.filter(n => n.title);
//     return data;
//   })
//   .then(res => log(res));

var request=require('request');
var cheerio=require('cheerio');
var fs=require('fs');
var url="http://comic.naver.com/webtoon/weekday.nhn";

//getting img srcs from the url
function getSrc(){
	var dataArr=[];
	var dataPath='data.json';
	request(url, async function(err, res, body){
		var $=cheerio.load(body);
		var lastLen=$('.col').eq(6).find('img').length;
		//it means the length of last one, sunday
		
		$('.col ').each(async function (day, item){
			var index=0;
			$(item).find('img').each(function(num, item){;
				var src=$(item).attr('src');
				if(src.substr(src.length-3, 3)=='jpg'){
					console.log(day+', '+index);
					var data={
						day:day,
						num:getNumberInFormat(index),
						title:'No Tiltle yet',
						src:src
					};
					index++;
					dataArr.push(data);
				}
				//console.log(day+' , '+num);
				if(day==6 &&num==lastLen-1){
					
					//this means last, should be modified
					fs.writeFileSync(dataPath, JSON.stringify(dataArr));
					console.log('wrote json file!');
				}
			});
		});
	});	
};

function getNumberInFormat(num){
	var min=0, max=99;
	if(min<=num && num<=max){
		if(0<=num && num<=9){
			return '0'+num;
		}
		else{
			return num;
		}
	}
}

module.exports=getSrc;