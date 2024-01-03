import GoogleLogin from "react-google-login";
import { localStorageStore } from "../../utils/LocalStorageUtils";
import {
  ACCOUNT_META_DATA,
  LOGGED_IN_TABLE_REFERENCE,
  LOGIN_TOKEN,
} from "../../constants/LocalStorageConstants";
import { useNavigate } from "react-router-dom";
import "../../css/components/routing/login.css";
import { determineLoginRedirect } from "../../utils/NavigationUtils";
import axios from "axios";
import { getBaseUrl } from "../../utils/BaseUrlUtils";

const clientId =
  process.env.REACT_APP_AUTH_CLIENT_ID !== undefined
    ? process.env.REACT_APP_AUTH_CLIENT_ID
    : "No ID found";

function Login() {
  const navigate = useNavigate();

  const onSuccess = async (res: any) => {
    console.log("Successful Login!");
    
    console.log("Storing data...");
    
    localStorageStore(LOGIN_TOKEN, res.tokenObj);
    localStorageStore(ACCOUNT_META_DATA, res.profileObj);
    console.log("Storing complete.");

    console.log("Retrieving Redirect Path...");
    const accountId: string = res.googleId;
    const redirectPath: string = await determineLoginRedirect(accountId);
    console.log(`Redirect Path: ${redirectPath}`);
    
    navigate(redirectPath);
  };

  const onFailure = (res: any) => {
    console.log(`LOGIN FAILED! res: ${JSON.stringify(res)}`);
  };

  return (
    <GoogleLogin
      className="googleLoginButton"
      clientId={clientId}
      buttonText="Login"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
      isSignedIn={true}
    />
  );
}

export default Login;
