const express = require("express");
const router = express.Router();
// const db = require("../config/database");
const Location = require("../models/Location");

// Get location list
router.get("/", (req, res) =>
  Location.findAll()
    .then((locations) => {
      console.log(locations);
      res.send(locations);
    })
    .catch((err) => console.log("Error occurred: ", err))
);

module.exports = router;
