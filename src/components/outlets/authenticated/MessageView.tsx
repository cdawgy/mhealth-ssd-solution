import { useNavigate, useParams } from "react-router-dom";
import NavigationBar from "../../navigation/Navbar";
import { MessageType } from "../../../types/MessageType";
import { useEffect, useState } from "react";
import { fetchMessageById } from "../../../utils/MessageUtils";
import resourceIcon from "../../../assets/menuItemIcons/resources-icon.svg";

const MessageView = () => {
  let { messageId } = useParams();
  const emptyMessage: MessageType = {
    id: 0,
    parentId: 0,
    resourceId: 0,
    messageBody: "",
    readState: "",
  };
  const [message, setMessage] = useState(emptyMessage);

  let { resourceId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const renderSafeMessageId = messageId === undefined ? "0" : messageId;
      const fetchedMessage: MessageType = await fetchMessageById(
        renderSafeMessageId
      );
      setMessage(fetchedMessage);
    })();
  });

  const redirectToResource = () => {
    navigate(`/resources/resource/${message.resourceId}`);
  };

  return (
    <div>
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">Message view</h1>
        <h2>Message:</h2>
        <p>{message.messageBody}</p>
        <div onClick={redirectToResource} className="menu-item box-shadow">
          <img src={resourceIcon} alt="Resource Icon" />
          <h3 className="title-font font-tilt">Resource</h3>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
