import { categories, searchSeeds } from "./meta.js?v=7";
import { capitalPlaces } from "./places-capital.js?v=7";
import { regionalPlaces } from "./places-regions.js?v=7";

const places = [...capitalPlaces, ...regionalPlaces];

export { categories, places, searchSeeds };
