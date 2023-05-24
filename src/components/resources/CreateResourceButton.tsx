import createResourceIcon from "../../assets/create-resource-icon.png";
import { isTherapist } from "../../utils/AccountUtils";
import "../../css/components/resources/CreateResourceButton.css";
import { useNavigate } from "react-router-dom";

const CreateResourceButton = () => {
  const navigate = useNavigate();

  const routeToCreateResource = () => {
    navigate("/resources/createResource");
  };

  return isTherapist() ? (
    <div className="create-resource box-shadow" onClick={routeToCreateResource}>
      <p>
        Create Resource{" "}
        <img src={createResourceIcon} alt="create resource icon" />
      </p>
    </div>
  ) : null;
};

export default CreateResourceButton;
