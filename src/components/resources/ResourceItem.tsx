import { Resource } from "../../types/Resource";
import rightTriangle from "../../assets/right-triangle.png";
import "../../css/components/resources/ResourceItem.css";

const ResourceItem = (props: Resource) => {
  return (
    <div className="resource-item-container box-shadow">
      <h3 className="bold">{props.title}</h3>
      <img src={rightTriangle} alt="right triangle" />
    </div>
  );
};

export default ResourceItem;
