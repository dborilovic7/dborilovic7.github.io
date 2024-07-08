// Live clock
const UPDATE_INTERVAL = 1000;
const dateElement = document.getElementById("taskbar-date");
const timeElement = document.getElementById("taskbar-time");

const displayTime = () => {
  const today = new Date();
  const date = today.toLocaleDateString().replace(/ /g, "");
  const time = today.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
  
  dateElement.innerText = date;
  timeElement.innerText = time;
}

setInterval(displayTime, UPDATE_INTERVAL);


// Dismiss rotate device 'notification'
const removeOverlayButton = document.getElementById("remove-overlay");
const rotateDeviceOverlay = document.getElementById("rotate-device-overlay");

removeOverlayButton.addEventListener("click", () => {
  rotateDeviceOverlay.remove();
});