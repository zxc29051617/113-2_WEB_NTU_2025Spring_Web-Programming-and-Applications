document.addEventListener("DOMContentLoaded", () => {
  const subjectSelect = document.getElementById("subject");
  const startButton = document.querySelector("a.button");

  subjectSelect.addEventListener("change", () => {
    console.log(`Selected subject: ${subjectSelect.value}`);
  });

  startButton.addEventListener("click", (e) => {
    const selectedSubject = subjectSelect.value;
    const initFeature = "General";
    if (!selectedSubject) {
      e.preventDefault();
      alert("Please select a subject before starting.");
    } else {
      startButton.href = `chat.html?subject=${encodeURIComponent(selectedSubject)}&feature=${encodeURIComponent(initFeature)}`;
    }
  });
});
