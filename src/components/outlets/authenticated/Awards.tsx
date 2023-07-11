import { motion } from "framer-motion";
import NavigationBar from "../../navigation/Navbar";
import createResourceIcon from "../../../assets/create-resource-icon.png";
import AwardTable from "../../awards/AwardTable";
import { useNavigate } from "react-router-dom";
import { getChildPoints, isParent } from "../../../utils/AccountUtils";
import { useEffect, useState } from "react";

const Awards = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);

  const redirect = () => {
    navigate("/awards/newAward");
  };

  useEffect(() => {
    (async () => {
      const points = await getChildPoints();
      setPoints(points);
    })();
  }, []);

  const displayStyle = isParent() ? "inline-block" : "none";
  const pointsText = isParent()
    ? `Childs Points: ${points}`
    : `Current Points: ${points}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">Awards</h1>
        <div
          className="create-resource box-shadow mb-4"
          onClick={redirect}
          style={{ display: displayStyle }}
        >
          <p>
            New Award{" "}
            <img src={createResourceIcon} alt="create resource icon" />
          </p>
        </div>
        <p className="title-font" style={{ fontSize: 22 }}>
          {pointsText}
        </p>
        <AwardTable />
      </div>
    </motion.div>
  );
};

export default Awards;
