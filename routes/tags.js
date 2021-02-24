const express = require('express');
const router = express.Router();
const lib = require('../config/lib.js');

tagController = require('../controllers/TagController');
//router.get('/tag/',lib.protected,tagController.create);
router.get('/:label',tagController.show);
router.get('/manage/all',lib.protected,tagController.manage);
router.post('/list',lib.protected,tagController.list);
router.post('/store',lib.protected,tagController.store);
router.get('/delete/:tagId',lib.protected,tagController.delete);
module.exports = router;
