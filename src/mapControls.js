import { changeZoom, panBy } from "./state.js?v=7";

export function installMapControls(onChange) {
  const map = document.querySelector("#mapCanvas");
  let dragging = false;
  let last = null;

  map.addEventListener("wheel", (event) => {
    event.preventDefault();
    const rect = map.getBoundingClientRect();
    const delta = event.deltaY < 0 ? 1 : -1;
    changeZoom(delta, { x: event.clientX - rect.left, y: event.clientY - rect.top }, rect);
    onChange();
  }, { passive: false });

  map.addEventListener("dblclick", (event) => {
    const rect = map.getBoundingClientRect();
    changeZoom(1, { x: event.clientX - rect.left, y: event.clientY - rect.top }, rect);
    onChange();
  });

  map.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".map-marker")) return;
    dragging = true;
    last = { x: event.clientX, y: event.clientY };
    map.setPointerCapture(event.pointerId);
    map.classList.add("dragging");
  });

  map.addEventListener("pointermove", (event) => {
    if (!dragging || !last) return;
    const next = { x: event.clientX, y: event.clientY };
    panBy(next.x - last.x, next.y - last.y);
    last = next;
    onChange();
  });

  map.addEventListener("pointerup", (event) => {
    dragging = false;
    last = null;
    map.releasePointerCapture(event.pointerId);
    map.classList.remove("dragging");
  });
}
