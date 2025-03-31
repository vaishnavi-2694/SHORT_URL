const express =require('express');
const  path =require('path');
const  cookieParser = require('cookie-parser');
const {  checkForAuthentication , restrictTo/*restrictToLoggedinUserOnly,checkAuth*/}=require('./middlewares/auth');

const {connectToMongoDB}=require("./routes/connect")
const urlRoute = require("./routes/url");
const URL=require("./models/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app =express();
const PORT=8000;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>console.log("Connected to MongoDB"))

//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set("views",path.resolve("./view") );
//middelwares

app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser());
app.use(checkForAuthentication)




app.use("/url",restrictTo(["Normal"],["Admin"]),urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);


app.get("/url/:shortId", async (req,res)=>{
const shortId = req.params.shortId;
const entry =await URL.findOneAndUpdate(
  {
    shortId
  }
  , {
    $push:{
      visitHistory: {
        timestamp:Date.now()
      }
    }
  }
)
if (entry) {
  res.redirect(entry.redirectURL);
} else {
  // Handle the case where no matching entry is found
  res.status(404).send("URL not found");
}
})


app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})

