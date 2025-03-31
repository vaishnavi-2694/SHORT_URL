const { v4: uuidv4 } = require("uuid");
const User = require("../models/user"); // Capitalize model name for clarity
const { setUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  
  await User.create({
    name,
    email,
    password,
  });

  return res.render("home"); // Make sure "home.ejs" exists in the "views" folder
}

async function handleUserLogIN(req, res) {
  const { email, password } = req.body;
  
  const foundUser = await User.findOne({ email, password });

  if (!foundUser) {
    return res.render("login", { error: "Invalid credentials" });
  }

  console.log("User logged in successfully");

  const token = setUser(foundUser);

  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserLogIN };
