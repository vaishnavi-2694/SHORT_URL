const express =require("express");
const {handleGenerateNewShortURL, handleGetAnallytics}=require("../controllers/url");
const router =express.Router();


router.post("/", handleGenerateNewShortURL); 


router.get("/analytics/:shortId",handleGetAnallytics);

module.exports = router;