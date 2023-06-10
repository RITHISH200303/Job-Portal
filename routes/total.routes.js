const express = require("express");
const router = express.Router();
const db = require("../data/database");
const bcrypt = require("bcryptjs");

router.get("/signup", function (req, res) {
  res.render("auth/signup");
});

router.post("/signup", async function (req, res) {
  const checkLists = await db.getDb().collection("users").find().toArray();

  const hashpassword = await bcrypt.hash(req.body.signupPassword, 12);

  let errorValue = false;

  await db.getDb().collection("users").insertOne({
    email: req.body.email,
    password: hashpassword,
    userType: req.body.userType,
    organisation: req.body.organisation,
  });

  for (checkList of checkLists) {
    if (checkList.email == req.body.email) {
      errorValue = true;
    }
    // if(checkLists[1])
  }

  res.json(errorValue);
});

router.get("/login", function (req, res) {
  res.render("auth/login");
});

router.post("/login", async function (req, res) {
  let enteredUser=req.body.email;
  let errorPassword = false;
  let errorEmail = false;
  
    const checkList = await db
      .getDb()
      .collection("users")
      .findOne({ email: enteredUser });

    if(!checkList){
      errorEmail=true;
    }
    else{
      let passwordCheck = await bcrypt.compare(
        req.body.password,
        checkList.password
      );
      if (passwordCheck == false) {
        errorPassword = true;
      } else {
        req.session.user = { id: checkList._id, email: checkList.email };
        req.session.isAuthenticated = true;
      }
    }

  res.json({ errorPassword, errorEmail});
});

router.get("/home", function (req, res) {
  res.render("home");
});

module.exports = router;
