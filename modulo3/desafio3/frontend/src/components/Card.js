import React from "react";
import css from "./card.module.css";

export default function Card({ children }) {
  const cssClasses = `card ${css.cardExtra}`;

  return <div className={cssClasses}>{children}</div>;
}
