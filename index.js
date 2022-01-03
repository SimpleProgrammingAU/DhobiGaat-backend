const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const serviceAccount = require("./firebase.json");
const dotenv = require("dotenv");
const userAuthRoute = require("./route/user-auth");
const adminAuthRoute = require("./route/admin-auth");
const adminManipulate = require("./route/adminManipulate");
const orderManipulate = require("./route/orderManipulate");
const userManipulate = require("./route/userManipulate");
const earningManipulate = require("./route/earningManipulate");
const serviceManipulate = require("./route/serviceManipulate");
const resetEmail = require("./route/resetEmail");
var cors = require("cors");
const admin = require("firebase-admin");
const port = process.env.PORT || 8800;
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });
app.use(cors());
app.use(express.json());

app.use("/api/userAuth", userAuthRoute);
app.use("/api/adminAuth", adminAuthRoute);
app.use("/api/adminManipulate", adminManipulate);
app.use("/api/orderManipulate", orderManipulate);
app.use("/api/userManipulate", userManipulate);
app.use("/api/earningManipulate", earningManipulate);
app.use("/api/serviceManipulate", serviceManipulate);
app.use("/api/resetEmail", resetEmail);

app.listen(port, () => {
  console.log("Backend server is running!");
});
