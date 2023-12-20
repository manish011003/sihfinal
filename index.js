//index.js
const express = require("express");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const path = require("path");
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');



connectDb();

const app = express();

const port = process.env.PORT || 3001;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));


// Serve the static files (e.g., index.html)
app.use(express.static(path.join(__dirname, "public")));

//all the routes to serve the links in htm files 
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views/user_auth", "loginpage.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "views/user_auth", "registeruser.html"));
});

app.get("/map", (req, res) => {
    res.sendFile(path.join(__dirname, "views/map", "map.html"));
});
app.get("/quiz", (req, res) => {
    res.sendFile(path.join(__dirname, "views/quiz", "popup1.html"));
});
app.get("/shoplogin", (req, res) => {
    res.sendFile(path.join(__dirname, "views/user_auth", "shoploginpage.html"));
});

app.get("/partner", (req, res) => {
    res.sendFile(path.join(__dirname, "views/abcd", "part.html"));

});

app.get("/userpost", (req, res) => {
    res.sendFile(path.join(__dirname, "views/user_auth", "homeuser.html"));
});
app.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, "views/user_auth", "profile.html"));
});

app.use('/auth', userRoutes);

app.use(bodyParser.json());


// Catch-all route for serving index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
