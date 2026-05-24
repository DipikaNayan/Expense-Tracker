import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const AddTransaction = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [date, setDate] = useState(new Date());

  const { addTransaction } = useContext(GlobalContext);

  const onSubmit = (e) => {
    e.preventDefault();

    const finalCategory = category === "Other" ? customCategory : category;

    console.log("FINAL DATA: ", {
      title: text,
      amount,
      category: finalCategory,
      date,
    });

    // Validation
    if (
      text.trim() === "" ||
      amount === "" ||
      category === "" ||
      date === "" ||
      (category === "Other" && customCategory.trim() === "")
    ) {
      alert("Please fill all fields!");
      return;
    }

    const newTransaction = {
      title: text,
      amount: Number(amount),
      category: finalCategory,
      date: date.toISOString().split("T")[0],
    };

    addTransaction(newTransaction);

    // Reset fields
    setText("");
    setAmount("");
    setCategory("");
    setCustomCategory("");
    setDate("");
  };

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        {/* TITLE */}
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter title..."
          />
        </div>

        {/* AMOUNT */}
        <div className="form-control">
          <label>
            Amount <br />
            (negative - expense, positive - income)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
          />
        </div>

        {/* CATEGORY */}
        <div className="form-control">
          <label>Category</label>
          <select
            id="category"
            className="select-box"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>

          {category === "Other" && (
            <div className="form-control">
              <label>Custom Category</label>
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter custom category..."
              />
            </div>
          )}
        </div>

        <div className="form-control">
          <label>Date</label>

          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            minDate={new Date("2000-01-01")}
            placeholderText="Select a date"
          />
        </div>

        <button className="btn">Add transaction</button>
      </form>
    </>
  );
};
