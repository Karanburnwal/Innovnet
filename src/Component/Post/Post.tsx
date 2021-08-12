import React from "react";
import { Link } from "react-router-dom";
import styles from "./Post.module.css";
export const PF = "http://localhost:5000/images/";
export default function Post({ post }: { post: any }) {
  return (
    <div className={styles.post}>
      {post.photo && (
        <img className={styles.postImg} src={PF + post.photo} alt="" />
      )}
      <div className={styles.postInfo}>
        <div className={styles.postCats}>
          {post.categories.map((c: any, index: number) => {
            return (
              <span key={index} className={styles.postCat}>
                {c.name}
              </span>
            );
          })}
        </div>
        <Link to={`/posts/${post._id}`}>
          <span className={styles.postTitle}>{post.title}</span>
        </Link>
        {/* <hr /> */}
        <span className={styles.postDate}>
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className={styles.postDesc}>{post.desc}</p>
    </div>
  );
}
