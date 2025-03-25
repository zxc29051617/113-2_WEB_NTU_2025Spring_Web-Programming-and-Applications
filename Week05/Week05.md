# Week05 Homework Report

>因為本次作業是為期中期末專案做準備，因此主題相較於第一次有大更動，由本來的 **「教學輔助機器人 EduAssist」** 改為 **「咖啡廳地圖 CoffeeSeeker」** ，旨在延伸 google map 的查詢功能。在原本單純的字串檢索搜尋中加入聊天機器人輔助使用者尋找咖啡店，以及在事前建立好資料庫供 AI 參考，讓使用者可以在台大附近找到最符合需求的咖啡店 (目前資料庫包含了台大方圓6公里內的所有咖啡廳資訊) 。 地圖外觀顯示方面串接 **google map API** ；聊天機器人則預計使用如 **Week03** 作業中用到之 **Gemini API** 與自己設計的 prompt 做為基底；資料庫則以爬蟲地毯式搜集台大周圍所有的咖啡廳(此"周圍"目前為方圓6公里內)，未來預計應用 **RAG** 技術加強聊天機器人對於資料庫的有效運用。  
本週除了應用之前的 **HTML** 及 **CSS** ， 這次新教的 **JavaScript** 及 **React** 相關功能也同樣用於作業中。目前進度中已完成 **google map** 外觀環境建置，選項框及聊天對話框建置，還有用爬蟲建立好的多個資料庫。未來預計會進一步地加入 **Week03** 中應用過的聊天機器人、  **RAG** 配合新資料庫架構、以及其他以後上課對應的技術。

- 使用設置：
    1. Clone the repository to your local machine (you suppose to complete this step already) :
        ```sh
        git clone https://github.com/yuting1008/Team25.git
        ```
    2. Install the required dependencies using **npm** :
        ```sh
        cd CoffeeSeeker
        npm install
        ```
    3. Create a .env file in the CoffeeSeeker directory (CoffeeSeeker/.env) and add your Google Maps API credentials :
        ```js
        VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
        ```
    4. Once the dependencies are installed, run the development server :
        ```sh
        npm run dev
        ```
        This will start the application on a local server **http://localhost:XXXX** . Open this URL in your browser to see the app in action.

- p.s. On applying for a Google Maps API key, please refer to the [document](https://developers.google.com/maps/documentation/javascript?hl=zh-tw) . While google requires entering payment information, this project will not actually use any paid features, so you can apply with confidence. If unable to apply for an API key or encounter difficulties, please contact us. We can provide a temporary API key valid for 24 hours specifically for testing and grading assignments.

## 上課主題練習
- HTML：建構網頁框架與初始介面、定義變數初始值、引用其他檔案與線上函式庫等，如 **google map api** ，後續架構大部分被改為 **React**。
- CSS：調整外觀屬性設定、編排各物件與區塊位置等，後續架構大部分被改為 **React**。  
- JavaScript：動態隱藏與生成 **HTML** 的部分介面。另外應用如 **API** 與線上函式庫等延伸功能。這部份我們在 **Week03** 已大量使用，而本次有許多改為 **React** 。


## 額外程式技術
- Figma：網頁 UI design ，設計出實作時對照的外觀原型，同時也運用了 google map 的內容顯示。
- google map API：取得建立 google map 的本地客戶端權限，用於引用與提取 google map 的各種資訊，如顯示外觀及店家等。
- 網路爬蟲：運用 python 蒐集 **google map** 資料。因每次僅能蒐集 20 筆資料，透過自動化經緯度更改來快速搜集台大周圍所有的咖啡店。目前資料庫涵蓋方圓 6 公里內的咖啡店資訊。資料庫已建立完成，但目前程式碼內尚未應用到(會在引入 **Gemini** 時使用)。若想參考可見其目前存放的[雲端連結](https://drive.google.com/file/d/1WRYNLCaobRW4uWtIg-9VN0zcIQXB7t7w/view?usp=sharing)。


## 組員分工情況
>本組為第 **25** 組
- 陳郁婷 34% ： **Figma** UI design 、將已完成之外觀整理成用 **React** 來建構
- 江融其 18% ： 撰寫 Report 、爬蟲撰寫與建立資料庫、專案 debug 與審核
- 王獻霆 19% ： **HTML+CSS** 外觀建構、外觀 **google map API** 串接
- 劉高甸 19% ： **HTML+CSS** 外觀建構、外觀 **google map API** 串接

