import React from "react";
import "../styles/Toast.css";

export default function Toast({message, show}){
  return (
    <div className={`ph-toast ${show ? "show" : ""}`}>
      <span className="icon">✓</span>
      <span>{message}</span>
    </div>
  );
}
