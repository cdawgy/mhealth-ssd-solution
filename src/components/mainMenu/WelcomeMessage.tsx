import {
  ACCOUNT_META_DATA,
  ACCOUNT_TYPE,
} from "../../constants/LocalStorageConstants";
import "../../css/components/mainMenu/WelcomeMessage.css";
import { AccountMetaData } from "../../types/AccountMetaData";
import { localStorageGet } from "../../utils/LocalStorageUtils";

const WelcomeMessage = () => {
  const accountMetaData: AccountMetaData = localStorageGet(ACCOUNT_META_DATA);
  const accountType: string = localStorageGet(ACCOUNT_TYPE);
  const welcomeMessage =
    accountType === "child"
      ? `Hi there, ${accountMetaData.givenName}!`
      : `Welcome, ${accountMetaData.givenName}`;
  return (
    <div className="welcome-message-container">
      <h2 className="title-font">{welcomeMessage}</h2>
    </div>
  );
};

export default WelcomeMessage;
