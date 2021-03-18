import { subclass } from "@arcgis/core/core/accessorSupport/decorators";
import Widget from "@arcgis/core/widgets/Widget";
import { tsx } from "@arcgis/core/widgets/support/widget";
import MyNewWidget2 from '../MyNewWidget2/MyNewWidget2';
import './MyNewWidget.scss';


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
    
  
    const {addedString} = this.props

    return (
        <div class="my-new-widget">
          {addedString}
          {this.myNewWidget2.render()}
        </div>
    );
  }
}