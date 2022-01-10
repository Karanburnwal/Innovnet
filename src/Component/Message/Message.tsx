import { format } from "timeago.js";
import "./Message.css";
interface Props {
  own?: boolean;
  message?: any;
}
export default function Messege(props: Props) {
  return (
    <div className={props.own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://images.pexels.com/photos/7704214/pexels-photo-7704214.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt=""
        />
        <p className="messageText">{props.message?.text}</p>
      </div>
      <div className="messageBottom">{format(props.message?.createdAt)}</div>
    </div>
  );
}
