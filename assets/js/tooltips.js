const tooltipElements = document.querySelectorAll("[data-tooltip]");

tooltipElements.forEach(tooltipElement => {
  const boundingRect = tooltipElement.getBoundingClientRect();
  const windowWidth = document.body.clientWidth;
  const diff = windowWidth - boundingRect.x;

  if (diff < 60) tooltipElement.style.setProperty("--left", "-200%");
});