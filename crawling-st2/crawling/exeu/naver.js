var url="http://comic.naver.com/webtoon/weekday.nhn";	//now url is naver webtoon site
var request=require('request');
var requestP=require('request-promise');
var cheerio=require('cheerio');
var fs=require('fs');
var getSrcs=require('./getSrcs.js');
var dataPath='data.json';
var dataArr=[];
var tasksArr=[];

getSrcs();

setTimeout(async function(){
	console.log('go');
	var string=await fs.readFileSync(dataPath, 'utf-8');
	var data=JSON.parse(string);
	var _i=-1;	//to check if it's first src
	for(var i=0; i<data.length; i++){
		var item=data[i];
		var src=item.src;
		var day=item.day;
		var num=item.num;
		if(_i!=day){
			console.log("Day "+day+" pipe");
			_i++;
		}
		request(src).pipe(fs.createWriteStream(__dirname+'/imgs/'+day+'_'+num+'.jpg'));
	}
}, 10000);


var express=require('express');
var app=express();
app.listen(80);
app.use(express.static(__dirname));
//image files are saved in Directory imgs.
//and set routes for them
app.use(express.static('imgs'));

app.get('/', function(req, res){
	console.log('someone in');
	res.sendFile(__dirname+'/index.html');
});
app.get('/renew', function(req, res){
	fs.readdir(__dirname+'/imgs', function(err, fileArr){
		var body="<h1>Naver Webtoon Previews</h1>";
		for(var i=0; i<fileArr.length; i++){
			var day=fileArr[i].charAt(0);
			var num=fileArr[i].substr(2, 2);
			console.log(fileArr[i]);
			if(num==='00'){
				console.log('true');
				switch(day){
					//case 0: - unavailable
					//case '0': - good
					case '0':body+='<h1>MON</h1>'; break;
					case '1':body+='<h1>TUE</h1>'; break;
					case '2':body+='<h1>WED</h1>'; break;
					case '3':body+='<h1>THU</h1>'; break;
					case '4':body+='<h1>FRI</h1>'; break;
					case '5':body+='<h1>SAT</h1>'; break;
					case '6':body+='<h1>SUN</h1>'; break;
				}
			}
				body+='<img src="';
				body+='/'+fileArr[i];
				body+='">';	
			}
		fs.writeFile('index.html', body, function(){
			// res.send('Sent!!');	
		});
	});
});