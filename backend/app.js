const express = require("express");
const path = require("path");
const db = require("./config/database");
const cors = require("cors");

db.authenticate()
  .then(() => console.log("Database Connected..."))
  .catch((err) => console.error("Error: " + err));

const app = express();

// JSON Middleware for parsing JSON request bodies
app.use(express.json());

app.use(
  cors({
    // origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => res.send("APP"));

app.use("/inventories", require("./routes/inventories"));
app.use("/locations", require("./routes/locations"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server started on port: " + PORT));
