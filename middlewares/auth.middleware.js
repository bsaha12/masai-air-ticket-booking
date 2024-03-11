const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // console.log(token)
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai");
      if (decoded) {
        // console.log(decoded);
        req.userID = decoded.userID;
        next();
      } else {
        res.status(401).json({ msg: "You are not authorized" });
      }
    } catch (error) {
      res.status(401).json({ msg: "You are not authorized"  });
    }
  } else {
    res.status(400).json({ msg: "Please Login" });
  }
};

module.exports = { auth };
