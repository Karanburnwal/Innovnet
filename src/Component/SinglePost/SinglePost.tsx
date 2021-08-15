import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UseSessionContext } from "../../Context/Context";
import Endpoints from "../../Services/Endpoints";
import { PF } from "../Post/Post";
import styles from "./SinglePost.module.css";
export default function SinglePost() {
  const { user } = UseSessionContext();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState<any>();
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const handleDelete = async () => {
    try {
      // const res = await axios.delete(
      //   `http://localhost:5000/api/delete/${post.photo}`
      // );
      // console.log(res);
      // await axios.delete(`/posts/${path}`, {
      //   data: { username: user.username, img: post.photo },
      // });
      await axios({
        method: "DELETE",
        baseURL: Endpoints.baseUrl,
        url: Endpoints.posts + path,
        data: { username: user.username, img: post.photo },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdate = async () => {
    try {
      // await axios.put(`/posts/${post._id}`, {
      //   username: user.username,
      //   title,
      //   desc,
      // });
      await axios({
        method: "PUT",
        baseURL: Endpoints.baseUrl,
        url: Endpoints.posts + post._id,
        data: { username: user.username, title, desc },
      });
      // setUpdateMode(false);
      window.location.reload();
    } catch (err) {}
  };
  useEffect(() => {
    const getPost = async () => {
      // const res = await axios.get("/posts/" + path);
      const res = await axios({
        method: "GET",
        baseURL: Endpoints.baseUrl,
        url: Endpoints.posts + path,
      });
      console.log(res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);
  return (
    <div className={styles.singlePost}>
      <div className={styles.singlePostWrapper}>
        {post?.photo && (
          <img className={styles.singlePostImg} src={PF + post?.photo} alt="" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className={styles.singlePostTitleInput}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            autoFocus
          />
        ) : (
          <h1 className={styles.singlePostTitle}>
            {post?.title}
            {post?.username === user?.username && (
              <div className={styles.singlePostEdit}>
                <i
                  className={styles.singlePostIcon + " far fa-edit"}
                  onClick={() => {
                    setUpdateMode(true);
                  }}
                ></i>
                <i
                  className={styles.singlePostIcon + " far fa-trash-alt"}
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className={styles.singlePostInfo}>
          <span className={styles.singlePostAuthor}>
            Auther:
            <Link to={`/?user=${post?.username}`}>
              <b>{post?.username}</b>
            </Link>
          </span>
          <span className={styles.singlePostDate}>
            {new Date(post?.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            value={desc}
            className={styles.signlePostDescInput}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        ) : (
          <p className={styles.singlePostDesc}>{post?.desc}</p>
        )}
        {updateMode && (
          <button className={styles.singlePostBtn} onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
