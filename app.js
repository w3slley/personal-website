//loading environment variables
require('dotenv').config();

//express
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//setting static default folder
app.use(express.static('assets'));

//handlebars
//changed file extention from .handlebars to .hbs with the following config
const handlebars = require('express-handlebars');

//implementing function which returns date in string format
const format = require('./utilities/format');

app.engine('.hbs', handlebars({
	helpers:{
		dateToString: function(date){
			return format.dateToString(date);
		}
	},
	extname: '.hbs'
}))

app.set('view engine', '.hbs');

//express-session
const session = require('express-session');
app.use(session({secret: '29146awhdo@e!!JGAJHGI8)(*&)', resave: false, saveUninitialized: true}));

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));//parse application/x-www-form-urlencoded
app.use(bodyParser.json()); //parse json

//authentication middleware
app.use((req, res, next)=>{
	if(req.session.userId){
		res.locals.userId = req.session.userId;
		res.locals.username = req.session.username;
		res.locals.role = req.session.role;
	}
	next();
});

//routes
app.use('/', require('./routes/index'));

app.listen(port, ()=>{
	console.log('Server listening at port '+port);
});
