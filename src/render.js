import { categoryLabel } from "./filter.js?v=6";

const fallbackImages = {
  cafe: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
  food: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=900&q=80",
  play: "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=900&q=80",
  kids: "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?auto=format&fit=crop&w=900&q=80",
  nature: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80",
  sea: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
  valley: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
  experience: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80"
};

function imageFor(place) {
  return place.image || fallbackImages[place.imageKey] || fallbackImages[place.category] || fallbackImages.experience;
}

export function renderTabs(categories, activeId, onSelect) {
  const tabs = document.querySelector("#categoryTabs");
  tabs.replaceChildren();
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.className = `tab${category.id === activeId ? " active" : ""}`;
    button.innerHTML = `<span>${category.icon}</span><span>${category.label}</span>`;
    button.addEventListener("click", () => onSelect(category.id));
    tabs.append(button);
  });
}

export function renderSuggestions(seeds, onSearch) {
  const wrap = document.querySelector("#suggestions");
  wrap.replaceChildren();
  seeds.forEach((seed) => {
    const button = document.createElement("button");
    button.textContent = seed;
    button.addEventListener("click", () => onSearch(seed));
    wrap.append(button);
  });
}

export function renderList(places, categories, state, onSelect) {
  document.querySelector("#resultCount").textContent = `${categoryLabel(categories, state.activeCategory)} 추천 ${places.length}곳`;
  const list = document.querySelector("#placeList");
  list.replaceChildren();
  places.forEach((place) => {
    const card = document.createElement("button");
    card.className = "place-card";
    card.innerHTML = `
      <img src="${imageFor(place)}" alt="${place.name} 사진" loading="lazy">
      <span>
        <h3>${place.name}</h3>
        <p>${place.region} · ${place.age} · 추천 ${place.score}</p>
        <span class="chips">${place.facts.slice(0, 3).map((fact) => `<span class="chip">${fact}</span>`).join("")}</span>
      </span>
    `;
    card.addEventListener("click", () => onSelect(place.id));
    list.append(card);
  });
}

export function showDetail(place) {
  const sheet = document.querySelector("#detailSheet");
  sheet.innerHTML = `
    <img class="detail-hero" src="${imageFor(place)}" alt="${place.name} 사진">
    <div class="detail-body">
      <div class="detail-top">
        <div>
          <p class="eyebrow">${place.region} · ${place.age}</p>
          <h2>${place.name}</h2>
        </div>
        <button class="close-btn" id="closeDetail" aria-label="닫기">×</button>
      </div>
      <p>${place.reason}</p>
      <div class="fact-grid">${place.facts.map((fact) => `<div class="fact">${fact}</div>`).join("")}</div>
      <h3>메뉴와 준비물</h3>
      <ul class="info-list">${place.menu.map((item) => `<li>${item}</li>`).join("")}</ul>
      <h3>참고 출처 후보</h3>
      ${place.sources.map((source) => `<a class="source-link" href="#" aria-disabled="true">${source}</a>`).join("")}
    </div>
  `;
  sheet.classList.add("open");
  sheet.setAttribute("aria-hidden", "false");
  document.querySelector("#closeDetail").addEventListener("click", hideDetail);
}

export function hideDetail() {
  const sheet = document.querySelector("#detailSheet");
  sheet.classList.remove("open");
  sheet.setAttribute("aria-hidden", "true");
}
