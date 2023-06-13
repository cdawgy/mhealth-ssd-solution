import { motion } from "framer-motion";
import NavigationBar from "../../navigation/Navbar";
import { useEffect, useState } from "react";
import { MessageType } from "../../../types/MessageType";
import { getAllMessagesForUser } from "../../../utils/MessageUtils";
import MessageItem from "../../message/MessageItem";

const Messages = () => {
  const emptyMessageList: MessageType[] = [];
  const [messages, setMessages] = useState(emptyMessageList);

  useEffect(() => {
    (async () => {
      const fetchedMessages: MessageType[] = await getAllMessagesForUser();
      setMessages(fetchedMessages);
    })();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">Messages</h1>
        <div className="messages">
          {messages.map((message) => (
            <MessageItem
              id={message.id}
              parentId={message.parentId}
              resourceId={message.resourceId}
              messageBody={message.messageBody}
              readState={message.readState}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Messages;
