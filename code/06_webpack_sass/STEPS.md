# Using Sass
1. Copy the application from 05_webpack_cdn
2. Add SASS functionality to webpack, by installing some sass relevant tools (you can also just keep the package.json in this directory and npm install)

```tsx
npm install --save-dev node-sass resolve-url-loader sass-loader
```

3. Configure webpack to use sass-loader for .scss files

```tsx
module: {
    ...
    rules: [
        ...
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "resolve-url-loader",
              options: {
                includeRoot: true
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          exclude: /src\/assets/
        },
        ...
    ]
}
```

4. Add a folder src/css and create a `main.scss` file which will be out entry point to styling and an `esri.scss` which will control which styles to include from the API. Don't forget to include `main.scss` as entry point in the webpack configuration.

```css
/* main.scss */
@import 'esri';
```

```tsx
/* webpack.config.js */
entry: {
  index: ["./src/css/main.scss","./src/index.ts"]
}
```

```scss
/* esri.scss */
/* Override for esri/themes/base/icons/style.scss */
$icomoon-font-path: "~arcgis-js-api/assets/esri/themes/base/icons/fonts" !default; 
$calcite-fonts-path: "~arcgis-js-api/assets/esri/themes/base/fonts/fonts/" !default;

/* Widgets (sorted alphabetically)  */
$include_AreaMeasurement2D: false !default;
$include_AreaMeasurement3D: false !default;
$include_Attachments: false !default;
$include_Attribution: false !default;
$include_BasemapGallery: false !default;
$include_BasemapLayerList: false !default;
$include_BasemapToggle: false !default;
$include_BinaryColorSizeSlider: false !default;
$include_Bookmarks: false !default;
$include_BuildingExplorer: false !default;
$include_ButtonMenu: false !default;
$include_ClassedColorSlider: false !default;
$include_ClassedSizeSlider: false !default;
$include_Compass: false !default;
$include_ColorSizeSlider: false !default;
$include_ColorSlider: false !default;
$include_CoordinateConversion: false !default;
$include_DatePicker: false !default;
$include_Daylight: false !default;
$include_Directions: false !default;
$include_DirectLineMeasurement3D: false !default;
$include_DistanceMeasurement2D: false !default;
$include_Editor: false !default;
$include_ElevationProfile: false !default;
$include_Expand: false !default;
$include_Feature: false !default;
$include_FeatureContent: false !default;
$include_FeatureMedia: false !default;
$include_FeatureForm: false !default;
$include_FeatureTable: false !default;
$include_FeatureTemplates: false !default;
$include_Grid: false !default;
$include_HeatmapSlider: false !default;
$include_Histogram: false !default;
$include_HistogramRangeSlider: false !default;
$include_IdentityForm: false !default;
$include_IdentityModal: false !default;
$include_ItemList: false !default;
$include_LayerList: true !default;
$include_Legend: true !default;
$include_LineOfSight: false !default;
$include_Measurement: false !default;
$include_NavigationToggle: false !default;
$include_OpacitySlider: false !default;
$include_Print: false !default;
$include_Popup: false !default;
$include_ScaleBar: false !default;
$include_ScaleRangeSlider: false !default;
$include_Search: false !default;
$include_SizeSlider: false !default;
$include_Sketch: false !default;
$include_Slice: false !default;
$include_Slider: false !default;
$include_Spinner: false !default;
$include_Swipe: false !default;
$include_TableList: false !default;
$include_TimePicker: false !default;
$include_TimeSlider: false !default;
$include_Zoom: false !default;

/* Load the ArcGIS Styles  */
@import "~arcgis-js-api/assets/esri/themes/light/main";
```



5. Add a Widget to your app

```tsx
import LayerList from "esri/widgets/LayerList";

...

const layerList = new LayerList({
    view: this.view
})
this.view.ui.add(layerList, 'bottom-left')
```

6. Toggle styles on/off to see what happens