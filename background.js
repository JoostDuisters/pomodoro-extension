let ONE_MINUTE = 60 * 1000;

let focusTime = 25;
let breakTime = 5;

var isFocusTime = false;
var interval;

var curTime = focusTime;

// Listener to catch messages sent from popup script
chrome.runtime.onMessage.addListener(function (msg) {
  switch (msg) {
    case "START_TIMER":
      startTimer();
      break;
    case "END_TIMER":
      stopTimer();
      break;
  }
  return true;
});

function startTimer() {
  curTime = focusTime;
  isFocusTime = true;

  chrome.action.setBadgeText({ text: curTime.toString() });
  chrome.action.setBadgeBackgroundColor({ color: "green" });

  interval = setInterval(intervalFunction, ONE_MINUTE);
}

function intervalFunction() {
  if (curTime != 0) {
    curTime = curTime - 1;
  } else {
    // Swap from focus time to break time or vice versa
    curTime = isFocusTime ? breakTime : focusTime
    chrome.action.setBadgeBackgroundColor({ color: isFocusTime ? "blue" : "green" });
    isFocusTime = !isFocusTime
  }

  chrome.action.setBadgeText({ text: curTime.toString() });
}

function stopTimer() {
  chrome.action.setBadgeText({ text: "" });
  clearInterval(interval);
}
