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