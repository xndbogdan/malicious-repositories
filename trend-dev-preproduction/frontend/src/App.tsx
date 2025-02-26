import React from "react";
import "./assets/scss/style.scss";
import MainPage from "./modules/main/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Providers } from "./store/provider";

function App() {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
}

export default App;
