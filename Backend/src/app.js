const express = require("express");
const cors = require("cors");

const connectDB = require("./config/database.js");
const expenseRoutes = require("./routes/expense.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const userRoutes = require("./routes/user.routes");

// Connect Database
connectDB();

const app = express();

//  Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    //origin: ["http://localhost:5173"], // your frontend URL
    // origin: "*",
    credentials: true,
  }),
);

app.use(express.json()); // parse JSON data
app.use(express.urlencoded({ extended: true })); // parse form data

//  Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/user", userRoutes);

app.use("/api/auth", (req, res, next) => {
  console.log("AUTH ROUTE HIT ");
  next();
});

// Export app
module.exports = app;
