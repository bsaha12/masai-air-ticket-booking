const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
const {FlightModel} = require("../model/flightModel")

const apiRouter = express.Router();

// POST /api/register
apiRouter.post("/register", async (req, res) => {
  try {
    const payload = req.body;
    const { name, email, password } = payload;

    // check if the user already exists
    const getOldUser = await UserModel.findOne({ email });
    if (getOldUser)
      return res
        .status(400)
        .json({ msg: "User ALready Exists , Please Login!!" });

    bcrypt.hash(password, 5, async (error, hash) => {
      if (error) res.status(500).json({ error });
      else {
        const user = new UserModel({ name, email, password: hash });
        await user.save();
        res.status(201).json({ msg: "New User is successfully registered" });
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// POST /api/login
apiRouter.post("/login", async (req, res) => {
  try {
    const payload = req.body;
    const { name, email, password } = payload;
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (error, result) => {
        if (result) {
          const token = jwt.sign({ userID: user._id }, "masai");
          res.status(201).json({ msg: "Login Successfull", token });
        } else {
          res.status(400).json({ msg: "Invalid Password" });
        }
      });
    } else {
      res.status(400).json({ msg: "Please Register First" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET /api/flights
apiRouter.get("/flights" , async (req , res) =>{
    try {
        const flights = FlightModel.find() ;
        console.log(flights) ;
        res.status(200).json({msg : "flights"}) ;
    } catch (error) {
        res.status(500).json({ error });
    }
} )

// GET /api/flights/:id
apiRouter.get("/flights/:id" , async (req , res) =>{
    try {
        const _id = req.params.id ;
        const flights = FlightModel.findOne({_id}) ;
        console.log(flights) ;
        res.status(200).json({msg : "flights"}) ;
    } catch (error) {
        res.status(500).json({ error });
    }
} )

///<-------------- all the protected routes ----------------->

// POST /api/flights
apiRouter.post("/flights" , async (req , res) =>{
try {
    const payload = req.body ;

} catch (error) {
    res.status(500).json({ error });
}
})


/// Page doesn't exists
apiRouter.use("*", (req, res) => {
  res.status(400).json({ msg: "OOps ! Page Doesn't exist" });
});

module.exports = { apiRouter };
