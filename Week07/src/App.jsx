import React, { useState } from "react";
import Toolbar from "./components/Toolbar";
import MapPage from "./components/MapPage";
import Chat from "./components/Chat";
import StoreCard from "./components/StoreCard";
import mockStore from "./data/mockStore";
import "./App.css";

const App = () => {
  const [selectedStore, setSelectedStore] = useState(null);

  const handleSearch = () => {
    setSelectedStore(mockStore);
  };

  const handleCloseStore = () => {
    setSelectedStore(null);
  };

  return (
    <div className="app">
      {/* Toolbar 永遠顯示 */}
      <Toolbar onSearchClick={handleSearch}/>

      {/* 地圖 */}
      <MapPage />

      {/* AI 聊天按鈕 */}
      <Chat />

      {/* 🔥 半透明背景（點擊關閉 StoreCard） */}
      {selectedStore && (
        <div className="overlay" onClick={handleCloseStore}></div>
      )}

      {/* 店家資訊卡片 */}
      {selectedStore && (
        <StoreCard store={selectedStore} onClose={handleCloseStore} />
      )}
    </div>
  );
};

export default App;


