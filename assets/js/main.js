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

// Shutdown
const shutdownBtn = document.getElementById("shutdown-btn");
const shutdownOverlay = document.getElementById("shutdown-overlay");
const powerOnBtn = document.getElementById("power-on-btn");

shutdownBtn.addEventListener("click", () => {
  shutdownOverlay.style.display = "block";
  shutdownOverlay.offsetHeight;
  shutdownOverlay.classList.add("open");

  setTimeout(() => {
    windows.forEach(win => {
      const dialog = win.element;
  
      dialog.close();
      setTimeout(() => centerDialog(dialog), 500);
    });
  }, 500);
});

powerOnBtn.addEventListener("click", () => {
  shutdownOverlay.classList.remove("open");
  shutdownOverlay.style.display = "";
});