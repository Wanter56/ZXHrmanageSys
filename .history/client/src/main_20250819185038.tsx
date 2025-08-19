// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StyleProvider } from "antd-style";

createRoot(document.getElementById("root")!).render(
  <StyleProvider>
    <App />
  </StyleProvider>
);
