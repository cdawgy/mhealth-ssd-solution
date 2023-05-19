import { useParams } from "react-router-dom";
import NavigationBar from "../../navigation/Navbar";
import TopicItem from "../../resources/TopicItem";
import { useEffect, useState } from "react";
import { Resource } from "../../../types/Resource";
import { fetchResource } from "../../../utils/ResourceUtils";

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
    })();
  });

  return (
    <div>
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
    </div>
  );
};

export default ResourceTemplate;
