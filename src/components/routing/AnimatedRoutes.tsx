import { Route, Routes, useLocation } from "react-router-dom";
import LoginScreen from "../outlets/LoginScreen";
import AppMainMenu from "../outlets/AppMainMenu";
import FailedLogin from "../outlets/FailedLogin";
import { AnimatePresence } from "framer-motion";
import CreateAccount from "../outlets/CreateAccount";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/">
          <Route index element={<LoginScreen />} />
          <Route path="appMainMenu" element={<AppMainMenu />} />
          <Route path="failed" element={<FailedLogin />} />
          <Route path="createAccount" element={<CreateAccount />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
