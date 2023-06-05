import { useParams } from "react-router-dom";
import NavigationBar from "../../navigation/Navbar";
import TopicItem from "../../resources/TopicItem";
import { useEffect, useState } from "react";
import { Resource } from "../../../types/Resource";
import { fetchResource } from "../../../utils/ResourceUtils";
import { motion } from "framer-motion";

const ResourceTemplate = () => {
  const emptyResouce: Resource = {
    id: 0,
    title: "",
    topicList: [],
  };
  const [resource, setResource] = useState(emptyResouce);
  let { resourceId } = useParams();
  useEffect(() => {
    (async () => {
      const renderSafeResourceId = resourceId === undefined ? "0" : resourceId;
      const fetchedResource: Resource = await fetchResource(
        parseInt(renderSafeResourceId)
      );
      setResource(fetchedResource);
      console.log(fetchedResource);
      
    })();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">{resource.title}</h1>
        {resource.topicList.map((topic) => {
          return (
            <TopicItem
              topicName={topic.topicName}
              topicContent={topic.topicContent}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default ResourceTemplate;
