import React, { useEffect, useState } from "react";
import Header from "../../Component/Header/Header";
import Sidebar from "../../Component/Sidebar/Sidebar";
import Posts from "../../Component/Posts/Posts";
import styles from "./Home.module.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
// export interface post {
//   title: string;
//   desc: string;
//   username: string;
//   updatedAt: string;
//   createdAt: string;
// }
export default function Home() {
  const [posts, setPosts] = useState<any>([]);
  const { search } = useLocation();
  // console.log("search", search);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("/posts/" + search);
        setPosts(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [search]);
  return (
    <div>
      <Header />
      <div className={styles.home}>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  );
}
