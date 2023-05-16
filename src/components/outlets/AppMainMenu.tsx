import { useNavigate } from "react-router-dom";
import Logout from "../routing/logout";
import { isUserLoggedIn } from "../../utils/LoginValidationUtils";
import { useEffect } from "react";
import { motion } from "framer-motion";
import axios, { AxiosResponse } from "axios";
import {
  localStorageGet,
  localStorageStore,
} from "../../utils/LocalStorageUtils";
import {
  ACCOUNT_ID,
  ACCOUNT_TYPE,
} from "../../constants/LocalStorageConstants";
import NavigationBar from "../navigation/Navbar";

const AppMainMenu = () => {
  const navigation = useNavigate();

  useEffect(() => {
    (async () => {
      if (!isUserLoggedIn()) {
        navigation("/");
      }
    })();
  });

  const accountType: string = localStorageGet(ACCOUNT_TYPE);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <h1>Successful Login</h1>
      <p>Account Type: {accountType}</p>
      <Logout />
    </motion.div>
  );
};

export default AppMainMenu;
