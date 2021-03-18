# TypeScript + JS API Setup

1.  Go to the project directory


```
cd <project-directory>
```

1.  Initialize project with defaults (for demo purposes)


```
npm init --yes
```

1.  Install dependencies and JS API typings


```
npm install --save-dev typescript @types/arcgis-js-api
```

1.  Initialize TypeScript for the current project


```
tsc --init
```

1.  The previous step creates a config file (`tsconfig.json`) for the TypeScript compiler with defaults and lists all possible options. For our demo, well copy over base configuration options from the [ArcGIS JS API TypeScript setup guide page](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html#compile-typescript)


```json
{
  "compilerOptions": {
    "module": "amd",
    "lib": ["ES2019", "DOM"],
    "noImplicitAny": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "jsx": "react",
    "jsxFactory": "tsx",
    "target": "ES5",
    "experimentalDecorators": true,
    "preserveConstEnums": true,
    "suppressImplicitAnyIndexErrors": true,
    "importHelpers": true,
    "moduleResolution": "node"

  },
  "include": [
    "./app/*"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

1.  Let's build our app by running the TypeScript compiler and enabling the `watch` flag


```
tsc --watch -p .
```

Hint: Create a start script in package.json, so you can simply call npm start

1.  Let's update `main.ts` in the `app` directory


```ts
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
```

You've now built your first TypeScript application! 🎉
