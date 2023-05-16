import GoogleLogin from "react-google-login";
import { localStorageStore } from "../../utils/LocalStorageUtils";
import { ACCOUNT_ID, LOGIN_TOKEN } from "../../constants/LocalStorageConstants";
import { useNavigate } from "react-router-dom";
import "../../css/components/routing/login.css";
import axios from "axios";
import { isActiveAccount } from "../../utils/LoginValidationUtils";

const clientId =
  process.env.REACT_APP_AUTH_CLIENT_ID !== undefined
    ? process.env.REACT_APP_AUTH_CLIENT_ID
    : "No ID found";

function Login() {
  const navigate = useNavigate();

  const onSuccess = async (res: any) => {
    localStorageStore(LOGIN_TOKEN, res.tokenObj);
    const redirectPath = await detectIfNewAccount(res.googleId);
    console.log(redirectPath);
    navigate(redirectPath);
  };

  const detectIfNewAccount = async (googleId: string) => {
    const resp = await axios.get(
      `http://localhost:8080/account/active/${googleId}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    localStorageStore(ACCOUNT_ID, googleId);
    const accountLevel: boolean = resp.data;
    return accountLevel ? "/appMainMenu" : "/createAccount";
  };

  const onFailure = (res: any) => {
    console.log(`LOGIN FAILED! res: ${res}`);
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
