const fs = require('fs')
const MarkdownIt = require('markdown-it')
const md = MarkdownIt()
const format = require('../utilities/format')
const db = require('../config/db')

function getTags(res, posts, pos, tags){
  if(pos==posts.length){//at the end of the posts array, return tags array and break
    //console.log(posts);
    res.render('index', {title: "Weslley's personal website", css: '/css/posts/index.css', posts, tags: tags[0]});
    return;
  }

  db.query('SELECT label FROM TAG NATURAL JOIN POST_TAG NATURAL JOIN POST WHERE post_id=?',posts[pos].post_id,(err, data)=>{
    if(err) throw err;
    posts[pos].label = data;
    getTags(res, posts, pos+1, tags);
  })
}
exports.index = function(req, res){
  let userId = req.session.userId
  db.query('SELECT post_id, title, slug, date_created FROM POST ORDER BY date_created DESC', (err, posts)=>{
    if(err) throw err
    tags = []
    //query tags for each post id - uses recursion to iterate through posts and then render page
    getTags(res, posts, 0, tags);
  })
}

exports.dashboard = function(req, res){
  db.query('SELECT * FROM POST WHERE user_id = ? ORDER BY date_created DESC', req.session.userId, (err, results)=>{
    if(err) throw error
    res.render('dashboard', {title: 'Dashboard - Personal website', posts: results, css:'/css/dashboard.css'})
  });

}
