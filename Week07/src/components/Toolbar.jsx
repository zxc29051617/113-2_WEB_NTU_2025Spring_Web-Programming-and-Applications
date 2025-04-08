import React, { useState } from "react";

const Toolbar = ({ onSearchClick }) => {
  const [filters, setFilters] = useState({
    services: [],
    payments: [],
    facilities: [],
  });

  const handleSelect = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: [...new Set([...prev[type], value])],
    }));
  };

  const handleRemove = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((v) => v !== value),
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSearchClick();
    }
  };

  return (
    <div className="toolbar">
      <div className="search-box">
        <button className="search-btn" onClick={onSearchClick}>🔍</button>
        <input
          type="text"
          placeholder="尋找咖啡廳…"
          onKeyDown={handleKeyDown}
        />
      </div>

      {/* 篩選下拉選單 */}
      <div className="dropdown">
        <button>服務項目 ▾</button>
        <div className="dropdown-content">
          <a onClick={() => handleSelect("services", "外帶")}>外帶</a>
          <a onClick={() => handleSelect("services", "內用")}>內用</a>
        </div>
      </div>

      <div className="dropdown">
        <button>付款方式 ▾</button>
        <div className="dropdown-content">
          <a onClick={() => handleSelect("payments", "現金")}>現金</a>
          <a onClick={() => handleSelect("payments", "信用卡")}>信用卡</a>
          <a onClick={() => handleSelect("payments", "行動支付")}>行動支付</a>
        </div>
      </div>

      <div className="dropdown">
        <button>設施 ▾</button>
        <div className="dropdown-content">
          <a onClick={() => handleSelect("facilities", "Wi-Fi")}>Wi-Fi</a>
          <a onClick={() => handleSelect("facilities", "插座")}>插座</a>
          <a onClick={() => handleSelect("facilities", "洗手間")}>洗手間</a>
        </div>
      </div>

      {/* 清除 */}
      <button className="clear-button" onClick={() =>
        setFilters({ services: [], payments: [], facilities: [] })
      }>
        清除全部 ✕
      </button>

      {/* 選擇中的 tag 顯示 */}
      <div className="filter-tags">
        {Object.entries(filters).map(([type, values]) =>
          values.map((val) => (
            <span className="filter-tag" key={`${type}-${val}`}>
              {val}
              <button onClick={() => handleRemove(type, val)}>✕</button>
            </span>
          ))
        )}
      </div>
    </div>
  );
};

export default Toolbar;