const express = require('express');
const { isAdmin } = require('../controlles/userControllers');
const { authMiddleware } = require('../authmidellware');
const { createNews, updateNews, deleteNews, getAllNews } = require('../controlles/newsController');
const router = express.Router();

router.post('/createNews', authMiddleware, isAdmin, createNews);
router.put('/UpdateNews/:id', authMiddleware, isAdmin, updateNews);
router.delete('/deleteNews/:id', authMiddleware, isAdmin, deleteNews);

router.get('/', getAllNews);

module.exports = router;
