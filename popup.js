
document.getElementById("startPomodoro").addEventListener("click", async () => {
    chrome.runtime.sendMessage("START_TIMER");
  });

document.getElementById("stopPomodoro").addEventListener("click", async () => {
    chrome.runtime.sendMessage("END_TIMER");
});
