define(["require", "exports", "tslib", "esri/Map", "esri/views/MapView"], function (require, exports, tslib_1, Map_1, MapView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Map_1 = tslib_1.__importDefault(Map_1);
    MapView_1 = tslib_1.__importDefault(MapView_1);
    //----------------
    //  map setup
    //----------------
    var map = new Map_1.default({
        basemap: "streets-vector"
    });
    var view = new MapView_1.default({
        map: map,
        container: "viewDiv",
        center: [13.404954, 52.520008],
        zoom: 15
    });
});
//# sourceMappingURL=main-final.js.map