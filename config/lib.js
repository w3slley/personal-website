//middleware for authentication check
//when middleware writes to the body, don't call next() function.
exports.protected = function(req, res, next){
  if(!req.session.userId)
    res.redirect('/user/login')
  else
    next()
}
