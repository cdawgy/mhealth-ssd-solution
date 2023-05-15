import GoogleLogin from "react-google-login";
import { localStorageStore } from "../../utils/LocalStorageUtils";
import { LOGIN_TOKEN } from "../../constants/LocalStorageConstants";
import { useNavigate } from "react-router-dom";
import "../../css/components/routing/login.css";

const clientId =
  process.env.CLIENT_ID != undefined ? process.env.CLIENT_ID : "No ID found";

function Login() {
  const navigate = useNavigate();

  const onSuccess = (res: any) => {
    localStorageStore(LOGIN_TOKEN, res.tokenObj);
    navigate("/success");
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
