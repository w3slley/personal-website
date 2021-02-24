const express = require('express')
const router = express.Router()
const fs = require('fs')
const md = require('markdown-it')()

router.get('/incendio', (req, res)=>{
	fs.readFile('views/markdown/short-stories/incendio.md', 'utf8', (err, data)=>{
		if(err) throw(err)
		let html = md.render(data)
		res.render('short-stories', {content: html, title: 'O incêndio (The fire)', layout:false})
	})
})

router.get('/ajudantes', (req, res)=>{
	fs.readFile('views/markdown/short-stories/ajudantes.md', 'utf8', (err, data)=>{
		if(err) throw(err)
		let html = md.render(data)
		res.render('short-stories', {content: html,title: 'Ajudantes (Helpers)' ,layout:false})
	})
})

module.exports = router
