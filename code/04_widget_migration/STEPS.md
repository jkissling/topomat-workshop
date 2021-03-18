# Migrate the Sample Widgets
1. Copy the application you migrated in 02_typescript_migration into this folder
2. Make sure, your tsconfig file knows how to handle tsx and decorators
```tsx
{
  "compilerOptions": {
    "target": "es5",                          
    "module": "amd",                     
    "lib": ["dom", "es2015.promise", "es5", "es6", "ES2019", "DOM"],                             
    "jsx": "react",                     
    "jsxFactory": "tsx",
    "sourceMap": true,                     
    "strict": true,                           
    "noImplicitAny": false,                 
    "strictPropertyInitialization": false,  
    "moduleResolution": "node",            
    "esModuleInterop": true,                   
    "resolveJsonModule": true,
    "experimentalDecorators": true,
  }
}
``` 

3. Crate a new folders and files in app/widgets for your new Widgets
```
app/widgets/MyNewWidget/MyNewWidget.tsx
app/widgets/MyNewWidget2/MyNewWidget2.tsx
```

4. Create a new Widget by extending the esri/widgets/Widget class (We saw this in 03_custom_widgets/03_create_view) and add your Widgets logic

```tsx
import { subclass } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { tsx } from "esri/widgets/support/widget";
import MyNewWidget2 from '../MyNewWidget2/MyNewWidget2';

interface MyNewWidgetProperties {
  view: __esri.MapView,
  container?: HTMLElement
  addedString: string
}

@subclass("esri.widgets.MyNewWidget")
export default class MyNewWidget extends Widget {

  public myNewWidget2: MyNewWidget2
  constructor(private props: MyNewWidgetProperties) {
    super(props)
    this.myNewWidget2 = new MyNewWidget2({view: this.props.view})
  }

  render() {
    const STYLE = {
      padding: "10px",
      color: "red",
      fontWeight: "bold",
      backgroundColor: 'white'
    }
  
    const {addedString} = this.props

    return (
        <div class="my-new-widget" styles={STYLE}>
          {addedString}
          {this.myNewWidget2.render()}
        </div>
    );
  }
}
```

```tsx
import { subclass, property } from "esri/core/accessorSupport/decorators";
import Widget from "esri/widgets/Widget";
import { renderable, tsx } from "esri/widgets/support/widget";
import Legend from "esri/widgets/Legend";

interface MyNewWidget2Properties {
  view: __esri.MapView
}

@subclass("esri.widgets.MyNewWidget2")
export default class MyNewWidget2 extends Widget {

  public legend: Legend;
  public legendNode: HTMLDivElement;

  constructor(private props: MyNewWidget2Properties) {
    super()
    this.legend = new Legend({
      view: this.props.view,
      basemapLegendVisible: true,
    })
  }

  render() {
    return (
      <div data-node-ref="legendNode">
        {this.legend.render()}
      </div>
    );
  }
}
```

5. Import your widget in App.ts and create a new Instance of it. Use the View UI to place it nicely.

```tsx
import MyNewWidget from "./widgets/MyNewWidget/MyNewWidget";

...

this.newWidget = new MyNewWidget({addedString: 'this is added', view: this.view})
this.view.ui.add(this.newWidget, 'top-right')
```