import { motion } from "framer-motion";
import NavigationBar from "../../navigation/Navbar";
import RichTextEditor from "../../resources/RichTextEditor";

const CreateResource = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">Create Resource</h1>
        <RichTextEditor />
      </div>
    </motion.div>
  );
};

export default CreateResource;
