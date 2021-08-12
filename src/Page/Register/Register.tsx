import axios from "axios";
import { useState } from "react";
import styles from "./Register.module.css";

export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setError(false);
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
      // console.log(res);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className={styles.register}>
      <span className={styles.registerTitle}>Register</span>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter your username..."
          value={username}
          onChange={(e) => {
            setUsername(e.currentTarget.value);
          }}
        />
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email..."
          value={email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your pass..."
          value={password}
          onChange={(e) => {
            setpassword(e.currentTarget.value);
          }}
        />
        <button className={styles.registerButton}>Register</button>
      </form>
      <button className={styles.registerLoginButton}>Login</button>
      {error && (
        <span style={{ color: "red", marginTop: "13px" }}>
          Something went wrong
        </span>
      )}
    </div>
  );
}
