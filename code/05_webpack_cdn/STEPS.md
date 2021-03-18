# Using Webpack and the ArcGIS JS API via CDN
1. Keep the package.json in this folder and install the dependencies

```tsx
npm install
```

2. Copy the application (src/) from 04_widget_migration
3. Remove the "old" widgets from app/widgets, but keep the newly migrated ones
4. Remove the import of the "old" widget in App.ts and comment the code

```tsx
import TileLayer from "esri/layers/TileLayer";
import MapView from "esri/views/MapView";
import Map from "esri/Map";
import MyNewWidget from "./widgets/MyNewWidget/MyNewWidget";

export class App {
    public map: Map
    public view: MapView
    public housingLayer: TileLayer 

    public widget: MyWidget;
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

          this.view.when(() => {
            //   this.widget = new MyWidget({ addedString: 'this is added', view: this.view });
            //   this.widget.start().then(() => {
            //       console.log('app.started')
            //   })

              this.newWidget = new MyNewWidget({addedString: 'this is added', view: this.view})

              this.view.ui.add(this.newWidget, 'top-right')
          })
    }


}
```

5. Since webpack will inject the JS file for us into index.html, we can remove this portion

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <title>MapView sample, Js Api 4.18</title>
    <style>
        html,
        body,
        #viewDiv {
            padding: 0;
            margin: 0;
            height: 100%;
            width: 100%;
        }
    </style>
    <link rel="stylesheet" href="https://js.arcgis.com/4.18/esri/themes/light/main.css" />
    
</head>
<body>
    <script src="assets/scripts/dojo.js"></script>
    <script src="https://js.arcgis.com/4.18/"></script>
    <div id="viewDiv"></div>
  </body>

</html>
```

6. Try running webpack dev server and open the app on Port 8080

```tsx
npm start
``` 

7. Lets add our "old" widgets again. Create a folder src/assets/. This is the place where all of our static ressources go (scripts, images, videos, ...). In webpack.config.js we told webpack to simply copy this folder into our output. Therefore, this ressources will be in the final product, untouched by webpack. In this example, we act like we cannot change this library, thus we copy the widgets folder from the 00_sample_app into src/assets/libs. 

```tsx
src/
├─ assets/
│  ├─ libs/
│  │  ├─ widgets
│  │  │  ├─ ...
│  ├─ scripts/
│  │  ├─ dojo.js
```

8. We now need to configure our newly integrated (old) widgets. The concept is the same as we allways did with dojo. The file is just in another place ;-)
```tsx
// src/assets/scripts/dojo.js
(function () {
    var _a = window.location,
        pathname = _a.pathname,
        search = _a.search;
    var packagePath = pathname.substring(0, pathname.lastIndexOf("/"));
    var localeUrlParamRegex = /locale=([\w-]+)/;
    var dojoLocale = search.match(localeUrlParamRegex) ?
        RegExp.$1 :
        undefined;
    var config = {
        async: true,
        locale: dojoLocale,
        has: {
            "esri-promise-compatibility-deprecation-warnings": 0 
        },
        packages: [
            // Not neccessary anymore. This is handele by webpack
            // {
            //     name: "app",
            //     location: packagePath + "/app"
            // },
            // We still need this, because the widgets load content relative to themself outside webpack
            {
                name: "ttwidgets",
                location: packagePath + "/assets/libs/widgets"
            }
        ]
    };
    window["dojoConfig"] = config;
})();
```

9. We need to tell TS/webpack what this new `ttwidgets` module is and where it is to find. Several options

Webpack (recommended)
```tsx
resolve: {
  ...
  alias: {
    "ttwidgets": path.resolve(__dirname, './src/assets/libs/widgets')
  },
  ...
},
```
Or

TSconfig
```tsx
"paths": {"ttwidgets": <path>}
```

10. Create typings for your widgets. Create a new definition file `assets/libs/widgets/inde.d.ts` and declare your modules

```tsx
declare class Widget {
    start()
}

interface MyNewWidgetProperties {
    view: __esri.MapView,
    container?: HTMLElement
    addedString: string
  }
declare module 'ttwidgets/widget' {
    class MyWidget extends Widget {
        constructor(props: MyNewWidgetProperties)
    }
    export = MyWidget
}

interface MyNewWidget2Properties {
    view: __esri.MapView
  }
declare module 'ttwidgets/widget2' {
    class MyWidget2 extends Widget {
        constructor(props: MyNewWidget2Properties)
    }
    export = MyWidget2
}

declare module 'ttwidgets/_base/_widget' {
    class Base {
        getInnerHTML(string) 
    }
    export = Base
}
```

11. Import your widgets in App.ts

```tsx
import MyWidget from 'ttwidgets/widget'

...

this.widget = new MyWidget({ addedString: 'this is added', view: this.view });
this.widget.start().then(() => {
    console.log('app.started')
})
```

**Note**: Since we created a definition file, our widgets are now typed!