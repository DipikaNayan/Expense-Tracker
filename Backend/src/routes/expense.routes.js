const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware.js");

const {
  createExpense,
  getAllExpenses,
  updateExpense,
  deleteExpense,
  getTotalExpense,
} = require("../controllers/expense.controller");

// Create expense
router.post("/create", authMiddleware, createExpense);

// Get all expenses
router.get("/all", authMiddleware, getAllExpenses);

// Update expense
router.put("/update/:id", authMiddleware, updateExpense);

// Delete expense
router.delete("/delete/:id", authMiddleware, deleteExpense);

// Get total expense
router.get("/total", authMiddleware, getTotalExpense);

module.exports = router;
