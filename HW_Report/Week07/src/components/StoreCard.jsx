import React, { useState } from "react";
import "../App.css"; // 確保這裡有引入樣式

const StoreCard = ({ store, onClose }) => {
  const [activeTab, setActiveTab] = useState("info"); // "info" 或 "reviews"

  return (
    <div className="store-card">
      <button className="close-btn" onClick={onClose}>✕</button>

      {/* 商店資訊 */}
      <h2>{store.name}</h2>
      <p>📍 {store.address}</p>
      <p>🕒 {store.hours}</p>
      <p>📞 {store.phone}</p>

      {/* Tab 按鈕列 */}
      <div className="tab-buttons">
        <button
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          商家資訊
        </button>
        <button
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          心得評價
        </button>
      </div>

      {/* 根據選擇的 tab 顯示內容 */}
      {activeTab === "info" ? (
        <div className="store-info">
          <p><strong>服務項目：</strong> {store.services.join("、")}</p>
          <p><strong>付款方式：</strong> {store.payments.join("、")}</p>
          <p><strong>設施：</strong> {store.facilities.join("、")}</p>
        </div>
      ) : (
        <div className="review-cards">
          {/* Review 1 */}
          <div className="review-card">
            <img src="https://via.placeholder.com/100x100?text=店內照" alt="review1" />
            <div className="review-info">
              <p><strong>@TasteBitesTaipei</strong></p>
              <p>2025/03/20</p>
              <p>環境安靜非常適合工作～下次還會再來！</p>
            </div>
          </div>
          {/* Review 2 */}
          <div className="review-card">
            <img src="https://via.placeholder.com/100x100?text=拉花" alt="review2" />
            <div className="review-info">
              <p><strong>@CoffeeExplorer</strong></p>
              <p>2025/03/12</p>
              <p>拿鐵順口好喝，插座充足加分！</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreCard;



