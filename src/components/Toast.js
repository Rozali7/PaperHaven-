import React from "react";
import "../styles/Toast.css";

export default function Toast({message, show}){// Toast is a reusable component that displays short feedback messages based on application state.
  //shows success message for the user 
  return (
    <div className={`ph-toast ${show ? "show" : ""}`}>
      <span className="icon">✓</span>
      <span>{message}</span>
    </div>
  );
}
