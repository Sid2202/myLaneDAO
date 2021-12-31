import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { ThirdwebWeb3Provider } from '@3rdweb/hooks';

const supportChainIds = [4]; //rinkeby testnet id = 4
const connectors = {
  injected:{}, //metamask wallet is of injected type
}

// Render the App component to the DOM
ReactDOM.render(
  <React.StrictMode>
    <ThirdwebWeb3Provider 
      connectors={connectors}
      supportChainIds={supportChainIds}>
      <App />
    </ThirdwebWeb3Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
