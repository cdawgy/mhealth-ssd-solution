import "../../css/components/resources/TopicItem.css";
import { ResourceTopic } from "../../types/ResourceTopic";

const TopicItem = (props: ResourceTopic) => {
  return (
    <div>
      <h3 className="bold">{props.topicName}</h3>
      <p>{props.topicContent}</p>
    </div>
  );
};

export default TopicItem;
