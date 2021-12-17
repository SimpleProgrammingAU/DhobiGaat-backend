const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userAuthRoute = require("./route/user-auth");
const adminAuthRoute = require("./route/admin-auth");
const adminManipulate = require("./route/adminManipulate");
const orderManipulate = require("./route/orderManipulate");
const userManipulate = require("./route/userManipulate");
var cors = require("cors");
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

app.listen(8800, () => {
  console.log("Backend server is running!");
});
