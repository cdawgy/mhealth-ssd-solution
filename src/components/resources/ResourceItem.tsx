import { Resource } from "../../types/Resource";
import rightTriangle from "../../assets/right-triangle.png";
import "../../css/components/resources/ResourceItem.css";
import { useNavigate } from "react-router-dom";

const ResourceItem = (props: Resource) => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/resources/resource/${props.id}`);
  };
  return (
    <div onClick={redirect} className="resource-item-container box-shadow">
      <h3 className="bold">{props.title}</h3>
      <img src={rightTriangle} alt="right triangle" />
    </div>
  );
};

export default ResourceItem;
