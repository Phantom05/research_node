
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var _  = require('lodash');
// var url = `https://iq1.zalba.club/bbs/board.php?bo_table=movie&page=`;
var pageUrl = `https://iq1.zalba.club/bbs/board.php?bo_table=movie&page=`
var detailUrl = `https://iq1.zalba.club/bbs/board.php?bo_table=movie&wr_id=`
var moment = require('moment');
var dataPath = './crawling/data/images/movie_poster/data.json';



// .fz_list .fz_subject a

let endPage = 550
for(let i = 1; i < endPage; i++){
  getListLinkHref(pageUrl+i,i)
}

function getListLinkHref(url,id){
  console.log(url);
  var dataArr = [];

  request(url, async function (err, res, body) {
    var $ = cheerio.load(body);
    var $findElmenet = $('.fz_list li');

    $findElmenet.each(async function (day, item) {
      let tmpData = []
      let tmpObj = {}
      $(item).find('.fz_subject a').each(function (num, item) {
        var href = $(item).attr('href');
        if(href.indexOf('id') !== -1){
          tmpObj.href = href;   
          //  var data = {
          //    c_time: moment().format('YYYY-MM-DD hh:mm:ss'),
          //    href: href,
          //    id:id
          //  };        
           
          //  tmpData.push(data)
          //  
        }
      });

      $(item).find('.fz_subject .list_title').each(function (num, item) {
        var text = $(item).text();
        if(text){
          tmpObj.title = text;
        }
      });
      $(item).find('.fz_subject .subject-right').each(function (num, item) {
        var text = $(item).text();
        if(text){
          tmpObj.release = text;
        }
      });

      $(item).find('.fz_writer').each(function (num, item) {
        var text = $(item).text();
        // if(text && text.indexOf('19금') === -1){
          tmpObj.gern = text;
        // }
      });
      $(item).find('.fz_hit').each(function (num, item) {
        var text = parseInt($(item).text());
        if(text){
          tmpObj.attendance = `${text}만명`;
        }
      });

      
      if(tmpObj.href && tmpObj.gern){
        getImageData(tmpObj.href,tmpObj)
      }


    });
  });
}

function getImageData(url,propsData) {
  var dataArr = [];
  console.log(url,'url');
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
            c_time: moment().format('YYYY-MM-DD hh:mm:ss'),
            src: src,
          };
          Object.assign(data,propsData);
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