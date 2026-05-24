import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const Logout = () => {
  const { logoutUser } = useContext(GlobalContext);

  return (
    <div>
      <h2>Expense Tracker</h2>

      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};
