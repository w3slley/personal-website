const express = require('express');
const router = express.Router();
const lib = require('../config/lib.js');

postController = require('../controllers/PostController');

router.get('/create', lib.protected, postController.create);
router.post('/store', lib.protected, postController.store);
router.get('/edit/:postId', lib.protected, postController.edit);
router.post('/update', lib.protected, postController.update);
router.get('/:slug', postController.show);
router.get('/delete/:postId', lib.protected, postController.delete);

module.exports = router;
