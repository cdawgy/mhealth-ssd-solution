import { motion } from "framer-motion";
import parentIcon from "../../../assets/parent-icons.png";
import childIcon from "../../../assets/child-icons.png";
import speechBubbles from "../../../assets/speech-bubbles.svg";
import "../../../css/components/outlets/authenticated/WhoIsIt.css";
import { useNavigate } from "react-router-dom";
import { localStorageStore } from "../../../utils/LocalStorageUtils";
import { ACCOUNT_TYPE } from "../../../constants/LocalStorageConstants";
import { Col, Row } from "react-bootstrap";

const WhoIsIt = () => {
  const navigate = useNavigate();

  const selectRole = (mouseClickEvent: any) => {
    const selectedRole: string = mouseClickEvent.target.id;
    localStorageStore(ACCOUNT_TYPE, selectedRole);
    navigate("/appMainMenu");
  };

  return (
    <motion.div
      className="screenWrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="guttering font-blue">Who is it?</h1>
      <Row>
        <Col xs={2}></Col>
        <Col xs={10}>
          <div
            onClick={selectRole}
            className="box-shadow userOptionContainer parentContainer"
            id="parent"
          >
            <img id="parent" src={parentIcon} alt="icons of parents" />
            <h2 id="parent" className="title-font">
              Parent
            </h2>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={10}>
          <div
            onClick={selectRole}
            className="box-shadow childContainer userOptionContainer"
            id="child"
          >
            <img id="child" src={childIcon} alt="icons of children" />
            <h2 id="child" className="title-font">
              Child
            </h2>
          </div>
        </Col>
        <Col xs={2}></Col>
      </Row>

      <img className="speechBubbles" src={speechBubbles} alt="speech bubbles" />
    </motion.div>
  );
};
export default WhoIsIt;
