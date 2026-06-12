import { categories, searchSeeds } from "./meta.js?v=7";
import { autoPlaces } from "./places-auto.js?v=9";
import { autoCafePlaces } from "./places-cafes-auto.js?v=10";
import { capitalPlaces } from "./places-capital.js?v=7";
import { daejeonCheonanPlaces } from "./places-daejeon-cheonan.js?v=8";
import { regionalPlaces } from "./places-regions.js?v=7";

const mergedPlaces = [...capitalPlaces, ...regionalPlaces, ...daejeonCheonanPlaces, ...autoPlaces, ...autoCafePlaces];
const seen = new Set();
const places = mergedPlaces.filter((place) => {
  const key = `${place.name}-${place.region}`;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

export { categories, places, searchSeeds };
