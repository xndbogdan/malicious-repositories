import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { MainProvider } from "./Context/MainContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <MainProvider>
    <StrictMode>
      <ToastContainer position="bottom-right" />
      <App />
    </StrictMode>
  </MainProvider>
);
