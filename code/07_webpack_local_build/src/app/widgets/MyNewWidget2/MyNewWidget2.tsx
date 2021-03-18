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