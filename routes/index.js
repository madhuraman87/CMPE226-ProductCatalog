var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'CMPE 226 - Database Design' });
});

/* GET search page. */
router.get('/searchpage', function(req, res) {
  res.render('search', { title: 'Search Page' });
});

/* GET TV Product page*/
router.get('/tvproducts', function(req, res) {
  res.render('tvproducts', { title: 'Items Page'});
});

/* GET Cosmetics Product page*/
router.get('/cosproducts', function(req, res) {
  res.render('cosproducts', { title: 'Items Page' });
});

/* GET Books Product page*/
router.get('/booksproducts', function(req, res) {
  res.render('booksproducts', { title: 'Items Page'});
});

/* GET Fridge Product page*/
router.get('/fridgeproducts', function(req, res) {
  res.render('fridgeproducts', { title: 'Items Page'});
});

module.exports = router;