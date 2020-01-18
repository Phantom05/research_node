// const dataFile = require('./data.json');
const dataFile = require('./crawling/data/images/movie_poster/data.json');
const fs = require('fs');

let body = '<h1>Test</h1>'
dataFile.map(item => {
  console.log(item.src);
  body += `<img src=${item.src} width=80 />`
})

fs.writeFile('hello.html', body, function(){
  // res.send('Sent!!');	
});