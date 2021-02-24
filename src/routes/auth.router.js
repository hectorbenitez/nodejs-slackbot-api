const { Router } = require('express');
const { check } = require('express-validator');
const { slackSignin } = require('../controller/auth.controller');

const router = Router();

router.get('/slack', (req, res) => {
    res.send('redirecting')
})

router.post('/slack', [
    check('code', 'code is necesary').not().isEmpty()
], slackSignin);

module.exports = router;
