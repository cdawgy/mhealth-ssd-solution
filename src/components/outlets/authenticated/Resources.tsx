import { useEffect, useState } from "react";
import { Resource } from "../../../types/Resource";
import { fetchAllResources } from "../../../utils/ResourceUtils";
import NavigationBar from "../../navigation/Navbar";
import ResourceItem from "../../resources/ResourceItem";
import { motion } from "framer-motion";
import CreateResourceButton from "../../resources/CreateResourceButton";

const Resources = () => {
  const emptyResourceList: Resource[] = [];
  const [resources, setResources] = useState(emptyResourceList);

  useEffect(() => {
    (async () => {
      const fetchedResources: Resource[] = await fetchAllResources();
      setResources(fetchedResources);
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
        <h1 className="screen-title">Resources</h1>
        <CreateResourceButton />
        {resources.map((resource) => {
          return (
            <ResourceItem
              id={resource.id}
              title={resource.title}
              content={resource.content}
            />
          );
        })}
      </div>
    </motion.div>
  );
};

export default Resources;
