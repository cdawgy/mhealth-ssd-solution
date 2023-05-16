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

const AppMainMenu = () => {
  const navigation = useNavigate();

  const retrieveAccountTypeAndSaveInLocalMemory = async () => {
    const accountId: string = localStorageGet(ACCOUNT_ID);
    const resp: AxiosResponse = await axios.get(
      `http://localhost:8080/account/${accountId}/type`
    );
    localStorageStore(ACCOUNT_TYPE, resp.data);
  };

  useEffect(() => {
    (async () => {
      if (!isUserLoggedIn()) {
        navigation("/");
      }
      await retrieveAccountTypeAndSaveInLocalMemory();
      console.log(localStorageGet(ACCOUNT_TYPE));
      
    })();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Successful Login</h1>
      <Logout />
    </motion.div>
  );
};

export default AppMainMenu;
