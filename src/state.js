import { clamp, project, unproject } from "./geo.js?v=7";

export const state = {
  activeCategory: "all",
  query: "",
  selectedId: null,
  center: { lat: 36.3, lng: 127.8 },
  mapZoom: 7
};

export function setCategory(id) {
  state.activeCategory = id;
}

export function setQuery(value) {
  state.query = value.trim().toLowerCase();
}

export function setSelected(id) {
  state.selectedId = id;
}

export function changeZoom(delta, anchor, rect) {
  const nextZoom = clamp(state.mapZoom + delta, 6, 12);
  if (anchor && rect) {
    zoomAround(nextZoom, anchor, rect);
  } else {
    state.mapZoom = nextZoom;
  }
}

export function focusPlace(place) {
  state.center = { lat: place.lat, lng: place.lng };
  state.mapZoom = Math.max(state.mapZoom, 10);
}

export function focusPlaces(places) {
  if (!places.length) return;
  const lat = places.reduce((sum, place) => sum + place.lat, 0) / places.length;
  const lng = places.reduce((sum, place) => sum + place.lng, 0) / places.length;
  state.center = { lat, lng };
  state.mapZoom = places.length < 4 ? 9 : 7;
}

export function panBy(dx, dy) {
  const center = project(state.center.lat, state.center.lng, state.mapZoom);
  state.center = unproject(center.x - dx, center.y - dy, state.mapZoom);
}

function zoomAround(nextZoom, anchor, rect) {
  const before = project(state.center.lat, state.center.lng, state.mapZoom);
  const offsetX = anchor.x - rect.width / 2;
  const offsetY = anchor.y - rect.height / 2;
  const anchorWorld = { x: before.x + offsetX, y: before.y + offsetY };
  const scale = 2 ** (nextZoom - state.mapZoom);
  const newAnchor = { x: anchorWorld.x * scale, y: anchorWorld.y * scale };
  state.mapZoom = nextZoom;
  state.center = unproject(newAnchor.x - offsetX, newAnchor.y - offsetY, nextZoom);
}
