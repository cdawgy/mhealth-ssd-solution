import { motion } from "framer-motion";
import NavigationBar from "../../navigation/Navbar";
import MessageForm from "../../message/MessageForm";

const Message = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">Message</h1>
        <MessageForm />
      </div>
    </motion.div>
  );
};

export default Message;
