import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import CreateAccountForm from "../createAccount/CreateAccountForm";
import wavingIcon from "../../assets/new-account-wave.png";

const CreateAccount = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate("/appMainMenu");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="guttering">
        <Row>
          <Col>
            <h1 className="font-blue">New User!</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>
              Hey there! We see this google account has not logged onto this
              application before.
            </p>
            <p>
              Please select if you are a parent creating an account for you and
              your child or a therapist.
            </p>
          </Col>
        </Row>
        <Row>
          <CreateAccountForm redirect={redirect} />
        </Row>
        <Row>
          <Col>
            <img
              src={wavingIcon}
              alt="two hands waving with a speech bubble saying hi."
            />
          </Col>
        </Row>
      </div>
    </motion.div>
  );
};

export default CreateAccount;
