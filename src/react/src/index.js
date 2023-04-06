import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { GoogleOAuthProvider } from '@react-oauth/google';


//this page is just for Rendering on root DOM node

ReactDOM.render(
  <GoogleOAuthProvider clientId="47499720618-cbfuh7l25tcobp3ch7vfeo81hhvhf6r6.apps.googleusercontent.com"><App /></GoogleOAuthProvider>,
  document.getElementById("root")
);

serviceWorker.register();
