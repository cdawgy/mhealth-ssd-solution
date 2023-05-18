import "./App.css";

import { useEffect } from "react";
import { gapi } from "gapi-script";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/routing/AnimatedRoutes";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  // var accessToken = gapi.auth.getToken().access_token;

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous"
      />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
