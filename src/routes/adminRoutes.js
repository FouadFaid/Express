var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var books = [
		{
			title: 'war and peace',
			genre: 'Historical Fiction',
			author: 'lev Nikolayevich Tolsotoy',
			read: false
},
		{
			title: 'A journey into the Center',
			genre: 'Science Fiction',
			author: 'Jules Verne',
			read: false
			 }
	,
		{
			title: 'les Miserables',
			genre: 'Historical Fiction',
			author: 'Jules Verne',
			read: false
	}
];
	

var router = function (nav) {
	bookRouter.route('/addBooks')
		.get(function (req, res) {
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, function (err, db) {
				var collection = db.collection('books');
				collection.insertMany(books,
					function (err,results) {
						if(err)
							console.log(err);
						else
							res.send(results);

						db.close();
				})
			});
			//res.send('Inserting book');
		});

	return bookRouter;
}

module.exports = router;