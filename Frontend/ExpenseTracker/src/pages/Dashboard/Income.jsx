import React from "react";

const Income = () => {
  return (
    <div>
      <h2>Income Tracker</h2>
      <form>
        <input type="text" placeholder="Income Source" />
        <input type="number" placeholder="Amount" />
        <button type="submit">Add Income</button>
      </form>
    </div>
  );
};

export default Income;
