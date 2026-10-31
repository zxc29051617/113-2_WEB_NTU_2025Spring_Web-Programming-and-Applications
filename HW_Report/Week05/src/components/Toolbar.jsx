import React from "react";
import Dropdown from "./Dropdown";

const Toolbar = () => {
  return (
    <div className="toolbar">
      {/* Search Box */}
      <div className="search-box">
        <span className="icon">🔍</span>
        <input type="text" placeholder="尋找咖啡廳…" />
      </div>

      {/* Filters */}
      <Dropdown title="服務項目">
        <a href="#">外帶</a>
        <a href="#">內用</a>
      </Dropdown>

      <Dropdown title="付款方式">
        <a href="#">現金</a>
        <a href="#">信用卡</a>
        <a href="#">行動支付</a>
      </Dropdown>

      <Dropdown title="設施">
        <a href="#">Wi-Fi</a>
        <a href="#">插座</a>
        <a href="#">洗手間</a>
      </Dropdown>

      {/* Clear All Button */}
      <button className="clear-button">清除全部 ✕</button>
    </div>
  );
};

export default Toolbar;