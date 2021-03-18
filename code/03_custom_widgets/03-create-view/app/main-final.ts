import { Point } from "esri/geometry";
import Map  from "esri/Map";
import SceneView from "esri/views/SceneView";

import {CustomClass} from "./CustomClass";
import CustomWidget from "./CustomWidget";

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

const customWidget = new CustomWidget({view})
view.ui.add(customWidget, 'top-right')
