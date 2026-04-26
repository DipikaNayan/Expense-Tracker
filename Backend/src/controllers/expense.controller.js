const Expense = require("../models/expense.model.js");

//Create a new expense
exports.createExpense = async (req, res) => {
  try {
    console.log("REQ.USER: ", req.user);
    console.log("REQ.BODY: ", req.body);

    const { title, amount, category, date } = req.body;

    // validation
    if (!title || !amount || !category || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      date,
    });
    res.status(201).json({
      message: "Expense created successfully",
      expense,
    });
  } catch (err) {
    console.error("FULL ERROR: ", err);
    res.status(500).json({ message: err.message });
  }
};

//GET ALL EXPENSES
exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      user: req.user.id,
    });

    res.status(200).json({
      message: "Expenses fetched successfully",
      expenses,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
};

//UPDATE EXPENSES
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Expense.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.json({
      message: "Expense updated",
      updated,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//DELETE EXPENSES
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    await Expense.findByIdAndDelete(id);
    res.json({
      message: "Expense Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

//ADD TOTAL EXPENSE API

exports.getTotalExpense = async (req, res) => {
  try {
    const total = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$amount" },
        },
      },
    ]);
    res.json({
      total: total[0]?.total || 0,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
