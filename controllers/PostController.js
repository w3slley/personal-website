const db = require('../config/db');
const format = require('../utilities/format');
const MarkdownIt = require('markdown-it');
const md = MarkdownIt();
//index function is implemented in / router

exports.show = function(req, res){
  let slug = req.params.slug;
  db.query('SELECT * FROM POST WHERE slug = ?', slug, (err, results)=>{
    if(err) throw error;
    if(results.length == 0){
      res.render('404');
    }
    let postId = results[0].post_id;
    //updating number of views (logged user doesn't count)
    if(req.session.userId === undefined){
      db.query('UPDATE POST SET view_count = view_count + 1 WHERE post_id = ?', postId, (err)=>{
        if(err) throw err;
      })
    }
    let title = results[0].title;
    let content = md.render(results[0].content);
    let dateCreated = format.dateToString(results[0].date_created);
    let viewCount = results[0].view_count;

    db.query('SELECT label FROM POST NATURAL JOIN POST_TAG NATURAL JOIN TAG WHERE post_id = ?', postId, (err,result)=>{
      if(err) throw error;
      res.render('posts/show', {css: '/css/posts/blogpost.css', postId, title, content, tags: result, dateCreated});
    })
  })
}

exports.create = function(req, res){
  res.render('posts/create', {title: "Create new post", css:"/css/posts/postAction.css"});
}

exports.store = function(req, res){
  let title = req.body.title;
  let content = req.body.content;
  let tags = req.body.tags;
  db.query('INSERT INTO POST (title, user_id, content, slug) VALUES (?,?,?,?)',[title, req.session.userId, content, format.slugify(title)], (err)=>{
    if(err) throw(err);
    //getting post id using MySQL's LAST_INSERT_ID() stored function
    db.query('SELECT LAST_INSERT_ID() as post_id',(err,data)=>{
      if(err) throw err;
      tags.forEach(tag=>{
        //adding each tag to post
        db.query('INSERT INTO POST_TAG (post_id,tag_id) VALUES(?,(SELECT tag_id FROM TAG WHERE label=?))',[data[0].post_id, tag],(err)=>{
          if(err) throw err;
        })
      })
      res.end();
    })
  })
}

exports.edit = function(req, res){
  db.query('SELECT * FROM POST WHERE post_id = ?', req.params.postId, (err, results)=>{
    title = results[0].title;
    content = results[0].content;
    postId = results[0].post_id;
    htmlContent = md.render(content);
    db.query('SELECT label FROM POST NATURAL JOIN POST_TAG NATURAL JOIN TAG WHERE post_id = ?',postId,(err,tags)=>{
      res.render('posts/edit', {postId,title, content, tags, htmlContent, css:"/css/posts/postAction.css"});
    })
  })
}

exports.update = function(req, res){
  let title = req.body.title;
  let content = req.body.content;
  let postId = req.body.postId;
  let tags = req.body.tags;
  //for each tag in the array, check if it's already added to post. If not, add it.
  tags.forEach(tag =>{
    db.query('SELECT post_id, tag_id FROM POST_TAG WHERE post_id = ? AND tag_id = (SELECT tag_id FROM TAG WHERE label = ?)', [postId, tag],(err,result)=>{
      if(result.length==0){
        db.query('INSERT INTO POST_TAG (post_id, tag_id) VALUES (?,(SELECT tag_id FROM TAG WHERE label=?))',[postId, tag], (err)=>{
          if(err) throw(err);
        })
      }
    })
  })
  //updating post table
  db.query('UPDATE POST SET title = ?, content = ?, last_updated=NOW(), slug = ? WHERE post_id = ?',[title, content, format.slugify(title), postId], (err)=>{
    if(err) throw(err);
    res.end(JSON.stringify({slug: format.slugify(title)}));
  })
}

exports.delete = function(req, res){
  let postId = req.params.postId;
  //deleting posts from POST_TAG table first
  db.query('DELETE FROM POST_TAG WHERE post_id = ?', postId, (err)=>{
    if(err) throw err;
    //deliting posts from POST table
    db.query('DELETE FROM POST WHERE post_id = ?', postId, (err)=>{
      if(err) throw err;
      res.redirect('/dashboard');
    })
  })
}
