const db = require('../config/db')
const bcrypt = require('bcrypt')


exports.show = function(req, res){
  res.render('login', {layout:false})
}
exports.login = function(req, res){
  const username = req.body.username
  const password = req.body.password
  db.query('SELECT * FROM USER WHERE username = ?', username, (err, result)=>{
    if(err) throw(err.sqlMessage)
    user = result[0]
    if(user){
      bcrypt.compare(password, user.password, (err, isPassword)=>{
        if(err) throw(err)
        if(isPassword){
          //creating new session
          req.session.userId = user.user_id
          req.session.username = user.username
          req.session.role = user.role
          res.redirect('/dashboard')
        }
        else{
          res.redirect('/user/login/?error=wrongPassword')
        }
      })
    }
  })
}
exports.logout = function(req, res){
  req.session.destroy((err)=>{
    if(err) throw(err);
    res.redirect('/?logout=true')
  })
}
