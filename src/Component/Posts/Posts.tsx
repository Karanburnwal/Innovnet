import React from "react";
import styles from "./Posts.module.css";
import Post from "../Post/Post";
interface Props {
  posts: any;
}
export default function Posts({ posts }: Props) {
  return (
    <div className={styles.posts}>
      {posts.data?.map((post: any, index: number) => {
        return <Post key={index} post={post} />;
      })}
    </div>
  );
}
