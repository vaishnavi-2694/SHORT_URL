const {getUser}=require('../service/auth');

function checkForAuthentication(req, res, next) {
  const tokencookie = req.cookies?.token;
  console.log("Token cookie:", tokencookie);
  req.user = null;

  if (!tokencookie) return next();

  const user = getUser(tokencookie);
  console.log("User:", user);
  req.user = user;
  return next();
}

  /*if(!authorizationHeaderValue || !authorizationHeaderValue.startswith("Bearer"))
  {  return next();}

const token=authorizationHeaderValue.split("Bearer ")[1];
 const user= getUser(token);
 req.user=user;
 next();*/

//admin
function restrictTo(roles){

return function(req,res,next){
  if(!req.user ) return res.redirect("/login");

if(!roles.includes(req.user.role))
return res.end("UnAuthorized");
return next();

}

}


/*async function restrictToLoggedinUserOnly(req,res,next){
 // const userUid=req.cookies?.uid;

 const userUid=req.headers['Authorization'];

 console.log(req.headers)

  if(!userUid) return res.redirect('/login')
const token = userUid.split("Bearer ")[1] //Bearer token

const user=getUser(token);

  if(!user) return res.redirect('/login')
    req.user=user;
  next();
  }

   async function checkAuth(req, res, next) {

   // const userUid=req.cookies?.uid;

   const userUid=req.headers['authorization'];
   const token = userUid.split("Bearer ")[1] //Bearer token

    const user=getUser(token);

  
    req.user=user;
  next();
   }*/
  module.exports={//restrictToLoggedinUserOnly,checkAuth,
    checkForAuthentication,
    restrictTo,
  }