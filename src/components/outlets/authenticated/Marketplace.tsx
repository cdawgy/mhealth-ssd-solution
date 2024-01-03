import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NavigationBar from "../../navigation/Navbar";
import GameOption from "../../marketplace/GameOption";
import mmBg from "../../../assets/metal-muncher.png";
import bbBg from "../../../assets/bubble-blabber.png";

const gameList = [
  {
    title: "Metal Muncher",
    bg: mmBg,
  },
  {
    title: "Bubble Blabber",
    bg: bbBg,
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
        <h1 className="font-blue">Marketplace</h1>
        {gameList.map((game) => (
          <GameOption title={game.title} bg={game.bg} />
        ))}
      </div>
    </motion.div>
  );
};

export default Marketplace;
