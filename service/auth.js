//const sessionIdToUserMap = new Map();
//stateless 

const jwt=require('jsonwebtoken');

const secret="vaishnavi$"

function setUser(user){

  //sessionIdToUserMap.set(id,user);
return jwt.sign({
  _id:user._id,
  email:user._email,
  role: user.role,
},secret)

};
function getUser(token) {
  if (!token) {
    console.error("No token provided!");
    return null;
  }

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    console.error("Token verification failed:", err.message);
    return null;
  }
}


module.exports = {setUser,getUser}