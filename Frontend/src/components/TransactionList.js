import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Transaction } from "./Transaction";

export const TransactionList = () => {
  const { transactions, filteredTransactions, setFilteredTransactions } =
    useContext(GlobalContext);

  const dataToShow =
    filteredTransactions.length > 0 ? filteredTransactions : transactions;

  return (
    <div className="history-container">
      <div className="history-header">
        <h3>History</h3>

        {/* Reset Button */}
        {filteredTransactions.length > 0 && (
          <button
            className="reset-btn"
            onClick={() => setFilteredTransactions([])}
          >
            Reset
          </button>
        )}
      </div>

      <ul className="list">
        {Array.isArray(dataToShow) &&
          dataToShow.map((transaction) => (
            <Transaction key={transaction._id} transaction={transaction} />
          ))}
      </ul>
    </div>
  );
};
