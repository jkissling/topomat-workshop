# Using a Viewmodel

1.  Since we already wrote a class (CustomClass) which consists of some action/logic, we can use this as our viewmodel. Thus, let's create a property for our viewmodel and in the constructor create an instance. Don't forget to adjust the widgets constructor properties

```tsx
interface CustomWidgetProperties {
    view: SceneView
    stops: Point[]
}
```

```tsx
@property()
public viewModel: CustomClass;
```

```tsx
constructor(props: CustomWidgetProperties) {
    super()
    this.viewModel = new CustomClass({ view: props.view, stops: props.stops })
}
```

2. Since we dont need to hold a reference to the view seperately, we can make use of the @aliasOf-Decorator again

```tsx
@aliasOf('viewModel.view')
public view: SceneView;
```

3. We want to functionalities of the viewmodel in our View: A button to go to the next stop and a display of the current stops x/y

```tsx
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
```

At this point, we need to tell the api, that a certain property in our viewmodel is renderable. Thus, we add the decorator to our viewmodel-Property

```tsx
@property()
@renderable(["active"])
public viewModel: CustomClass;
```