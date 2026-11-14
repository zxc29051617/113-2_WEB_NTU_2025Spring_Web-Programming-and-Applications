# NTU Web Programming and Applications 2025 Spring

這個 repository 收錄臺大 113-2 Web 程式設計與應用課程第 25 組的每週作業報告，以及期末專題的前期版本。
期末專題 Coffee Seeker 在另一個 repository：Web-Programming-Team25-CoffeeSeeker（🔒 私人）。

組員：[yuting1008](https://github.com/yuting1008)、[bestmark520](https://github.com/bestmark520)、[RickyChiang2003](https://github.com/RickyChiang2003)、[LiuJyun](https://github.com/LiuJyun)、[Vegnics](https://github.com/Vegnics)、[zxc29051617](https://github.com/zxc29051617)

這些內容原本放在課程組織 NTU-Team-25 的 HW_Report、EduAssist、CoffeeSeeker-archived 三個 repository。

## 專案結構

```text
.
├── README.md
├── HW_Report/                # 每週作業報告
├── EduAssist/                # 第一個題目：教學輔助 AI 聊天機器人
└── CoffeeSeeker-archived/    # Coffee Seeker 的第一版（React、Vite）
```

## 每週作業

路徑：[`HW_Report/`](HW_Report)

- Week03：教學輔助 AI 聊天機器人 EduAssist（HTML、CSS、JavaScript，串接 Gemini API）
- Week05：題目改成咖啡廳地圖 Coffee Seeker，用 React 做 Google Maps 介面、選項框與聊天視窗，並用爬蟲建立咖啡廳資料
- Week07：加入 Django 後端，前後端包進同一個 Docker image
- Week11：前端改用 Next.js、TypeScript、shadcn/ui 與 Tailwind CSS；後端用 Django ORM 匯入爬到的咖啡廳資料
- Week13：Google 帳號登入、Gemini 聊天與收藏功能；後端改用 Django REST framework，並測試 PythonAnywhere 部署

每週的執行方式寫在各自資料夾的 `WeekXX.md`。

## EduAssist

路徑：[`EduAssist/`](EduAssist)

幫老師出題、批改與設計課程內容的聊天機器人，串接 Gemini API。
在 `assets/js/` 新增 `config.js` 並填入 Gemini API key，再用瀏覽器打開 `pages/index.html`。

## CoffeeSeeker-archived

路徑：[`CoffeeSeeker-archived/`](CoffeeSeeker-archived)

Coffee Seeker 的第一版，用 React 與 Vite 寫成。

```bash
cd CoffeeSeeker-archived
npm install
npm run dev
```
