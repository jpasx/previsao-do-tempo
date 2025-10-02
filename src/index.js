import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <div className="watermark">
      Desenvolvido por <b>jp_asx</b> —{" "}
      <a href="https://github.com/jp-asx" target="_blank" rel="noreferrer">
        github.com/jp-asx
      </a>
    </div>
  </React.StrictMode>
);
