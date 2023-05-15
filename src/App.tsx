import "./App.css";

import { useEffect } from "react";
import { gapi } from "gapi-script";
import { BrowserRouter } from "react-router-dom";
import AnimatedRoutes from "./components/routing/AnimatedRoutes";

function App() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.CLIENT_ID,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  });

  // var accessToken = gapi.auth.getToken().access_token;

  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;
