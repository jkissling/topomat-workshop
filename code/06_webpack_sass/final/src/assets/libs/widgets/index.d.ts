declare class Widget {
    start()
}

interface MyNewWidgetProperties {
    view: __esri.MapView,
    container?: HTMLElement
    addedString: string
  }
declare module 'ttwidgets/widget' {
    class MyWidget extends Widget {
        constructor(props: MyNewWidgetProperties)
    }
    export = MyWidget
}

interface MyNewWidget2Properties {
    view: __esri.MapView
  }
declare module 'ttwidgets/widget2' {
    class MyWidget2 extends Widget {
        constructor(props: MyNewWidget2Properties)
    }
    export = MyWidget2
}

declare module 'ttwidgets/_base/_widget' {
    class Base {
        getInnerHTML(string) 
    }
    export = Base
}