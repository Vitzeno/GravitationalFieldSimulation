import React from "react";
import ReactDOM from "react-dom";
import { RenderScene } from "./renderer";

ReactDOM.render(
  <React.StrictMode>
    <RenderScene name="WebGL" />
  </React.StrictMode>,
  document.getElementById("root")
);
