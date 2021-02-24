//express
const express = require('express');
const router = express.Router();
const fs = require('fs');
const MarkdownIt = require('markdown-it');
const md = MarkdownIt();
const lib = require('../config/lib.js');

//Controllers
homeController = require('../controllers/HomeController');

//home page
router.get('/', homeController.index);//I put it into a controller because I'll get the posts from the database later on
router.get('/dashboard', lib.protected, homeController.dashboard);
//posts routes
router.use('/posts', require('./posts'));
//tags routes
router.use('/tags',require('./tags'));
//user routes
router.use('/user', require('./user'));

/*
//Routes for static pages
*/
//projects page route
router.get('/projects', (req, res)=>{
	fs.readFile('views/pages/projects.md', 'utf8', (err, data)=>{
		if(err) throw(err);
		let html = md.render(data);
		res.render('static', {content: html, title: 'Projects - Personal Website', css:'/css/static.css'});
	});
});

//physics page route
router.get('/physics', (req, res)=>{
	fs.readFile('views/pages/physics.md', 'utf8', (err, data)=>{
		if(err) throw(err);
		let html = md.render(data);
		res.render('static', {content: html, title: 'Physics - Personal Website', css:'/css/static.css'});
	});
});

//CS page
router.get('/cs', (req, res)=>{
	fs.readFile('views/pages/cs.md', 'utf8', (err, data)=>{
		if(err) throw(err);
		let html = md.render(data);
		res.render('static', {content: html, title: 'Computer Science - Personal website', css:'/css/main.css'});
	});
});

//writing page
router.get('/writing', (req, res)=>{
	fs.readFile('views/pages/writing.md', 'utf8', (err, data)=>{
		if (err) throw(err);
		let html = md.render(data);
		res.render('static', {content: html, title: 'Writing - Personal website', css:'/css/static.css'})
	});
});

//short stories routes
router.use('/shortstories', require('./shortstories.js'));

module.exports=router;
