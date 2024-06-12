const dateElement = document.getElementById("taskbar-date");
const timeElement = document.getElementById("taskbar-time");

const displayTime = () => {
  const today = new Date();
  const date = today.toLocaleDateString().replace(/ /g, "");
  const time = today.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});
  
  dateElement.innerText = date;
  timeElement.innerText = time;
}

setInterval(displayTime, 1000);