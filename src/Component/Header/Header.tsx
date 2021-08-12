import React from "react";
import styles from "./Header.module.css";
export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitles}>
        <span className={styles.headerTitleSm}>React & Node</span>
        <span className={styles.headerTitleLg}>Blog</span>
      </div>
      <img
        className={styles.headerImg}
        src="https://images.pexels.com/photos/7502346/pexels-photo-7502346.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
    </div>
  );
}
