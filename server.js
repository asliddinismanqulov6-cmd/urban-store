const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.listen(PORT, "0.0.0.0", () => {
  console.log("URBAN STORE sayt ishga tushdi: " + PORT);
});