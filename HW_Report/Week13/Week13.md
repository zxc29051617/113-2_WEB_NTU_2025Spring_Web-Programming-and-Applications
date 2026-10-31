# Week13 Homework Report

>本次作業同樣是為期中期末專案做準備，主題為 **「咖啡廳地圖 CoffeeSeeker」** ，旨在將聊天機器人、數據整合與地圖搜尋作結合與延伸，目標型態的介紹之前提過很多次，便不再贅述。  
>- 前端的部分在經過上次更動架構成以 **Next.js** 部署後，目前 **TypeScript** 已經完全取代 **JavaScript** ，配合 **Shadcn UI** 、 **TailwindCSS** 設計外觀功能，登入使用 **Google** 帳號、聊天視窗串接 **Gemini** 。本次新增了新功能 **Favorites** 、**Store Dialog** 及 **Search bar** ，即為實作篩選功能以顯示在地圖上符合條件的咖啡廳、以及資訊小卡和咖啡廳收藏名單功能。目前只使用了三個範例資料做為測試。(要等之後的 **RAG** 接上 **Gemini** 再一起接後端資料庫)
>- 後端則繼續架設 **django** ，此次透過 **djangorestframework** 重新架構整個後端，並且測試上課內容 **pythonanywhere** 雲端運作的可行性(雖然基本和 **docker** 跑法一樣)，以便以後直接架上雲端。資料庫上次已經建立完成， **API** 已經寫好，未來剩下將資料庫連接模型參照功能 **RAG** 並透過寫好的 **core_api** 串接上前端。

## 專案管理調整(Re)
**Week07** 以前我們曾使用一個 **[repository](https://github.com/yuting1008/Team25)** 管理所有程式碼及文件，其中包含了四個不同的專案資料夾：  
- **CoffeeSeeker-archived**
- **CoffeeSeeker**
- **EduAssist**
- **HW_Report**

然而，為了更清楚地區分各專案的 **commit history** 和 **issue**，我們以 **git filter-repo** 套件將這些專案拆分為四個獨立的 **Repo**，並且保留過去的 **commit history** ，最後統一放置於一個 **[GitHub organization](https://github.com/NTU-Team-25)** 底下管理，請助教批閱時留意，細部流程 **commit** 在 **CoffeeSeeker Repo** ，而非本 **Repo** 。

上週作業繳交時我們意外放錯資料夾 (作業的 **HW_Report** 被放到 **CoffeeSeeker Repo** ，但還是有完整的作業md檔案及程式碼) ，本次有正確將作業放進 **HW_Report Repo** 中，助教可以根據 **commit** 內容細看。有問題歡迎詢問。


## 使用設置

0. **Github** 中有前後端的設計內容，若想實際查看部分較大的檔案(像資料庫)則在 **docker image** 中。本作業將前後端整合於單一 **docker image** 中，請確保本機能容下約 **4GB** 的 **image** 和 **container** ，並確任 **port 8888** 沒有同時被其他專案占用，否則可能須更改下步驟的 **port** 參數。
1. 首先確保 **docker login** 成功，接著便執行下指令下載映像檔
    ```sh
        docker pull rickychiang2003/coffeeseeker_ubuntu2204:1.0
    ```
2. 下載完後開啟 **container** 。注意預設指令中指定本機 **port 8888** 與開啟 **container** 的 **port 3000** 相接，若本機  **port 8888** 已被占用，則將後續所有 **8888** 改成一固定的空閒 **port** 值
    ```sh
        docker run -it -p 8888:3000 rickychiang2003/coffeeseeker_ubuntu2204:1.0
    ```
3. 若成功開啟則可以移動至根目錄並 **ls** 。其中目錄 **2025web** 為後端內容、 **frontend** 為前端內容。
    ```sh
       cd /
       ls -l
    ```
4. 先測試前端外觀設計。本次新增功能使用的資料有三個範例資料點 (後端要等之後的 **RAG** 接上 **Gemini** 再一起接上資料庫) ，可依下列說明查看。那麼，請直接執行已建立好的服務指令後於本機的瀏覽器上開啟 **localhost:8888** 。 
    ```sh
        cd /frontend
        npm run dev
    ```  
    會須等待十秒左右。本次新增的功能為如下：
    - GoogleMap 地圖縮小後會發現信義區附近有三個範例資料點的 **Marker** ，此為自製 **Maps maker** 自動標記的
    - 右上角的明暗主題
    - 右下角的 **AI** 聊天窗口，可以往下滑進去聊天試試(但尚未接上 **RAG** )
    - **favorites**：使用者在地圖上可以收藏咖啡廳，並且到 **favorite** 頁面瀏覽店家收藏清單
    - **store-dialog**：使用者在地圖上點擊 **Marker** 後會跳出店家資訊卡，或是在 **favorite** 頁面點擊咖啡廳名稱也會跳出店家資訊卡
    - **search bar and filter**：根據咖啡廳名稱輸入與咖啡廳資訊 **(dropdown list)** 篩選咖啡廳

        若有遺漏或部分空白，建議您開啟無痕、檢查電腦定位資訊或是 **等它一下** ，因為 GoogleMap API 時常因當下定位問題導致卡頓或是沒顯示出來。

5. 接著測試後端管理系統，執行服務後便能於本機瀏覽器上開啟 **localhost:8888/admin** ，其中已設定了完善的帳號管理與搜索機制。目前唯一的系統管理帳號為 **Team25** ，密碼為 **25252525** ，可以登入以查看本次完成設定的功能，也可以嘗試註冊與搜索帳號。資料庫的內容也已在其中，可以透過 **MAP_APP** 選項查看資料庫內容。若此時查看 **localhost:8888** 則可以看到關於上次 **Week11** 的外觀實作測試被刪除，取而代之的是可以看到 **api** 的設定資料夾路徑，其被定義於 **/2025web/myweb/urls.py** 中(當然其他api相關設定也有設完)。
    ```sh
        cd /2025web
        python3 manage.py runserver 0.0.0.0:3000
    ```
6. 若步驟 4. 與 5. 的內容與報告不同或出現問題，請來信詢問或確認其他相關設定是否一致，或稍微看 **code** 確認。


## 上課主題練習
- 前端基礎程式語法：每次都會出現的老朋友，不再贅述。
- **Django**：為本次主要上課內容。上課內容應用主要是在 **API** 串接、 **pythonanywhere** 測試，本次也以 **restframework** 全部重新架設。第三方登入驗證則是直接用 **Google account** 。
- **Docker**：每次都會出現的老朋友，打包用。


## 額外程式技術
- **Figma, Google API**：每次都會出現的老朋友們，用於建構前端功能，如 **UI design** 與 **Google Map** 、 **Google** 帳號連線工具等。
- **Next.js, TypeScript, Shadcn UI, TailwindCSS**：取代以前上課教的前端原本的套件，上次也已全部介紹過，目的為更好看及更方便的前端開發。

## 組員分工情況
>本組為第 **25** 組
- 陳郁婷 45% ： 專案整合、前端功能更新( **Favorites** 加入收藏名單 **layout** 並設定 **router**、實作 **Store Dialog** 店家資訊小卡並加入地圖與收藏名單中 )
- 江融其 40% ： 撰寫 Report 、後端全架構及 **API** 、 **pythonanywhere** 測試， **Docker** 整合
- 王獻霆 0% ： 這兩週較忙，組內分配下次做多一點 ><
- 劉高甸 15% ： 前端功能更新( **Search bar** 篩選及地圖上咖啡廳顯示、**Favorites column** 格式 )

