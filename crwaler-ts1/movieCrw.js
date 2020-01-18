
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var _  = require('lodash');
// var url = `https://iq1.zalba.club/bbs/board.php?bo_table=movie&page=`;
var pageUrl = `https://iq1.zalba.club/bbs/board.php?bo_table=movie&page=`
var detailUrl = `https://iq1.zalba.club/bbs/board.php?bo_table=movie&wr_id=`
var moment = require('moment');
var dataPath = './data/images/movie_poster/data.json';



// .fz_list .fz_subject a


for(let i = 2; i < 30; i++){
  getListLinkHref(pageUrl+i,i)
}

function getListLinkHref(url,id){
  console.log(url);
  var dataArr = [];

  request(url, async function (err, res, body) {
    var $ = cheerio.load(body);
    var $findElmenet = $('.fz_list .fz_subject');

    $findElmenet.each(async function (day, item) {

      $(item).find('a').each(function (num, item) {
        var href = $(item).attr('href');
        if(href.indexOf('id') !== -1){
           var data = {
             c_time: moment().format('YYYY-MM-DD hh:mm:ss'),
             href: href,
             id:id
           };
           console.log(data);
           
           getImageData(data.href)
        }
      });
    });
  });
}

function getImageData(url,id) {
  var dataArr = [];
  request(url, async function (err, res, body) {
    var $ = cheerio.load(body);
    var $findElmenet = $('#movie_poster');
    var lastLen = $findElmenet.find('img').length;
    //it means the length of last one, sunday

    $findElmenet.each(async function (day, item) {
      $(item).find('img').each(function (num, item) {
        
        var src = $(item).attr('src');
        if (src.substr(src.length - 3, 3) == 'jpg') {
          var data = {
            c_title: moment().format('YYYY-MM-DD hh:mm:ss'),
            title: 'No Tiltle yet',
            src: src,
            id:id
          };
          dataArr.push(data);
        }
      });
      dataArr.forEach((item,idx)=>{
        fs.appendFile(dataPath, JSON.stringify(item)+',',function (err) {
          if (err) throw err; 
          console.log('The "data to append" was appended to file!'); 
       });
      })

    });

  });
};



// let body = '<h1>Test</h1>'
// dataFile.map(item => {
//   console.log(item.src);
//   body += `<img src=${item.src} width=50 /><br/>`
// })

// fs.writeFile('hello.html', body, function(){
//   res.send('Sent!!');	
// });



// //getting img srcs from the url
// function getSrc(){
// 	var dataArr=[];
// 	var dataPath='data.json';
// 	request(url, async function(err, res, body){
// 		var $=cheerio.load(body);
// 		var lastLen=$('.col').eq(6).find('img').length;
// 		//it means the length of last one, sunday

// 		$('.col ').each(async function (day, item){
// 			var index=0;
// 			$(item).find('img').each(function(num, item){;
// 				var src=$(item).attr('src');
// 				if(src.substr(src.length-3, 3)=='jpg'){
// 					console.log(day+', '+index);
// 					var data={
// 						day:day,
// 						num:getNumberInFormat(index),
// 						title:'No Tiltle yet',
// 						src:src
// 					};
// 					index++;
// 					dataArr.push(data);
// 				}
// 				//console.log(day+' , '+num);
// 				if(day==6 &&num==lastLen-1){

// 					//this means last, should be modified
// 					fs.writeFileSync(dataPath, JSON.stringify(dataArr));
// 					console.log('wrote json file!');
// 				}
// 			});
// 		});
// 	});	
// };


// module.exports=getSrc;