import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";
export default function Sidebar() {
  const [cats, setCats] = useState<any>([]);
  const getCats = async () => {
    const res = await axios.get("/categories");
    setCats(res.data);
  };
  useEffect(() => {
    getCats();
  }, []);
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>ABOUT ME</span>
        <img
          className={styles.sidebarImg}
          src="https://images.pexels.com/photos/5262459/pexels-photo-5262459.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>CATEGORIES</span>
        <ul className={styles.sidebarList}>
          {cats?.map((c: any, index: number) => (
            <Link to={`/?cat=${c.name}`}>
              <li key={index} className={styles.sidebarListItem}>
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.sidebarItem}>
        <span className={styles.sidebarTitle}>FOLLOW US</span>
        <div className={styles.sidebarSocial}>
          <i className={styles.sidebarIcon + " fab fa-facebook-square"}></i>
          <i className={styles.sidebarIcon + " fab fa-twitter-square"}></i>
          <i className={styles.sidebarIcon + " fab fa-pinterest-square"}></i>
          <i className={styles.sidebarIcon + " fab fa-instagram-square"}></i>
        </div>
      </div>
    </div>
  );
}
