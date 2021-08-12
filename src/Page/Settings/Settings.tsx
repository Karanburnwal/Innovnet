import axios from "axios";
import { useState } from "react";
import { PF } from "../../Component/Post/Post";
import Sidebar from "../../Component/Sidebar/Sidebar";
import { UseSessionContext, UseSessionDispatcher } from "../../Context/Context";
import styles from "./Settings.module.css";
interface user {
  userId: number;
  username?: string;
  email?: string;
  password?: string;
  profile?: any;
}
export default function Setting() {
  const { user } = UseSessionContext();
  const [file, setFile] = useState<any>();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [status, setStatus] = useState<boolean>(false);
  const dispatch = UseSessionDispatcher();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser: user = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profile = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      if (res.status === 200) {
        setStatus(true);
      }
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className={styles.setting}>
      <div className={styles.settingWrapper}>
        <div className={styles.settingsTitle}>
          <span className={styles.settingsUpdateTitle}>
            Update Your Account
          </span>
          <span className={styles.settingsDeleteTitle}>Delete Account</span>
        </div>
        <form className={styles.settingsForm} onSubmit={handleSubmit}>
          <label htmlFor="">Profile Picture</label>
          <div className={styles.settingsPP}>
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profile}
              alt=""
            />
            <label htmlFor="fileInput">
              <i className={styles.settingsPPIcon + " far fa-user-circle"}></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files![0]);
              }}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Email</label>
          <input
            type="text"
            placeholder={user.email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className={styles.settingsSubmit} type="submit">
            Update
          </button>
        </form>
        {status && (
          <span style={{ color: "green", fontSize: "20px" }}>
            *Profile has been Updated
          </span>
        )}
      </div>
      <Sidebar />
    </div>
  );
}
