const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-btn");
const menuItemBtns = document.querySelectorAll(".menu-item-btn");
const taskbar = document.getElementById("taskbar");

menuBtn.addEventListener("click", () => {
  menu.open ? menu.close() : menu.show();
});

menuItemBtns.forEach(menuItemBtn => {
  menuItemBtn.addEventListener("click", () => {
    menu.close();
  });
});

document.addEventListener("pointerdown", e => {
  if(!menu.open) return;

  const { top, right } = menu.getBoundingClientRect();
  if((e.clientX > right || e.clientY < top) && e.target !== taskbar) menu.close();
});