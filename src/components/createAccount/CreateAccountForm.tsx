import React from "react";
import AccountSelect from "./AccountSelect";
import TherapistSelect from "./TherapistSelect";
import { Row, Col } from "react-bootstrap";
import { NewAccount } from "../../types/NewAccount";
import {
  createAccount,
  getAccountTableIdReference,
} from "../../utils/AccountUtils";
import { localStorageStore } from "../../utils/LocalStorageUtils";
import {
  ACCOUNT_TYPE,
  LOGGED_IN_TABLE_REFERENCE,
} from "../../constants/LocalStorageConstants";
import { Account } from "../../types/Account";

export default class CreateAccountForm extends React.Component<
  { redirect: any },
  NewAccount
> {
  constructor(props: any) {
    super(props);
    this.state = {
      accountType: "",
      childsName: "",
      selectedTherapist: "",
    };
    this.stateHandler = this.stateHandler.bind(this);
  }

  stateHandler = (obj: any) => {
    this.setState(obj);
  };

  handleChildsName = (event: any) => {
    this.setState({
      childsName: event.target.value,
    });
  };

  handleFormSubmit = async () => {
    const resp = await createAccount(this.state);
    const data: Account = resp.data;
    const accountTableReference = await getAccountTableIdReference(
      data.accountType,
      data.googleId
    );
    if (resp.status === 200) {
      localStorageStore(ACCOUNT_TYPE, this.state.accountType);
      localStorageStore(LOGGED_IN_TABLE_REFERENCE, accountTableReference);
      this.props.redirect();
    }
  };

  render(): React.ReactNode {
    const displayParentView: string =
      this.state.accountType === "parent" ? "block" : "none";
    return (
      <div>
        <label>Account Type</label>
        <AccountSelect parentFormStateHandler={this.stateHandler} />

        <div style={{ display: displayParentView }}>
          <label htmlFor="childs-name">Childs Name</label>
          <input
            onChange={this.handleChildsName}
            id="childs-name"
            type="text"
            className="box-shadow"
          />

          <p>Select your therapist from the list below.</p>

          <label>Therapist</label>
          <TherapistSelect parentFormStateHandler={this.stateHandler} />
        </div>

        <Row>
          <Col xs={12} className="text-center mt-4">
            <div
              onClick={this.handleFormSubmit}
              className="create-resource box-shadow"
            >
              <p>Create</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
