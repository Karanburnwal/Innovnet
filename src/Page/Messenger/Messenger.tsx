import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Conversation from "../../Component/Conversation/Conversation";
import Message from "../../Component/Message/Message";
import TopBar from "../../Component/TopBar/TopBar";
import { UseSessionContext } from "../../Context/Context";
import Endpoints from "../../Services/Endpoints";
import styles from "./Messenger.module.css";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
export default function Messenger() {
  const { user } = UseSessionContext();
  const [conversations, setConversations] = useState<any>();
  const [currentChat, setcurrentChat] = useState<any>();
  const [messages, setmessages] = useState<any>();
  const [newMessage, setNewMessage] = useState<any>();
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setmessages((prev: any) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socket.current?.emit("addUser", user._id);
    socket.current?.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);
  const recieverId = currentChat?.members.find(
    (member: any) => member !== user._id
  );
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    socket.current?.emit("sendMessage", {
      senderId: user._id,
      recieverId: recieverId,
      text: newMessage,
    });

    try {
      const res = await axios({
        method: "POST",
        baseURL: Endpoints.baseUrl,
        url: "/message",
        data: message,
      });
      setmessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {}
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios({
          method: "GET",
          baseURL: Endpoints.baseUrl,
          url: "/conversation/" + user._id,
        });
        // console.log(res.data);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [user._id]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios({
          method: "GET",
          baseURL: Endpoints.baseUrl,
          url: "/message/" + currentChat?._id,
        });
        setmessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);
  // console.log(messages);
  return (
    <div className={styles.messenger}>
      <div className={styles.chatMenu}>
        <div className={styles.chatMenuWrapper}>
          <input placeholder="Search..." className={styles.chatMenuInput} />
          {conversations?.map((c: any, index: any) => (
            <div
              key={index}
              onClick={() => {
                setcurrentChat(c);
              }}
            >
              <Conversation conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.chatBox}>
        <div className={styles.chatBoxWrapper}>
          {currentChat ? (
            <>
              <div className={styles.chatBoxTop}>
                {messages?.map((m: any, index: any) => (
                  <div key={index} ref={scrollRef}>
                    <Message own={user._id === m.sender} message={m} />
                  </div>
                ))}
              </div>
              <div className={styles.chatBoxBottom}>
                <textarea
                  className={styles.chatMessageInput}
                  placeholder="write something"
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                  }}
                  value={newMessage}
                ></textarea>
                <button
                  className={styles.chatSubmitButton}
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <span className={styles.noConversation}>
              Open a Conversation to chat
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
