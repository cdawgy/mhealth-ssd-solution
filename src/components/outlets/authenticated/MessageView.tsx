import { useParams } from "react-router-dom";

const MessageView = () => {
    let { messageId } = useParams();
  return (
    <div>
        <h1>Message view</h1>
        <p>{messageId}</p>
    </div>
  );
};

export default MessageView;
