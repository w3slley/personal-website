const db = require('../config/db');

exports.show = function(req, res){
  let label = req.params.label;
  db.query('SELECT * FROM POST NATURAL JOIN POST_TAG WHERE tag_id=(SELECT tag_id FROM TAG WHERE label=?)',label,(err,posts)=>{
    if(err) throw err;

    res.render('tags/index',{title: 'Tag: '+label, css:'/css/posts/index.css',posts,label});
  });
}
exports.manage = function(req, res){
  db.query('SELECT tag_id, label FROM TAG',(err, tags)=>{
    if(err) throw err;
    res.render('tags/manage',{tags, css:'/css/dashboard.css'});
  });
}
exports.list = function(req, res){
  let tagName = req.body.tagName;
  db.query('SELECT * FROM TAG WHERE label LIKE ?', tagName+'%', (err, result)=>{
    if(err) throw(err);
    if(result.length==0){
      res.end(JSON.stringify([]));
    }
    else{
      res.end(JSON.stringify(result));
    }
  });
}

exports.store = function(req, res){
  let tagName = req.body.tagName;
  db.query('INSERT INTO TAG (label) VALUES(?)', tagName.toLowerCase(), (err)=>{
    if(err) throw(err);
    res.end(JSON.stringify({message: 'Tag added'}));
  });
}

exports.delete = function(req, res){
  let tagId = req.params.tagId;
  db.query('DELETE FROM TAG WHERE tag_id=?',tagId,(err)=>{
    if(err) throw err;
    res.redirect('/tags/manage/all');
  })
}
