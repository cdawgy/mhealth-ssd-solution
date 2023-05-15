import { useNavigate } from "react-router-dom";
import Logout from "../../components/routing/logout";
import { isUserLoggedIn } from "../../utils/LoginValidationUtils";
import { useEffect } from "react";
import { motion } from "framer-motion";

const SuccessfullLogin = () => {
  const navigation = useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigation("/");
    }
  });

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <h1>Successful Login</h1>
      <Logout />
    </motion.div>
  );
};

export default SuccessfullLogin;
