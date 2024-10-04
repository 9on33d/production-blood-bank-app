// server.js
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const imageRoutes = require("./routes/imageRoutes");
const path = require("path");



// config
dotenv.config();

// mongodb connection
connectDB();

// rest object
const app = express();

// middleware
app.use(express.json({limit : "50mb"}));
app.use(cors());
app.use(morgan("dev"));

//  routes
// 1st test route
app.use(("/api/v1/test"), require("./routes/testRoutes"));
app.use(("/api/v1/auth"), require("./routes/authRoutes"));
app.use(("/api/v1/inventory"), require("./routes/inventoryRoutes"));
app.use(("/api/v1/analytics"), require("./routes/analyticsRoutes"));
app.use(("/api/v1/admin"), require("./routes/adminRoutes"));
app.use("/api/v1",imageRoutes);

// static folder
app.use(express.static(path.join(__dirname, 'build')));

// static route

app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  

// port
const PORT = process.env.PORT || 8083;

// listen
app.listen(PORT, () => {
    console.log(`Nose Server Running In ${process.env.DEV_MODE} Mode On Port ${process.env.PORT}`.bgBlue.white);
});

