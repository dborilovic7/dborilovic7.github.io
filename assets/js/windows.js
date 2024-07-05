function setupWindow(id) {
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

  openBtn && openBtn.addEventListener("click", () => dialog.show());
  topbarCloseBtn.addEventListener("click", () => dialog.close());
  topbar.addEventListener("mousedown", onMouseDown);
  document.body.appendChild(dialog);

  function onMouseDown(e) {
    if (!draggableElementIds.includes(e.target.id)) return;

    offsetX = e.offsetX;
    offsetY = e.offsetY;

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  function onMouseMove(e) {
    dialog.style.left = `${e.clientX - offsetX}px`;
    dialog.style.top = `${e.clientY - offsetY}px`;
  }

  function onMouseUp(e) {
    document.removeEventListener("mousemove", onMouseMove);

    const topbarHalfWidth = topbar.scrollWidth / 2;
    if (dialog.offsetLeft + topbarHalfWidth < 0) dialog.style.left = `-${topbarHalfWidth}px`;
    else if (dialog.offsetLeft + topbarHalfWidth > window.innerWidth)
      dialog.style.left = `${window.innerWidth - topbarHalfWidth}px`;

    const topbarHeight = topbar.scrollHeight;
    if (dialog.offsetTop < 0) dialog.style.top = "0px";
    else if (dialog.offsetTop + topbarHeight > window.innerHeight)
      dialog.style.top = `${window.innerHeight - topbarHeight}px`;
  }

  dialog.onclose = e => {
    const videoElement = e.target.querySelector("video");
    videoElement?.pause();
  }
}