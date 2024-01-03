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
import CreateAward from "../outlets/authenticated/CreateAward";
import Messages from "../outlets/authenticated/Messages";
import MessageView from "../outlets/authenticated/MessageView";
import GamePlay from "../outlets/authenticated/GamePlay";
import ValidatorScreen from "../outlets/ValidatorScreen";
import Game from "../outlets/authenticated/Game";
import Marketplace from "../outlets/authenticated/Marketplace";
import BubbleBlabberMenu from "../outlets/authenticated/BubbleBlabberMenu";
import BubbleBlabberGame from "../outlets/authenticated/BubbleBlabberGame";

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
          <Route path="messages" element={<Messages />} />
          <Route path="messages/message/:messageId" element={<MessageView />} />
          <Route path="awards" element={<Awards />} />
          <Route path="awards/newAward" element={<CreateAward />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="marketplace/metal-muncher" element={<Game />} />
          <Route path="marketplace/metal-muncher/play" element={<GamePlay />} />
          <Route path="marketplace/bubble-blabber" element={<BubbleBlabberMenu />} />
          <Route path="marketplace/bubble-blabber/game" element={<BubbleBlabberGame />} />
          <Route
            path="game/validator/:roomCode"
            element={<ValidatorScreen />}
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
