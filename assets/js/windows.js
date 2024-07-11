let windows = [];

function setupWindow(id) {
  const desktop = document.getElementById("desktop");
  const openBtn = document.getElementById(`open-btn${id}`);
  const dialog = document.getElementById(`window${id}`);
  const topbar = document.getElementById(`topbar${id}`);
  // const topbarMinimizeBtn = document.getElementById(`topbar__actions-minimize${id}`);
  // const topbarMaximizeBtn = document.getElementById(`topbar__actions-maximize${id}`);
  const topbarCloseBtn = document.getElementById(`topbar__actions-close${id}`);
  const draggableElementIds = [
    `topbar${id}`,
    `topbar__info${id}`,
    `topbar__info-icon${id}`,
    `topbar__info-name${id}`
  ];
  let offsetX, offsetY;

  openBtn && openBtn.addEventListener("click", () => {
    reassignZIndices(dialog);
    dialog.show();
  });
  topbarCloseBtn.addEventListener("click", () => dialog.close());
  topbar.addEventListener("pointerdown", onPointerDown);
  desktop.appendChild(dialog);
  windows.push(dialog);

  function onPointerDown(e) {
    reassignZIndices(dialog);

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
  const clickedDialogIndex = windows.indexOf(clickedDialog);
  if(clickedDialogIndex === windows.length - 1) return;

  if(clickedDialogIndex > -1) {
    const win = windows.splice(clickedDialogIndex, 1)[0];
    windows.push(win);
  }

  windows.forEach((win, i) => {
    win.style.zIndex = 10 + i;
  });
}