import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ArticleContextProvider } from "./context/ArticleContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ArticleContextProvider>
        <App />
      </ArticleContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
