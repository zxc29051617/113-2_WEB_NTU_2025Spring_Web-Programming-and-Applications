# Week03 Homework Report

>本週應用了課程大綱進度中的 **HTML** , **CSS** 以及 **JavaScript** 語言( **JavaScript** 來不及上到但第一堂課的大綱有)，結合一些較後面才會上到的主題與一些課外延伸知識，建構出一個網頁版的 **「教學輔助AI聊天機器人」** ，旨在輔助教學者進行出題、批改、課程內容設計等工作，目前能支援5種科目與4種教學相關輔助功能。 AI 方面串接 **Gemini API**，實測 **Gemini-1.5-flash** 以上版本皆能在任務中有很好的表現。  

- 使用設置：需先在  **./assets/js** 資料夾下新增檔案 **config.js**，並在其中附上 **Gemini API key**。完成 **API** 設定後便能透過瀏覽器打開 **./index.html** 以啟用教學輔助聊天機器人。<br><br>**config.js** 的 **Gemini API key**設定格式如下：<br>
    ```js
    const CONFIG = {
        GEMINI_API_KEY: "YOUR_GEMINI_API_KEY"
    }
    ```

## 上課主題練習
- HTML：建構網頁框架與初始介面、定義變數初始值、引用其他檔案與線上函式庫等。
- CSS：調整外觀屬性設定、編排各物件與區塊位置等。  

~~上課進度來不及講到但課程大綱有QQ所以有先預習實作的內容：~~
- JavaScript：動態隱藏與生成 **HTML** 的部分介面。另外應用如 **Gemini API** 與線上函式庫等延伸功能


## 額外程式技術
- Figma：網頁 UI design ，設計出實作時對照的外觀原型。
- Gemini API：收發與 **Gemini** 的對話，並為各功能設計相應的 prompt 。
- Marked.js：low-level markdown compiler ，實作中在在網頁引用線上版 [url](https://cdn.jsdelivr.net/npm/marked/marked.min.js) 。


## 組員分工情況
>本組為第 **25** 組
- 陳郁婷 40% ： 統籌小組、 **Github** 規則訂定、**Figma** UI design 、整理檔案目錄配置、 **JavaScript** 部分內容(串接部分 **API**、設定動態生成與隱藏 **HTML** 介面)
- 江融其 24% ： 撰寫 Report 、 **HTML+JavaScript**  debug 、 **JavaScript** 部分內容(串接部分 **API**、所有 **prompt** 設計、**Markdown** 輸出入)
- 王獻霆 18% ： **HTML+CSS** 部分內容(網頁初始頁面外觀與介面實作、科目相關介面設計)
- 劉高甸 18% ： **HTML+CSS** 部分內容(網頁第二頁外觀與介面實作、聊天介面實作、在 **HTML** 端串接 **Gemini**)

