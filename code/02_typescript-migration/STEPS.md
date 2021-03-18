# Migrate 00_sample_app to Typescript

1. Create a package.json

```tsx
npm init
```

2. Install TS and the arcgis-js-api types

```tsx
npm install –save-dev typescript @types/arcgis-js-api
```

**Note**: Both dependencies are only used during development. Thus, we use the --save-dev flag. This has no effect on the final app, but helps for a better understanding of dependencies

3. Create a tsconfig.json so we can configure the compiler

```tsx
npx tsc --init
```

4. Adjust tsconfig

```tsx
"lib": ["dom", "es2015.promise", "es5", "es6"] // or higher

"moduleResolution": "node" // if not already set
```

5. (optional) Create a start script in package.json for convenience reasons. By calling `npm start` the TS-compiler, installed in the workspace, is started up in watch mode.

```tsx
"scripts": {
    "start": "tsc --watch -p ."
}
```

6. Create a folder structur (this is up to the developers preference tho)

```tsx
project/ // Your Project folder
├─ node_modules/ // Dependencies, installed through npm
├─ src/ // Your app
│  ├─ app/
│  │  ├─ widgets/
│  │  ├─ App.ts
│  ├─ dojo.js
│  ├─ index.ts
│  ├─ index.html
├─ package.json // Project definition
├─ tsconfig.json // Compiler options
```

**Note**: You might also want to create the additional files `index.ts` and `app/App.ts`. App is the main file of you Application, whereas index.ts is meant to perform actions before you initialize your app (e.g. setting globals, load runtime configs...)

7. Create a new class in App.ts and implement the logic of the sample apps JS in index.html

```tsx
import TileLayer from "esri/layers/TileLayer";
import MapView from "esri/views/MapView";
import Map from "esri/Map";
import MyWidget from './widgets/widget'

export class App {
    public map: Map
    public view: MapView
    public housingLayer: TileLayer 

    public widget: MyWidget;

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
    }
}
```

8. Use the index.html of the sample application, but whithout the script section

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
    <title>Typescript Migration</title>
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
    <script src="dojo.js"></script>
    <script src="https://js.arcgis.com/4.18/"></script>
    <script>
      require(['./index.js']);
    </script>
    <div id="viewDiv"></div>
  </body>

</html>

```

9. Create an instance of your application in index.ts

```tsx
import { App } from "./app/App";

function start() {
    new App()
}
start()
```


10. Copy the widgets Folder of the sample app into the app/ folder. Since we changed the structur a bit, we also need to adjust the paths. Since we use TS to import the widgets, we can omit their `ttwidgets`-package

```tsx
// dojo.js
packages: [
   {
       name: "app",
       location: packagePath + "/app"
   }
]
```

```tsx
// Change paths in widget.js
"app/widgets/_base/_widget"

"app/widgets/widget2"

'app/widgets/widget.css'
```

```tsx
// Change paths in widget2.js
"app/widgets/_base/_widget",
```

**Note**: I also changed the constructor params of Widget and Widget2 to take the view. Having the view directly on the window seemed a bit crazy to me :-P

11. Import the MyWidget into your App.ts

```tsx
import MyWidget from './widgets/widget'

this.view.when(() => {
    this.widget = new MyWidget({ addedString: 'this is added', view: this.view });
    this.widget.start().then(() => {
        console.log('app.started')
    })
})
```