# Writing a class

1.  Let's start off by adding some boilerplate for creating a module or class.

```tsx
import { subclass } from "esri/core/accessorSupport/decorators";

import Accessor from "esri/core/Accessor";

@subclass("esri.demo.CustomClass")
export class CustomClass extends Accessor {

}

```

This is the minimum required to create a class in 4x. All we're doing here is creating a class that extends `esri/core/Accessor`, which is the base of all 4x classes.

2.  We'll now add the properties we described earlier in our design. We'll do this with the `property` decorator.

```tsx
  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------------

  //----------------------------------
  //  active
  //----------------------------------

  @property({ readOnly: true })
  readonly active: Point = null;

  //----------------------------------
  //  stops
  //----------------------------------

  @property({
    // Define the type of the collection of Points
    // When the property is set with an array,
    // the collection constructor will automatically be called
    type: Collection.ofType(Point)
  }) stops: Collection<Point>;

  //----------------------------------
  //  view
  //----------------------------------

  @property() view: SceneView = null;
```

TypeScript will complain about references to classes and utilities we haven't imported, so let's go ahead and fix that.

```tsx
import { property, subclass } from "esri/core/accessorSupport/decorators";

import { Point } from "esri/geometry";
import Collection from "esri/core/Collection";
import SceneView from "esri/views/SceneView";

```

We can leverage TypeScript and type the constructor argument to ensure our class is created with the correct properties. We'll define an interface for these properties

```tsx
interface CustomClassProperties {
  view: SceneView;
  stops?: Collection<Point> | Point[];
}
```

and type the constructor arguments

```tsx
//--------------------------------------------------------------------------
//
//  Lifecycle
//
//--------------------------------------------------------------------------

constructor(props?: CustomClassProperties) {
  super();
}
```

We've now implemented the properties from our design. Properties defined this way can be watched for changes and initialized by a constructor object.

3.  Let's update the class to set the initial props

```tsx
//--------------------------------------------------------------------------
//
//  Lifecycle
//
//--------------------------------------------------------------------------

  constructor(props?: CustomClassProperties) {
    super();
    this.view = props.view
    this.stops = props.stops as any
    
  }
```



4.  Next up, is `next`. 🙃 This method will change the `active` property with the next available one from `stops`

```tsx
//--------------------------------------------------------------------------
//
//  Public Methods
//
//--------------------------------------------------------------------------

public async next() {
    const {stops} = this;

    let index = stops.indexOf(this.active) + 1;

    if (index === stops.length) {
      index = 0;
    }

    const next = stops.getItemAt(index);
    await this.view.goTo(next)
    this._set('active', next)
  }
```
We decide to only set the new stop as active, if the animation (goTo) has ended. Therefore, we `await` the promise returned by goTo().

**Note** we use `_set` to internally set the value of read-only properties.

We have now implemented our class and we can test it in our demo page.

5.  We can now update the application from the previous demo and bring in our `CustomClass`.

```ts
import { Point } from "esri/geometry";
import Map  from "esri/Map";
import SceneView from "esri/views/SceneView";

import {CustomClass} from "./CustomClass";

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
const customClass = new CustomClass({ view, stops });

// show next stop every 10 seconds
setInterval(() => customClass.next(), 10000);
// log active stops
customClass.watch('active', console.log)

```
