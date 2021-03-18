import Map from "esri/Map";
import SceneView from "esri/views/SceneView";

//----------------
//  map setup
//----------------

const map = new Map({
  basemap: "streets-vector"
});

const view = new SceneView({
  map: map,
  container: "viewDiv",
  center: [13.404954, 52.520008],
  zoom: 15
});
