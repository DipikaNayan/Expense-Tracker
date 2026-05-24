import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const ExpenseChart = () => {
  const { transactions } = useContext(GlobalContext);

  // Safety check
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  // Group by category
  const dataMap = {};

  safeTransactions.forEach((t) => {
    const category = t.category || "Other";

    if (!dataMap[category]) {
      dataMap[category] = 0;
    }

    dataMap[category] += t.amount;
  });

  // Convert to array
  const chartData = Object.keys(dataMap).map((key) => ({
    category: key,
    amount: dataMap[key],
  }));

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Expense Chart</h3>

      <BarChart width={400} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" />
      </BarChart>
    </div>
  );
};
export default ExpenseChart;
