import React, { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Filter = () => {
  const { filterByDate } = useContext(GlobalContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    if (!startDate || !endDate) {
      alert("Select both dates");
      return;
    }

    filterByDate(startDate, endDate);
  };

  return (
    <div className="filter">
      <h3>Filter by Date</h3>

      <input type="date" onChange={(e) => setStartDate(e.target.value)} />

      <input type="date" onChange={(e) => setEndDate(e.target.value)} />

      <button className="apply-btn" onClick={handleFilter}>
        Apply
      </button>
    </div>
  );
};
