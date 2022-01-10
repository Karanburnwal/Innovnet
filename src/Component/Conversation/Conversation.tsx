import axios from "axios";
import { useEffect, useState } from "react";
import Endpoints from "../../Services/Endpoints";
import { PF } from "../Post/Post";
import { img } from "../TopBar/TopBar";
import styles from "./Conversation.module.css";

interface Props {
  conversation: any;
  currentUser: any;
}

export default function Conversation({ conversation, currentUser }: Props) {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const friendId = conversation?.members?.find(
      (m: any) => m !== currentUser._id
    );
    const getUser = async () => {
      try {
        const res = await axios({
          method: "GET",
          baseURL: Endpoints.baseUrl,
          url: "/users/" + friendId,
        });
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className={styles.conversation}>
      {}
      <img
        className={styles.conversationImg}
        src={user?.profile ? PF + user?.profile : img}
        alt=""
      />
      <span className={styles.conversationName}>{user?.username}</span>
    </div>
  );
}
