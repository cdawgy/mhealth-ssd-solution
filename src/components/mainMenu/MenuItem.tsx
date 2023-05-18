import { MenuItemType } from "../../types/MenuItem";
import "../../css/components/mainMenu/MenuItem.css";
import { useNavigate } from "react-router-dom";

const MenuItem = (props: MenuItemType) => {
  const navigate = useNavigate();
  const altText = `${props.title} icon`;
  const redirectToMenuItem = () => {
    navigate(props.path);
  };
  return (
    <div onClick={redirectToMenuItem} className="menu-item box-shadow">
      <img src={props.imageUrl} alt={altText} />
      <h3 className="title-font font-tilt">{props.title}</h3>
    </div>
  );
};

export default MenuItem;
