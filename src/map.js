import { project, TILE } from "./geo.js?v=7";

export function renderMap(state, places, onSelect) {
  renderTiles(state);
  renderMarkers(state, places, onSelect);
  document.querySelector("#zoomLevel").textContent = `${state.mapZoom}단계`;
}

function renderTiles(state) {
  const map = document.querySelector("#mapCanvas");
  const layer = document.querySelector("#tileLayer");
  const rect = map.getBoundingClientRect();
  const center = project(state.center.lat, state.center.lng, state.mapZoom);
  const startX = Math.floor((center.x - rect.width / 2) / TILE) - 1;
  const endX = Math.floor((center.x + rect.width / 2) / TILE) + 1;
  const startY = Math.floor((center.y - rect.height / 2) / TILE) - 1;
  const endY = Math.floor((center.y + rect.height / 2) / TILE) + 1;
  layer.replaceChildren();

  for (let x = startX; x <= endX; x += 1) {
    for (let y = startY; y <= endY; y += 1) {
      const tile = new Image(TILE, TILE);
      tile.src = `https://tile.openstreetmap.org/${state.mapZoom}/${x}/${y}.png`;
      tile.alt = "";
      tile.draggable = false;
      tile.style.left = `${x * TILE - center.x + rect.width / 2}px`;
      tile.style.top = `${y * TILE - center.y + rect.height / 2}px`;
      layer.append(tile);
    }
  }
}

function renderMarkers(state, places, onSelect) {
  const map = document.querySelector("#mapCanvas");
  const layer = document.querySelector("#markerLayer");
  const rect = map.getBoundingClientRect();
  const center = project(state.center.lat, state.center.lng, state.mapZoom);
  layer.replaceChildren();

  places.forEach((place) => {
    const point = project(place.lat, place.lng, state.mapZoom);
    const x = point.x - center.x + rect.width / 2;
    const y = point.y - center.y + rect.height / 2;
    const marker = document.createElement("button");
    marker.className = `map-marker${place.id === state.selectedId ? " active" : ""}`;
    marker.dataset.id = place.id;
    marker.style.left = `${x}px`;
    marker.style.top = `${y}px`;
    marker.innerHTML = `<span class="marker-label">${place.region.split(" ")[0]}</span>`;
    marker.addEventListener("click", () => onSelect(place.id));
    layer.append(marker);
  });
}
