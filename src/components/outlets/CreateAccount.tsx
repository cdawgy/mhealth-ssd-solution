import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { localStorageStore } from "../../utils/LocalStorageUtils";
import { ACCOUNT_TYPE } from "../../constants/LocalStorageConstants";

const CreateAccount = () => {
  const navigate = useNavigate();

  const setAccountAccessLevel = (clickEventObject: any) => {
    // const userSelectedOption: string = clickEventObject.target.innerHTML;
    // TODO: Here I will need to persist new record containing
    // the users google ID along with their selected choice.
    localStorageStore(ACCOUNT_TYPE, clickEventObject.target.innerHTML);
    navigate("/appMainMenu");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>New User!</h1>
      <p>
        Hey there! We see this google account has not logged onto this
        application before. Please select if you are a parent creating an
        account for you and your child or a therapist.
      </p>
      <p>
        Both set active account to therapist and redirect to main app menu for
        now.
      </p>
      <button onClick={setAccountAccessLevel}>Parent</button>
      <button onClick={setAccountAccessLevel}>Therapist</button>
    </motion.div>
  );
};

export default CreateAccount;
