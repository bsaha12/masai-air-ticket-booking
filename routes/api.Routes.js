const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/userModel");
const { FlightModel } = require("../model/flightModel");
const { BookingModel } = require("../model/bookingModel");
const { auth } = require("../middlewares/auth.middleware");

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
apiRouter.get("/flights", async (req, res) => {
  try {
    const flights = await FlightModel.find();
    res.status(200).json({ flights });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// GET /api/flights/:id
apiRouter.get("/flights/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const flight = await FlightModel.findOne({ _id });
    res.status(200).json({ flight });
  } catch (error) {
    res.status(500).json({ error });
  }
});

///<-------------- all the protected routes ----------------->
apiRouter.use(auth);

// POST /api/flights
apiRouter.post("/flights", async (req, res) => {
  try {
    const payload = req.body;
    const flight = FlightModel(payload);
    await flight.save();
    res.status(201).json({ msg: "New Flight is Saved" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// PUT / PATCH /api/flights/:id
apiRouter.patch("/flights/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const payload = req.body;
    await FlightModel.findByIdAndUpdate({ _id }, payload);
    res.status(204).json({ msg: "Flight Details Updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// DELETE /api/flights/:id
apiRouter.delete("/flights/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const flight = await FlightModel.findByIdAndDelete({ _id });
    res.status(202).json({ msg: "Flight Details Deleted", flight });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// POST  /api/booking
apiRouter.post("/booking", async (req, res) => {
  try {
    const { flightID } = req.body;
    const userID = req.userID;
    // console.log(flightID, userID);
    const book = new BookingModel({ user: userID, flight: flightID });
    await book.save();
    res.status(201).json({ msg: "Booking Completed" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

//GET /api/dashboard
apiRouter.get("/dashboard", async (req, res) => {
  try {
    const userID = req.userID;
    const flights = await BookingModel.find({ user: userID });
    const user = await UserModel.findOne({ _id: userID });
    const flightData = await getFlightData(flights);
    res.status(200).json({ user, flights });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

// PUT/PATCH  api/dashboard/:id
apiRouter.patch("/dashboard/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const payload = req.body;
    await BookingModel.findByIdAndUpdate({ _id }, payload);
    res.status(204).json({ msg: "Booking Details Updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// DELETE  api/dashboard/:id
apiRouter.delete("/dashboard/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    await BookingModel.findByIdAndDelete({ _id });
    res.status(202).json({ msg: "Booking Details Deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

/// Page doesn't exists
apiRouter.use("*", (req, res) => {
  res.status(400).json({ msg: "OOps ! Page Doesn't exist" });
});

// function to get flight data with flights ids as arguments
async function getFlightData(flights) {
  let result = [];
  flights.forEach(async ({ flight }) => {
    const curr = await FlightModel.findOne({ _id: flight });
    result.push(curr);
  });
  return result;
}

module.exports = { apiRouter };
