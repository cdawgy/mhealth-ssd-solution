import { motion } from "framer-motion";
import NavigationBar from "../../navigation/Navbar";
import RichTextEditor from "../../resources/RichTextEditor";
import axios from "axios";
import { getBaseUrl } from "../../../utils/BaseUrlUtils";

const CreateResource = () => {
  const submitNewResource = async () => {
    const editorHtmlObject = document.getElementById("editor-input");
    const resourceHTMLContent = editorHtmlObject?.innerHTML;
    const resourceTitleInput: any = document.getElementById("title");

    const resource = {
      title: resourceTitleInput.value,
      content: resourceHTMLContent,
    };
    const resp = await axios.post(
      `${getBaseUrl()}/resources/resource/create`,
      resource,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    if (resp.status === 200) {
      alert("Resource Created!");
    } else {
      alert("Failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NavigationBar />
      <div className="guttering">
        <h1 className="screen-title">Create Resource</h1>
        <label htmlFor="title">Resource title:</label>
        <input id="title" type="text" className="box-shadow mb-4" />
        <label htmlFor="attempts">Resource content:</label>
        <RichTextEditor />
        <div onClick={submitNewResource} className="create-resource box-shadow">
          <p>Create Resource</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CreateResource;
