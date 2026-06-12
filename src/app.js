import { categories, places, searchSeeds } from "../data/places.js?v=9";
import { filterPlaces } from "./filter.js?v=7";
import { renderMap } from "./map.js?v=7";
import { installMapControls } from "./mapControls.js?v=7";
import { hideDetail, renderList, renderSuggestions, renderTabs, showDetail } from "./render.js?v=9";
import { changeZoom, focusPlace, focusPlaces, setCategory, setQuery, setSelected, state } from "./state.js?v=7";

const searchInput = document.querySelector("#searchInput");

function visiblePlaces() {
  return filterPlaces(places, state);
}

function selectPlace(id) {
  const place = places.find((item) => item.id === id);
  if (!place) return;
  setSelected(id);
  focusPlace(place);
  paint();
  showDetail(place);
}

function runSearch(value = searchInput.value) {
  searchInput.value = value;
  setQuery(value);
  focusPlaces(visiblePlaces());
  hideDetail();
  paint();
}

function paint() {
  const filtered = visiblePlaces();
  renderTabs(categories, state.activeCategory, (id) => {
    setCategory(id);
    hideDetail();
    paint();
  });
  renderList(filtered, categories, state, selectPlace);
  renderMap(state, filtered, selectPlace);
}

document.querySelector("#searchBtn").addEventListener("click", () => runSearch());
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") runSearch();
});
document.querySelector("#clearFilter").addEventListener("click", () => {
  searchInput.value = "";
  setQuery("");
  setCategory("all");
  hideDetail();
  paint();
});
document.querySelector("#zoomIn").addEventListener("click", () => {
  changeZoom(1);
  paint();
});
document.querySelector("#zoomOut").addEventListener("click", () => {
  changeZoom(-1);
  paint();
});
document.querySelector("#locateBtn").addEventListener("click", () => runSearch("서울"));

renderSuggestions(searchSeeds, runSearch);
installMapControls(paint);
paint();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js?v=7");
}

addEventListener("resize", () => paint());
