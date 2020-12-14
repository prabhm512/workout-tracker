require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// MongoDB Atlas connection
const PWD = process.env.MYDB_PWD;

const databaseUrl = `mongodb+srv://prabhm512:${encodeURIComponent(PWD)}@cluster0.ltepl.mongodb.net/workout`;

mongoose.connect(
  process.env.MONGODB_URI || databaseUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)

// routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
