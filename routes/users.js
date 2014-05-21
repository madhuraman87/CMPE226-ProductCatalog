var express = require('express');
var router = express.Router();

/*
 * GET Product List.
 */
router.get('/productlist', function(req, res) {
    var db = req.db;
    db.collection('product').find().toArray(function (err, items) {
    res.render('listing', { title: 'Products Page' , items : items });
    });
});


/* GET Product Items page. */
router.get('/tvproductitems', function(req, res) {
	var db = req.db;
	db.collection('product').find({ 'type': { '$regex': 'TV', '$options': 'i' } }).toArray(function (err, items){
		//console.log(items);
		res.json(items);
	});

});


/* GET Product Items page. */
router.get('/cosproductitems', function(req, res) {
	var db = req.db;
	db.collection('product').find({ 'type': { '$regex': 'Cosmetics', '$options': 'i' } }).toArray(function (err, items){
		//console.log(items);
		res.json(items);
	});
}); 


/* GET Search results */
router.get('/search', function(req, res) {
	var db = req.db;
	var q = req.query.q;
	db.collection('product').find({
		'$or': [
			{ 'brand': { '$regex': q, '$options': 'i' } },
			{ 'color': { '$regex': q, '$options': 'i' } },
			{ 'desc': { '$regex': q, '$options': 'i' } },
			{ 'dimensions': { '$regex': q, '$options': 'i' } },
			{ 'price': { '$regex': q, '$options': 'i' } },
			{ 'subtype': { '$regex': q, '$options': 'i' } },
			{ 'type': { '$regex': q, '$options': 'i' } },
			{ 'weight': { '$regex': q, '$options': 'i' } }
		]
	}).toArray(function(err, items) {
		// console.log(items);
		res.json(items);
	});
});

module.exports = router;