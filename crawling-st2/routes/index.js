var express = require('express');
var router = express.Router();
const dataFile = require('../crawling/data/images/movie_poster/data.json');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});


router.get('/crw', function(req, res, next) {
  
  res.json({
    result:1,
    list:dataFile
  })
});

module.exports = router;
