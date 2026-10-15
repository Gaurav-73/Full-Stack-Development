import React, { useState } from "react";
import { Link } from "react-router-dom";

function Memberships() {
  const [plan, setPlan] = useState("Monthly");

  const plans = {
    Monthly: { duration: "1 Month", price: 1000 },
    Quarterly: { duration: "3 Months", price: 2700 },
    Yearly: { duration: "12 Months", price: 10000 }
  };

  return (
    <div>
      <h1>Membership Plans</h1>
      <p>Choose a plan to view its price and duration.</p>

      <div className="membership-box">
        <label htmlFor="plan">Membership Plan</label>
        <br />

        <select
          id="plan"
          value={plan}
          onChange={(event) => setPlan(event.target.value)}
        >
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Yearly">Yearly</option>
        </select>

        <h2>{plan} Plan</h2>
        <p>Duration: {plans[plan].duration}</p>
        <p>Price: ₹{plans[plan].price.toLocaleString("en-IN")}</p>

        <Link to="/members/add">
          <button type="button">Add a Member</button>
        </Link>
      </div>
    </div>
  );
}

export default Memberships;
