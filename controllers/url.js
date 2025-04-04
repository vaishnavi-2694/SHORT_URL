    const shortid=require("shortid")
    
    const URL=require("../models/url");
const { response } = require("express");
    async function handleGenerateNewShortURL(req,res){const body=req.body;
      if (!body.url) return res.status(400).json({error:"url is required"});


      const  shortId=shortid();
      await URL.create({
        shortId:shortid(8),
        redirectURL:body.url,
        visitHistory:[],
        createdBy:res.user,



      })
      return res.render("home",{
        id: shortId,
      })
      return res.json({id:shortId});



    };


    async function handleGetAnallytics(req,res){

      const shortId=req.params.shortId;
       const result=await URL.findOne({shortId})

      return res.json({totalclicks:result.visitHistory.length,analytics:result.visitHistory})
    }

    module.exports = {
      handleGenerateNewShortURL,
      handleGetAnallytics,
    }