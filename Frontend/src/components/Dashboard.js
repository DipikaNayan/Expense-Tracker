import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

import { Balance } from "./Balance";
import { IncomeExpenses } from "./IncomeExpenses";
import { TransactionList } from "./TransactionList";
import { AddTransaction } from "./AddTransaction";
import { Filter } from "./Filter";
import { ExpenseChart } from "./ExpenseChart.js";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

<Link to="/profile" className="menu-item">
  👤 Profile
</Link>;
export const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // 👈 ADD THIS

        const res = await axios.get("http://localhost:3000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // 👈 ADD THIS
          },
        });

        setProfile(res.data);
      } catch (err) {
        console.error("Profile error", err);
      }
    };

    fetchProfile();
  }, []);

  const { logoutUser } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // clear data
    //navigate("/", { replace: true }); // go to login page
    // ✅ FORCE redirect to frontend (IMPORTANT)
    window.location.href = "http://localhost:3001/";
  };

  return (
    <div className="app">
      {/* Sidebar */}

      <div className="sidebar">
        <h2>💰 Expense Tracker</h2>

        {/* PROFILE SECTION */}
        <div className="profile-box">
          {profile ? (
            <>
              <p>👤 {profile.username}</p>
              <p>📧 {profile.email}</p>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      {/* Main Content */}
      <div className="main">
        <div className="header">Dashboard</div>

        {/* Cards Section */}
        <div className="cards">
          <div className="card balance">
            <Balance />
          </div>

          <div className="card income">
            <IncomeExpenses />
          </div>
        </div>

        {/* Expense chart */}
        <div className="cards">
          <div className="card expense">
            <ExpenseChart />
          </div>
        </div>

        {/* Filter */}
        <div className="form">
          <Filter />
        </div>

        {/* Transactions */}
        <div className="transactions">
          <TransactionList />
        </div>

        {/* Add Transaction */}
        <div className="form">
          <AddTransaction />
        </div>
      </div>
    </div>
  );
};
