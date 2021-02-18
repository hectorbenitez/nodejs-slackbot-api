const { Router } = require('express');
const { check } = require('express-validator');
const { slackSignin } = require('../controller/auth.controller');

const router = Router();

router.post('/slack', [
    check('id_token', 'id_ token is necesary').not().isEmpty(),
], slackSignin);

module.exports = router;