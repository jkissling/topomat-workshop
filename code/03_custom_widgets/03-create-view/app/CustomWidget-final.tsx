import Widget from "esri/widgets/Widget";
import { aliasOf, property, subclass } from "esri/core/accessorSupport/decorators";
import { renderable, tsx } from "esri/widgets/support/widget";
import SceneView from "esri/views/SceneView";

const CSS = {
    base: "custom-widget",
};


interface CustomWidgetProperties {
    view: SceneView
}

@subclass("esri.demo.CustomWidget")
export default class CustomWidget extends Widget {


    @property() 
    public view: SceneView;
    
    @aliasOf('view.interacting') 
    @renderable()
    private interacting = false;

    constructor(props: CustomWidgetProperties) {
        super()
        this.view = props.view
    }

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
}