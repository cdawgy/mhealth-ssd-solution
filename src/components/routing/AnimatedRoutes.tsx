import { Route, Routes, useLocation } from "react-router-dom";
import LoginScreen from "../outlets/LoginScreen";
import SuccessfullLogin from "../outlets/SuccessfulLogin";
import FailedLogin from "../outlets/FailedLogin";
import { AnimatePresence } from "framer-motion";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/">
          <Route index element={<LoginScreen />} />
          <Route path="success" element={<SuccessfullLogin />} />
          <Route path="failed" element={<FailedLogin />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
