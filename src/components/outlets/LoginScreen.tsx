import Login from "../routing/login";
import logoAccents from "../../assets/logo-accents.svg";
import curveLeft from "../../assets/curve-left.svg";
import curveRight from "../../assets/curve-right.svg";
import "../../css/GlobalStyles.css";
import "../../css/components/outlets/LoginScreen.css";
import { motion } from "framer-motion";

const LoginScreen = () => {
  return (
    <motion.div
      className="screenWrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="colouredBackground">
        <h1 id="appTitle" className="font-white">
          <img alt="logo accents" src={logoAccents} />
          Fluency
        </h1>
      </div>
      <div className="loginOptions">
        <img alt="leftCurve" className="curve left" src={curveLeft} />
        <img alt="rightCurve" className="curve right" src={curveRight} />
        <Login />
      </div>
    </motion.div>
  );
};

export default LoginScreen;
