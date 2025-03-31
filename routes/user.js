const express = require("express");

const {handleUserSignUp,handleUserLogIN} = require("../controllers/user");

const router =express.Router();

router.post('/',handleUserSignUp);

router.post("/login",handleUserLogIN);

module.exports = router;