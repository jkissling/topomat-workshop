import { property, subclass } from "esri/core/accessorSupport/decorators";

import Accessor from "esri/core/Accessor";
import { Point } from "esri/geometry";
import Collection from "esri/core/Collection";
import SceneView from "esri/views/SceneView";

interface CustomClassProperties {
  view: SceneView;
  stops?: Collection<Point> | Point[];
}

@subclass("esri.demo.CustomClass")
export class CustomClass extends Accessor {
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

}
