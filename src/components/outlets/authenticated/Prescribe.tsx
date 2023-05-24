import { motion } from "framer-motion";
import NavigationBar from "../../navigation/Navbar";
import PrescribeForm from "../../prescribe/PrescribeForm";

const Prescribe = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">Prescribe</h1>
        <PrescribeForm />
      </div>
    </motion.div>
  );
};

export default Prescribe;
