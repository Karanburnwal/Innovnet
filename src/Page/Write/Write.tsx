import axios from "axios";
import { useState } from "react";
import { UseSessionContext } from "../../Context/Context";
import styles from "./Write.module.css";
export default function Write() {
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const { user } = UseSessionContext();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      photo: null,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
      try {
        const res = await axios.post("/posts", newPost);
        window.location.replace("/posts/" + res.data._id);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post" + res.data._id);
    } catch (err) {}
  };
  return (
    <div className={styles.write}>
      {file && (
        <img
          className={styles.writeImg}
          src={URL.createObjectURL(file)}
          alt=""
        />
      )}
      <form className={styles.writeForm} onSubmit={handleSubmit}>
        <div className={styles.writeFormGroup}>
          <label htmlFor="fileInput">
            <i className="fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files![0]);
            }}
          />
          <input
            type="text"
            placeholder="Title"
            className={styles.writeInput}
            autoFocus={true}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
          />
        </div>
        <div className={styles.writeFormGroup}>
          <textarea
            placeholder="Write your idea..."
            className={styles.writeInput + " " + styles.writeText}
            onChange={(e) => {
              setDesc(e.currentTarget.value);
            }}
          ></textarea>
        </div>
        <button className={styles.writeSubmit} type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
