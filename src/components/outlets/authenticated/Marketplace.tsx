import { motion } from "framer-motion";
import NavigationBar from "../../navigation/Navbar";
import "../../../css/components/outlets/authenticated/Marketplace.css";
import metalMuncherBackground from "../../../assets/marketplace/mm-bg.png";
import bubbleBlabberBackground from "../../../assets/marketplace/bb-bg.png";
import GameOption from "../../marketplace/GameOption";

const gameOptions = [
  {
    gameTitle: "Bubble Blabber",
    gameBackgroundImage: bubbleBlabberBackground,
  },
  {
    gameTitle: "Metal Muncher",
    gameBackgroundImage: metalMuncherBackground,
  },
];

const Marketplace = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">Marketplace</h1>
        {gameOptions.map((option) => (
          <GameOption
            backgroundImage={option.gameBackgroundImage}
            gameTitle={option.gameTitle}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Marketplace;
