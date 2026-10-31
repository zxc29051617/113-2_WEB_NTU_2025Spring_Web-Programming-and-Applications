// ======== chat.js 全域變數: 用戶選擇資訊(決定prompt的資訊) ========
var subject = (new URLSearchParams(window.location.search)).get("subject");
var feature = (new URLSearchParams(window.location.search)).get("feature");


document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  subject = urlParams.get("subject");
  feature = urlParams.get("feature");
  console.log("Selected subject from doc EventListener:", subject);
  console.log("Selected feature from doc EventListener:", feature);

  const titleElement = document.getElementById("dynamic-title");
  titleElement.innerHTML = `How can we <span>assist</span> you in <span>${subject}</span> today?`;
});

// ======== 處理選單效果 ========

const buttons = document.querySelectorAll(".menu button");
const slider = document.querySelector(".slider");

// 初始化選單位置
function updateSlider() {
  const activeButton = document.querySelector(".menu button.active");
  slider.style.width = `${activeButton.offsetWidth}px`;
  slider.style.left = `${activeButton.offsetLeft}px`;
}

window.addEventListener("load", updateSlider);
window.addEventListener("resize", updateSlider);

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // 更新按鈕的 active 狀態
    buttons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    feature = button.textContent;
    console.log("Selected feature from button EventListener:", feature);
    updateSlider();
  });
});

// ======== 處理聊天介面 ========

const sendButton = document.querySelector(".input-container button");
const inputField = document.querySelector(".input-container input");
const initialInterface = document.querySelector(".initial-interface");
const chatContainer = document.querySelector(".chat-container");

async function fetchGeminiResponse(userMessage) {
  const gemini_model = "gemini-1.5-pro";  // gemini-2.0-flash
  const apiKey = CONFIG.GEMINI_API_KEY;   // put api key in config.js
  const url = `https://generativelanguage.googleapis.com/v1/models/${gemini_model}:generateContent?key=${apiKey}`;

  //  根據 subject & feature 設定適合的 System Prompt
  console.log("Selected subject:", subject);
  console.log("Selected feature:", feature);

  let subjectPrompt = "Attack on Titan"
  switch (subject) {
    case "Chinese":
      subjectPrompt = "Chinese";
      // 中文科
      break;
    case "Math":
      subjectPrompt = "mathematics";
      // 數學
      break;
    case "English":
      subjectPrompt = "English";
      // 英文
      break;
    case "Nature":
      subjectPrompt = "Nature";
      // 自然科學
      break;
    case "Society":
      subjectPrompt = "Society";
      // 社會科
      break;
    default:
      subjectPrompt = "Attack on Titan";
      // 進擊的巨人
      break;
  }
  let sfPrompt = "";
  let taskPrompt = "";
  switch (feature) {
    case "General":
      // default
      // sfPrompt = subjectPrompt + "教學或" + subjectPrompt;
      // taskPrompt = "請達成我的要求並視我的需求決定是否提供解釋。"
      sfPrompt = subjectPrompt+" teaching or "+subjectPrompt;
      taskPrompt = "Please meet my demands and decide whether to provide an explanation based on my needs.";
      break;
    case "Quiz":
      // sfPrompt = subjectPrompt + "出題";
      // taskPrompt = "請根據我的需求出題並跟據情況提供相關解釋或解答，若需求不夠清楚則生成一個達成我的要求的題目給我。";
      sfPrompt = subjectPrompt + " exam question setting";
      taskPrompt = "Please create questions based on my needs and provide relevant explanations or answers as appropriate. If my request is not clear enough, generate a question that meets my requirements for me.";
      break;
    case "Grading":
      // sfPrompt = subjectPrompt + "批改、評論與評分";
      // taskPrompt = "請先確認我是否有提供評分、評論或批改相關資訊與要被批改的目標，若缺少相關資訊，則請你隨機生成一個可能滿足我的評比方法與評比目標並告訴我，並根據這個猜測給予相應的評價或評分，若有相關資訊則根據我的需求進行評分或批改，並根據我的需求決定是否提供評語。";
      sfPrompt = subjectPrompt+" correction, review, and grading"
      taskPrompt = "Please first check whether I have provided information about grading, reviewing, or correction, as well as the target to be evaluated. If such information is missing, randomly generate a possible evaluation method and target that might meet my requirements, inform me of them, and provide an appropriate evaluation or score based on this assumption. If relevant information is provided, grade or correct according to my requirements and decide whether to include comments based on my needs.";
      break;
    case "Lesson":
      // sfPrompt = subjectPrompt + "課程設計";
      // taskPrompt = "請先確認我是否有提供關於課程設計的資訊，即便缺少相關資訊，也請你先生成一個盡可能滿足我的需求的完整課程規劃來告訴我，並稍稍提醒我提供新資訊，若有相關資訊則根據我的需求設計課程。";
      sfPrompt = subjectPrompt + " curriculum or timetable design";
      taskPrompt = "Please first check whether I have provided information about curriculum design. Even if such information is missing, generate a complete course plan that best meets my needs and inform me about it while gently reminding me to provide additional details. If relevant information is available, design the course according to my requirements.";
      break;
    default: break;
  }

  // let main_requirement_Prompt = "你是一名專業的"+sfPrompt+"老師。接下來我將給你一個問題，在回答我的問題之前，你需要先客觀思考我的問題是否與"+sfPrompt+"相關，但請記得不要告訴我題目與"+sfPrompt+"是否相關，也請記得不要告訴我你是否會判斷這件事，請注意「"+subject+"」相關的字眼不能影響此判斷。\n接下來會有三種情況: 情況一、若我的題目與"+sfPrompt+"的關係都較小，請要求我向你提問與"+sfPrompt+"相關的問題，接著舉出一至三種例子提示我如何提問，同時請記得不要回答我的問題； 情況二、若我的問題內出現自相矛盾的情形，請糾正我的矛盾並給予少許的學習建議； 情況三、若我的問題與"+sfPrompt+"相關，";
  // let userPrompt_pre = "以下是我給你的問題:「";
  // let userPrompt_aft = "」\n請不要提及你會思考我的問題與"+subject+"是否相關，請不要提及我提供的三種情況的存在，請不要告訴我你會不會回答我的問題，並請嚴格根據我提供的三種情況回覆我。";
  let main_requirement_Prompt = "You are a professional "+sfPrompt+" teacher. I will now give you a question. Before answering, you need to objectively determine whether my question is related to "+sfPrompt+". However, please remember not to tell me whether the question is related to "+subject+", and do not mention whether you are making this determination. Also, be aware that words related to \""+sfPrompt+"\" should not influence this judgment.\nThere will be three possible situations:\n1. If my question has little or no relation to "+sfPrompt+", ask me to provide a question related to "+sfPrompt+" instead. Then, give one to three examples to guide me on how to ask an appropriate question. Make sure not to answer my original question.\n2. If my question contains contradictions, point out the inconsistencies and provide a brief learning suggestion.\n3. If my question is related to "+sfPrompt+", "
  let userPrompt_pre = "Here is the question I have for you: \""
  let userPrompt_aft = "\"\nPlease do not mention that you will consider whether my question is related to "+subject+", do not refer to the existence of the three situations I provided, do not tell me whether you will answer my question, and please respond strictly according to the three situations I provided."


  let systemPrompt = `${main_requirement_Prompt}${taskPrompt}\n\n${userPrompt_pre}${userMessage}${userPrompt_aft}`;

  
  const requestBody = {
    contents: [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
    ],
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log("Gemini response:", data);

    const aiReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry. Gemini cannot respond to that.";
    
    if (!data) {
      aiReply = aiReply+"\n\nError: The response from Gemini is undefined or null, please check your Gemini API and internet settings.";
    }
    
    return aiReply;
  } catch (error) {
    console.error("Gemini API occurs error, please check your Gemini API and internet settings.:", error);
    return "Sorry. Please try again later.";
  }
}

async function sendMessage() {
  const message = inputField.value.trim();
  if (message) {
    console.log("Selected subject:", message);
    // 隱藏初始介面，顯示聊天介面
    initialInterface.style.display = "none";
    chatContainer.style.display = "block";

    const userMessageDiv = document.createElement("div");
    userMessageDiv.classList.add("message", "user-message");
    userMessageDiv.innerHTML = `
                    <div class="message-content user-content">${message}</div>
                    <div class="avatar user-avatar">You</div>
                `;

    // 將用戶訊息新增到聊天介面
    chatContainer.appendChild(userMessageDiv);
    inputField.value = "";
    window.scrollTo(0, document.body.scrollHeight);

    // 呼叫 Gemini API 取得回覆
    const aiReply = await fetchGeminiResponse(message);
    const aiMessageDiv = document.createElement("div");
    aiMessageDiv.classList.add("message", "ai-message");

    // 設定marked選項
    marked.setOptions({
      breaks: true, // 支援換行
      gfm: true,    // 支援GitHub Flavored Markdown
      sanitize: false // 允許HTML標籤
    });

    // 使用marked.js將回覆轉換為HTML
    const markdownReply = marked.parse(aiReply);
    aiMessageDiv.innerHTML = `
                            <div class="avatar ai-avatar">AI</div>
                            <div class="message-content ai-content">${markdownReply}</div>
                        `; 

    chatContainer.appendChild(aiMessageDiv);
    window.scrollTo(0, document.body.scrollHeight);
  }
}

sendButton.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
