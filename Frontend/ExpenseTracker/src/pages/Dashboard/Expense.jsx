import React from "react";

const Expense = () => {
  return (
    <div>
      <h2>Expense Tracker</h2>
      <form>
        <input type="text" placeholder="Expense Name" />
        <input type="number" placeholder="Amount" />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default Expense;
