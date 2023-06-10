const express = require("express");
const path = require("path");
const db = require("./data/database");
const totalRoutes = require("./routes/total.routes");
const session = require("express-session");
const mongodbstore = require("connect-mongodb-session");
const MongoDBStore = mongodbstore(session);

const app = express();

const sessionStore = new MongoDBStore({
  uri: "mongodb://localhost:27017",
  databaseName: "jobIN",
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "secret-key-for-the-jobPortal",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);

app.use(totalRoutes);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("failed to connect to database");
    console.log(error);
  });
