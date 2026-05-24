import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      <div className="transaction-details">
        <strong>{transaction.title}</strong>
        <small className="category-label">
          {transaction.category || "Uncategorized"}
        </small>
      </div>

      <div className="right-section">
        <span className="amount">
          {sign}${Math.abs(transaction.amount)}
        </span>

        <button
          onClick={() => deleteTransaction(transaction._id)}
          className="delete-btn"
        >
          x
        </button>
      </div>
    </li>
  );
};
