import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";

const clientId =
  process.env.REACT_APP_AUTH_CLIENT_ID !== undefined ? process.env.REACT_APP_AUTH_CLIENT_ID : "No ID found";

function Logout() {
  const navigate = useNavigate();
  
  const onSuccess = () => {
    navigate("/");
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={clientId}
        buttonText={"Logout"}
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}
export default Logout;
