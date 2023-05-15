import React from "react";
import { localStorageGet } from "../../utils/LocalStorageUtils";
import { LOGIN_TOKEN } from "../../constants/LocalStorageConstants";
import { GoogleAuthToken } from "../../types/GoogleAuthToken";
import { isTokenExpired } from "../../utils/AuthTokenUtils";

class LoginValidation extends React.Component {
  constructor(props: any) {
    super(props);
    this.isLoggedIn();
  }

  isLoggedIn = () => {
    const tokenObject: GoogleAuthToken = localStorageGet(LOGIN_TOKEN);
    if (tokenObject === undefined) {
      console.log("not logged in");
      return;
    }

    if (isTokenExpired(tokenObject.expires_at)) {
      console.log("expired");
      return;
    }
  };
}

export default LoginValidation;
