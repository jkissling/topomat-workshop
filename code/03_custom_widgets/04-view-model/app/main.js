define(["require", "exports", "tslib", "esri/geometry", "esri/Map", "esri/views/SceneView", "./CustomWidget"], function (require, exports, tslib_1, geometry_1, Map_1, SceneView_1, CustomWidget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = tslib_1.__importDefault(Map_1);
    SceneView_1 = tslib_1.__importDefault(SceneView_1);
    CustomWidget_1 = tslib_1.__importDefault(CustomWidget_1);
    //----------------
    //  map setup
    //----------------
    var map = new Map_1.default({
        basemap: "streets-vector"
    });
    var view = new SceneView_1.default({
        map: map,
        container: "viewDiv",
        center: [13.404954, 52.520008],
        zoom: 15
    });
    //----------------
    //  Custom Class setup
    //----------------
    var stops = [
        new geometry_1.Point({ y: 47.35006, x: 7.90366 }),
        new geometry_1.Point({ y: 47.38760, x: 8.52264 }),
        new geometry_1.Point({ y: 46.33747, x: 6.16744 }),
        new geometry_1.Point({ y: 45.97641, x: 7.65859 })
    ];
    var customWidget = new CustomWidget_1.default({ view: view, stops: stops });
    view.ui.add(customWidget, 'top-right');
});
//# sourceMappingURL=main.js.map