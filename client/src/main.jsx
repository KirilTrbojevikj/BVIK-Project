import React from "react";
import { ReactDOM } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";

import App from "./App";
import "./styles/globals.css";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Goerli;

const container = document.getElementById("root");
const root = createRoot(container);
root.render(

  <ThirdwebProvider desiredChainId={activeChainId}>
    <Router>
      <App />
    </Router>

  </ThirdwebProvider>

);
