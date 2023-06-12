import { motion } from "framer-motion";
import NavigationBar from "../../navigation/Navbar";
import createResourceIcon from "../../../assets/create-resource-icon.png";
import AwardTable from "../../awards/AwardTable";
import { useNavigate } from "react-router-dom";

const Awards = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/awards/newAward");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">Awards</h1>
        <div className="create-resource box-shadow mb-4" onClick={redirect}>
          <p>
            New Award{" "}
            <img src={createResourceIcon} alt="create resource icon" />
          </p>
        </div>
        <AwardTable />
      </div>
    </motion.div>
  );
};

export default Awards;
