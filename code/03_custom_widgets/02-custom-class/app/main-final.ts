import { Point } from "esri/geometry";
import Map  from "esri/Map";
import SceneView from "esri/views/SceneView";

import {CustomClass} from "./CustomClass";

//----------------
//  map setup
//----------------

const map = new Map({
  basemap: "streets-vector"
});

const view = new SceneView({
  map,
  container: "viewDiv",
  center: [13.404954, 52.520008],
  zoom: 15
});

//----------------
//  Custom Class setup
//----------------

const stops = [
  new Point({y: 47.35006, x: 7.90366}),
  new Point({y: 47.38760, x: 8.52264}),
  new Point({y: 46.33747, x: 6.16744}),
  new Point({y: 45.97641, x: 7.65859})
]
const customClass = new CustomClass({ view, stops });

// show next stop every 10 seconds
setInterval(() => customClass.next(), 10000);
// log active stops
customClass.watch('active', console.log)
