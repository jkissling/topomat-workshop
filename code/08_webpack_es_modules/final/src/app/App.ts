import TileLayer from "@arcgis/core/layers/TileLayer";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import MyNewWidget from "./widgets/MyNewWidget/MyNewWidget";
import LayerList from "@arcgis/core/widgets/LayerList";

export class App {
    public map: Map
    public view: MapView
    public housingLayer: TileLayer 

    public newWidget: MyNewWidget;

    constructor() {
        this.map = new Map({
            basemap: "topo-vector"
          });
  
          this.housingLayer = new TileLayer({
              url:
                "https://tiles.arcgis.com/tiles/nGt4QxSblgDfeJn9/arcgis/rest/services/New_York_Housing_Density/MapServer",
              id: "ny-housing",
              opacity: 0.9
          });
          this.map.add(this.housingLayer)

          this.view = new MapView({
            container: "viewDiv",
            map: this.map,
            zoom: 12,
            center: [-74,40.5] // longitude, latitude
          });

          const layerList = new LayerList({
            view: this.view
          })

          this.view.ui.add(layerList, 'bottom-left')

          this.view.when(() => {
              this.newWidget = new MyNewWidget({addedString: 'this is added', view: this.view})

              this.view.ui.add(this.newWidget, 'top-right')
          })
    }


}