import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../utils/LoginValidationUtils";
import { useEffect } from "react";
import { motion } from "framer-motion";
import NavigationBar from "../navigation/Navbar";
import WelcomeMessage from "../mainMenu/WelcomeMessage";
import AccountTypeMenu from "../mainMenu/AccountTypeMenu";
import SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { Frame } from "stompjs";
import { getBaseUrl } from "../../utils/BaseUrlUtils";

const AppMainMenu = () => {
  const navigation = useNavigate();
  let stompClient: Stomp.Client | null = null;

  useEffect(() => {
    (async () => {
      if (!isUserLoggedIn()) {
        navigation("/");
      }
    })();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <WelcomeMessage />
        <AccountTypeMenu />
      </div>
    </motion.div>
  );
};

export default AppMainMenu;
