import React from "react";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import classes from "./header.module.css";
function LowerHeader() {
  return (
    <div className={classes.lower_container}>
      <ul>
        <li>
          <AiOutlineMenuUnfold />
          <p>All</p>
        </li>
        <li>Today's Details</li>
        <li> Customer Service</li>
        <li>Registry</li>
        <li>Gift Cards</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
