import { MessageType } from "../../types/MessageType";
import "../../css/components/message/MessageItem.css";
import readIcon from "../../assets/read-icon.svg";
import unreadIcon from "../../assets/unread-icon.svg";
import { READ_STATE } from "../../constants/ReadStateConstants";
import { useNavigate } from "react-router-dom";
import { setMessageReadStatus } from "../../utils/MessageUtils";

export const MessageItem = (props: MessageType) => {
  const navigate = useNavigate();
  const isRead: boolean = props.readState === READ_STATE;
  const icon = isRead ? readIcon : unreadIcon;
  const fontWeight = isRead ? "normal" : "bold";

  const redirect = () => {
    setMessageReadStatus(props.id);
    navigate(`/messages/message/${props.id}`);
  };

  return (
    <div className="box-shadow message-item" onClick={redirect}>
      <img src={icon} alt="envelope icon" />
      <p style={{ fontWeight: fontWeight }}>{props.messageBody}</p>
    </div>
  );
};

export default MessageItem;
