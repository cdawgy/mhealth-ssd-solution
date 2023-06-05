import { Route, Routes, useLocation } from "react-router-dom";
import LoginScreen from "../outlets/LoginScreen";
import AppMainMenu from "../outlets/AppMainMenu";
import FailedLogin from "../outlets/FailedLogin";
import { AnimatePresence } from "framer-motion";
import CreateAccount from "../outlets/CreateAccount";
import WhoIsIt from "../outlets/authenticated/WhoIsIt";
import NotFound from "../outlets/NotFound";
import Resources from "../outlets/authenticated/Resources";
import ResourceTemplate from "../outlets/authenticated/ResourceTemplate";
import SoundClips from "../outlets/authenticated/SoundClips";
import SoundClipTemplate from "../outlets/authenticated/SoundClipTemplate";
import Prescribe from "../outlets/authenticated/Prescribe";
import CreateResource from "../outlets/authenticated/CreateResource";
import Message from "../outlets/authenticated/Message";
import Awards from "../outlets/authenticated/Awards";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/">
          <Route index element={<LoginScreen />} />
          <Route path="*" element={<NotFound />} />
          <Route path="appMainMenu" element={<AppMainMenu />} />
          <Route path="failed" element={<FailedLogin />} />
          <Route path="createAccount" element={<CreateAccount />} />
          <Route path="whoIsIt" element={<WhoIsIt />} />
          <Route path="resources" element={<Resources />} />
          <Route path="resources/createResource" element={<CreateResource />} />
          <Route
            path="resources/resource/:resourceId"
            element={<ResourceTemplate />}
          />
          <Route path="soundClips" element={<SoundClips />} />
          <Route
            path="soundClips/clip/:soundClipId"
            element={<SoundClipTemplate />}
          />
          <Route path="prescribe" element={<Prescribe />} />
          <Route path="message" element={<Message />} />
          <Route path="awards" element={<Awards />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
