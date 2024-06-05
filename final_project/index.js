const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next) {
  
  // Check if the authorization object exists in the session
  if (req.session.authorization) {
    // Retrieve the token from the session
    const token = req.session.authorization['accessToken'];

    // Verify the token using the secret key
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        // If the token is valid, store the decoded user information in the request
        req.user = user;
        next();
      } else {
        // If the token is invalid, return a 403 status with an error message
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    // If no authorization object exists in the session, return a 403 status with an error message
    return res.status(403).json({ message: "User not logged in" });
  }
});
 
const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
