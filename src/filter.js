export function filterPlaces(places, state) {
  return places.filter((place) => {
    const categoryOk = state.activeCategory === "all" || place.category === state.activeCategory;
    const haystack = `${place.name} ${place.region} ${place.reason} ${place.facts.join(" ")}`.toLowerCase();
    const queryOk = !state.query || haystack.includes(state.query);
    return categoryOk && queryOk;
  });
}

export function categoryLabel(categories, id) {
  return categories.find((item) => item.id === id)?.label ?? "전체";
}
