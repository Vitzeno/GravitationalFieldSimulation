import React from "react";
import ReactDOM from "react-dom";
import { CreateCanvas } from "./canvas";

ReactDOM.render(
  <React.StrictMode>
    <CreateCanvas name="WebGL" />
  </React.StrictMode>,
  document.getElementById("root")
);
