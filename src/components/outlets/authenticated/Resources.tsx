import { useEffect, useState } from "react";
import { Resource } from "../../../types/Resource";
import { fetchAllResources } from "../../../utils/ResourceUtils";
import NavigationBar from "../../navigation/Navbar";
import ResourceItem from "../../resources/ResourceItem";

const Resources = () => {
  const emptyResourceList: Resource[] = [];
  const [resources, setResources] = useState(emptyResourceList);
  useEffect(() => {
    (async () => {
      const fetchedResources: Resource[] = await fetchAllResources();
      setResources(fetchedResources);
    })();
  });
  return (
    <div>
      <NavigationBar />
      <div className="guttering">
        <h1>Resources</h1>
        {resources.map((resource) => {
          return (
            <ResourceItem
              title={resource.title}
              topicList={resource.topicList}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Resources;
