import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import { RoomContextProvider } from "./context/RoomContext";
import { MessagesContextProvider } from "./context/MessagesContext";
import { TopicContextProvider } from "./context/TopicContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <MessagesContextProvider>
        <RoomContextProvider>
          <TopicContextProvider>
            <App />
          </TopicContextProvider>
        </RoomContextProvider>
      </MessagesContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
