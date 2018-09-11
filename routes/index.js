const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	if (!req.user)
		res.render('index', { title: 'Express' });
	else
		res.redirect('/chat');
});

router.get('/getUser', (req, res, next) => {
	res.json(req.user)
});

module.exports = router;
