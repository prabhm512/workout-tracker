require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const PWD = process.env.MYDB_PWD;

const databaseUrl = `mongodb+srv://prabhm512:${encodeURIComponent(PWD)}@cluster0.ltepl.mongodb.net/workout`;

mongoose.connect(process.env.MONGODB_URI || databaseUrl, { useNewUrlParser: true });

// routes
// app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
