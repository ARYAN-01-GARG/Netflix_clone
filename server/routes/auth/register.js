const express = require('express');
const handleRegister  = require('../../controllers/handleRegister');
const router = express.Router();


router.post('/register', handleRegister );

module.exports =  router;