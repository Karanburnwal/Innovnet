import Sidebar from "../../Component/Sidebar/Sidebar";
import SinglePost from "../../Component/SinglePost/SinglePost";
import styles from "./Single.module.css";
export default function Single() {
  return (
    <div className={styles.single}>
      <SinglePost />
      <Sidebar />
    </div>
  );
}
