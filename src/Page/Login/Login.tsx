import axios from "axios";
import { useRef } from "react";
import { UseSessionContext, UseSessionDispatcher } from "../../Context/Context";
import styles from "./Login.module.css";

export default function Login() {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { user } = UseSessionContext();
  const dispatch = UseSessionDispatcher();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current?.value,
        password: passwordRef.current?.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };
  console.log(user);
  return (
    <div className={styles.login}>
      <span className={styles.loginTitle}>Login</span>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" placeholder="Enter your username..." ref={userRef} />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your pass..."
          ref={passwordRef}
        />
        <button className={styles.loginButton} type="submit">
          Login
        </button>
      </form>
      <button className={styles.loginRegisterButton}>Register</button>
    </div>
  );
}
