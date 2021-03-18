# Writing a Widget

1.  Let's start off by adding some boilerplate for creating a widget.

```tsx
import Widget from "esri/widgets/Widget";
import { subclass } from "esri/core/accessorSupport/decorators";
import { tsx } from "esri/widgets/support/widget";

@subclass("esri.demo.CustomWidget")
export default class CustomWidget extends Widget {
    
}

```

This is the minimum required to create a widget in 4x. All we're doing here is creating a class that extends `esri/widgets/Widget`

2.  We now add a render method to our widget. 

```tsx
  render() {
        return <div style="background: white">
            <h3>My Custom Widget</h3>
        </div>
    }
```

3.  We can now already create an Instance of our Widget and add it to our application

```tsx
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

const customWidget = new CustomWidget()
view.ui.add(customWidget, 'top-right')

```

4. To add some action, we want our widget to display if the view is currently interacting. To do so, we need to pass the view to the widget and create some properties

```tsx
interface CustomWidgetProperties {
    view: SceneView
}
```

```tsx
@property() 
public view: SceneView;

@aliasOf('view.interacting') 
@renderable()
private interacting = false;
```

```tsx
constructor(props: CustomWidgetProperties) {
  super()
  this.view = props.view
}
```

```tsx
render() {
        const {interacting} = this

        return <div class={this.classes(CSS.base)} style="background: white">
            <h3>My Custom Widget</h3>
            <h4>Interaction</h4>
            <div>
                <span>View is interacting: </span>
                <span>{interacting}</span>
                </div>
        </div>
    }
```

As we can see, we use the @aliasOf-Decorator. It helps us, to write cleaner code. Furthermore, we use the @renderable-Decorator, to tell the API that the UI shall rerender, when the property changes.

5. Pass the view to the widget and start interacting with it!
```tsx
const customWidget = new CustomWidget({view})
```
