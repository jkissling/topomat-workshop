import Widget from "esri/widgets/Widget";
import { aliasOf, property, subclass } from "esri/core/accessorSupport/decorators";
import { renderable, tsx } from "esri/widgets/support/widget";
import SceneView from "esri/views/SceneView";
import { CustomClass } from "./CustomClass";
import { Point } from "esri/geometry";

const CSS = {
    base: "custom-widget",
};


interface CustomWidgetProperties {
    view: SceneView
    stops: Point[]
}

@subclass("esri.demo.CustomWidget")
export default class CustomWidget extends Widget {

    @property()
    @renderable(["active"])
    public viewModel: CustomClass;

    @aliasOf('viewModel.view')
    public view: SceneView;

    @aliasOf('view.interacting')
    @renderable()
    private interacting = false;

    constructor(props: CustomWidgetProperties) {
        super()
        this.viewModel = new CustomClass({ view: props.view, stops: props.stops })
    }

    render() {
        const { interacting } = this
        const { active, next } = this.viewModel

        return <div class={this.classes(CSS.base)} style="background: white">
            <h3>My Custom Widget</h3>
            <h4>Interaction</h4>
            <div>
                <span>View is interacting: </span>
                <span>{interacting}</span>
            </div>
            <h4>Stops</h4>
            <p>
                <button onclick={next.bind(this.viewModel)}>Next Stop</button>
            </p>
            <p>
                <h5>Current</h5>
                <div>x: {active?.x}</div>
                <div>y: {active?.y}</div>
            </p>
        </div>
    }
}