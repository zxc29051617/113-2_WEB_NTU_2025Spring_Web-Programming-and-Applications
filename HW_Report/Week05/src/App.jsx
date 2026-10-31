import React from "react";
import Toolbar from "./components/Toolbar";
import MapPage from "./components/MapPage";
import Chat from "./components/Chat";
import "./App.css";

const App = () => {
  return (
    <div className="app">
      <Toolbar />
      <MapPage />
      <Chat />
    </div>
  );
};

export default App;

