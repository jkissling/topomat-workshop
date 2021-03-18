var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/layers/TileLayer", "esri/views/MapView", "esri/Map", "./widgets/widget"], function (require, exports, TileLayer_1, MapView_1, Map_1, widget_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.App = void 0;
    TileLayer_1 = __importDefault(TileLayer_1);
    MapView_1 = __importDefault(MapView_1);
    Map_1 = __importDefault(Map_1);
    widget_1 = __importDefault(widget_1);
    var App = /** @class */ (function () {
        function App() {
            var _this = this;
            this.map = new Map_1.default({
                basemap: "topo-vector"
            });
            this.housingLayer = new TileLayer_1.default({
                url: "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
                id: "ny-housing",
                opacity: 0.9
            });
            this.map.add(this.housingLayer);
            this.view = new MapView_1.default({
                container: "viewDiv",
                map: this.map,
                zoom: 12,
                center: [-74, 40.5] // longitude, latitude
            });
            this.view.when(function () {
                _this.widget = new widget_1.default({ addedString: 'this is added', view: _this.view });
                _this.widget.start().then(function () {
                    console.log('app.started');
                });
            });
        }
        return App;
    }());
    exports.App = App;
});
//# sourceMappingURL=App.js.map