import createResourceIcon from "../../../assets/create-resource-icon.png";
import { motion } from "framer-motion";
import NavigationBar from "../../navigation/Navbar";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { CreateAwardState } from "../../../types/CreateAwardState";
import { createAward } from "../../../utils/AwardUtils";
import SuccessNotification from "../../notifications/SuccessNotification";

class CreateAward extends React.Component<{}, CreateAwardState> {
  constructor(props: any) {
    super(props);
    this.state = {
      awardTitle: "",
      awardPoints: "",
      successNotificationDisplay: false,
    };

    this.setSuccessNotificationState =
      this.setSuccessNotificationState.bind(this);
  }

  handleTitleUpdate = (event: any) => {
    this.setState({
      awardTitle: event.target.value,
    });
  };

  handlePointsUpdate = (event: any) => {
    this.setState({
      awardPoints: event.target.value,
    });
  };

  handleFormSubmit = async () => {
    const responseStatus: number = await createAward(
      this.state.awardTitle,
      Number.parseInt(this.state.awardPoints)
    );
    if (responseStatus === 200) {
      this.setSuccessNotificationState(true);
    }
  };

  setSuccessNotificationState = (state: boolean): void => {
    this.setState({
      successNotificationDisplay: state,
    });
  };

  render() {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <NavigationBar />
        <div className="guttering">
          <h1 className="screen-title">New Award</h1>
          <Row>
            <Col xs={12}>
              <label htmlFor="attempts">Award Title</label>
              <input
                onChange={this.handleTitleUpdate}
                id="attempts"
                type="text"
                className="box-shadow"
              />
            </Col>

            <Col xs={12}>
              <label htmlFor="attempts">Points Needed</label>
              <input
                onChange={this.handlePointsUpdate}
                id="attempts"
                type="text"
                className="box-shadow"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="text-center mt-4">
              <div
                onClick={this.handleFormSubmit}
                className="create-resource box-shadow"
              >
                <p>
                  Create{" "}
                  <img src={createResourceIcon} alt="create resource icon" />
                </p>
              </div>
            </Col>
          </Row>
          <SuccessNotification
            show={this.state.successNotificationDisplay}
            parentShowHandler={this.setSuccessNotificationState}
          />
        </div>
      </motion.div>
    );
  }
}

export default CreateAward;
