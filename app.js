var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var nav = [
		{
		link: '/Authors',
		text: 'Authors'
		}, {
		link: '/Books',
		text: 'Books'
		}];
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);


app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({secret:'library'}));
require('./src/config/passport.js')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');


app.use('/Books', bookRouter);
app.use('/Admin',adminRouter);
app.use('/Auth',authRouter);
app.get('/', function (req, res) {
	res.render('index', {
		title: 'hello from route',
		nav: [{
			link: '/Authors',
			text: 'Authors'
		}, {
			link: '/Books',
			text: 'Books'
		}]
	});
});

app.listen(port, function (err) {
	console.log('you server is running on port' + port);
});