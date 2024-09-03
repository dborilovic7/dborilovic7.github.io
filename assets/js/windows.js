DEFAULT_NAVIGATION_BUTTONS_OPACITY = "0.15";

let windows = [];

function setupWindow(id) {
  const desktop = document.getElementById("desktop");
  const openBtn = document.getElementById(`open-btn${id}`);
  const dialog = document.getElementById(`window${id}`);
  const topbar = document.getElementById(`topbar${id}`);
  const topbarIcon = document.getElementById(`topbar__info-icon${id}`);
  const topbarName = document.getElementById(`topbar__info-name${id}`);
  const backButton = document.getElementById(`topbar__info-back${id}`);
  const forwardButton = document.getElementById(`topbar__info-forward${id}`);
  // const topbarMinimizeBtn = document.getElementById(`topbar__actions-minimize${id}`);
  // const topbarMaximizeBtn = document.getElementById(`topbar__actions-maximize${id}`);
  const topbarCloseBtn = document.getElementById(`topbar__actions-close${id}`);
  const content = dialog.querySelector(".window__content");

  const draggableElementIds = [
    `topbar${id}`,
    `topbar__info${id}`,
    `topbar__info-icon${id}`,
    `topbar__info-name${id}`
  ];

  const windowObject = {
    element: dialog,
    history: [
      {
        topbar: {
          icon: topbarIcon,
          name: topbarName
        },
        content: content
      }
    ],
    historyPointer: 0
  };

  let offsetX, offsetY;

  openBtn && addAnEventListener(id, openBtn, "click", () => {
    reassignZIndices(dialog);
    dialog.show();
  });

  if(backButton) {
    backButton.style.opacity = DEFAULT_NAVIGATION_BUTTONS_OPACITY;
    backButton.addEventListener("click", () => goBackInHistory(dialog, topbar, backButton, forwardButton));
  }
  if(forwardButton) {
    forwardButton.style.opacity = DEFAULT_NAVIGATION_BUTTONS_OPACITY;
    forwardButton.addEventListener("click", () => goForwardInHistory(dialog, topbar, backButton, forwardButton));
  }

  topbarCloseBtn.addEventListener("click", () => dialog.close());
  topbar.addEventListener("pointerdown", onPointerDown);
  dialog.addEventListener("pointerdown", () => reassignZIndices(dialog));

  desktop.appendChild(dialog);
  windows.push(windowObject);

  const startingX = window.innerWidth / 2 - getOffsetWidth(dialog) / 2;
  dialog.style.left = `${startingX}px`;

  function getOffsetWidth(dialog) {
    const wasDialogClosed = !dialog.open;

    // dialog.style.opacity = "0";
    dialog.style.transition = "none";
    dialog.show();

    const dialogOffsetWitdh = dialog.offsetWidth;

    wasDialogClosed && dialog.close();

    // dialog.style.opacity = "";
    dialog.offsetHeight;
    dialog.style.transition = "";

    return dialogOffsetWitdh;
  }

  function onPointerDown(e) {
    if (!draggableElementIds.includes(e.target.id)) return;

    offsetX = e.offsetX;
    offsetY = e.offsetY;

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  }

  function onPointerMove(e) {
    dialog.style.left = `${e.clientX- offsetX}px`;
    dialog.style.top = `${e.clientY - offsetY - desktop.offsetTop}px`;
  }

  function onPointerUp(e) {
    document.removeEventListener("pointermove", onPointerMove);
    const desktopHeight = desktop.clientHeight;
    const topbarHeight = topbar.scrollHeight;

    const topbarHalfWidth = topbar.scrollWidth / 2;
    if (dialog.offsetLeft + topbarHalfWidth < 0) dialog.style.left = `-${topbarHalfWidth}px`;
    else if (dialog.offsetLeft + topbarHalfWidth > window.innerWidth)
      dialog.style.left = `${window.innerWidth - topbarHalfWidth}px`;
    
    if (dialog.offsetTop < 0) dialog.style.top = "0px";
    else if (dialog.offsetTop + topbarHeight > desktopHeight)
      dialog.style.top = `${desktopHeight - topbarHeight}px`;
  }

  dialog.onclose = e => {
    const videoElement = e.target.querySelector("video");
    videoElement?.pause();
  }
}

function reassignZIndices(clickedDialog) {
  const windowsElements = windows.map(win => win.element);

  const clickedDialogIndex = windowsElements.indexOf(clickedDialog);
  if(clickedDialogIndex === windowsElements.length - 1) return;

  if(clickedDialogIndex > -1) {
    const win = windows.splice(clickedDialogIndex, 1)[0];
    windows.push(win);
  }

  windows.forEach((win, i) => {
    win.element.style.zIndex = 10 + i;
  });
}

function goBackInHistory(dialog, topbar, backButton, forwardButton) {
  const win = windows.find(win => win.element === dialog);
  const prevContent = win.history[win.historyPointer - 1];

  if(prevContent == null) return;

  replaceContent(dialog, topbar, prevContent.topbar, prevContent.content);
  win.historyPointer -= 1;
  forwardButton.style.opacity = "1";

  if(win.history[win.historyPointer - 1] == null) {
    backButton.style.opacity = DEFAULT_NAVIGATION_BUTTONS_OPACITY;
  }
}

function goForwardInHistory(dialog, topbar, backButton, forwardButton) {
  const win = windows.find(win => win.element === dialog);
  const nextContent = win.history[win.historyPointer + 1];

  if(nextContent == null) return;
  
  replaceContent(dialog, topbar, nextContent.topbar, nextContent.content);
  win.historyPointer += 1;
  backButton.style.opacity = "1";

  if(win.history[win.historyPointer + 1] == null) {
    forwardButton.style.opacity = DEFAULT_NAVIGATION_BUTTONS_OPACITY;
  }
}

function setupWindowReplaces() {
  const replaceBtns = document.querySelectorAll(".replace-btn");
  
  replaceBtns.forEach(replaceBtn => {
    const windowId = replaceBtn.dataset.windowId;
    const replacementId = replaceBtn.dataset.replacementId;

    const dialog = replaceBtn.parentElement.parentElement.parentElement;
    const topbar = dialog.querySelector(`#topbar${windowId}`);
    const backButton = topbar.querySelector(`#topbar__info-back${windowId}`);
    const forwardButton = topbar.querySelector(`#topbar__info-forward${windowId}`);
    
    const win = windows.find(win => win.element === dialog);

    addAnEventListener(replacementId, replaceBtn, "click", () => addToWindowHistory(replacementId, dialog, topbar, backButton, forwardButton, win));
  });
}

function addToWindowHistory(replacementId, dialog, topbar, backButton, forwardButton, win) {
  const newIcon = document.getElementById(`topbar__info-icon${replacementId}`).cloneNode(true);
  const newName = document.getElementById(`topbar__info-name${replacementId}`).cloneNode(true);
  const newTopbar = { icon: newIcon, name: newName };

  const newContent = document.getElementById(`window-replacement${replacementId}`).querySelector(".window__content");
  const newContentClone = cloneWithEventListeners(newContent);
  
  win.history[win.historyPointer + 1] = {
    topbar: newTopbar,
    content: newContentClone
  }
  win.history.splice(win.historyPointer + 2);
  win.historyPointer += 1;
  
  replaceContent(dialog, topbar, newTopbar, newContentClone);

  backButton.style.opacity = "1";
  forwardButton.style.opacity = DEFAULT_NAVIGATION_BUTTONS_OPACITY;
}

function replaceContent(dialog, topbar, newTopbar, newContent) {
  const topbarInfo = topbar.children[0];
  const backButton = topbarInfo.children[2];
  const forwardButton = topbarInfo.children[3];

  dialog.innerHTML = "";
  topbarInfo.innerHTML = "";
  
  topbarInfo.appendChild(newTopbar.icon);
  topbarInfo.appendChild(newTopbar.name);
  topbarInfo.insertAdjacentHTML("beforeend", "\n");
  topbarInfo.appendChild(backButton);
  topbarInfo.insertAdjacentHTML("beforeend", "\n");
  topbarInfo.appendChild(forwardButton);
  
  dialog.appendChild(topbar);
  dialog.appendChild(newContent);
}

document.addEventListener("DOMContentLoaded", e => setupWindowReplaces());