var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "../MyNewWidget2/MyNewWidget2"], function (require, exports, decorators_1, Widget_1, widget_1, MyNewWidget2_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = __importDefault(Widget_1);
    MyNewWidget2_1 = __importDefault(MyNewWidget2_1);
    var MyNewWidget = /** @class */ (function (_super) {
        __extends(MyNewWidget, _super);
        function MyNewWidget(props) {
            var _this = _super.call(this, props) || this;
            _this.props = props;
            _this.myNewWidget2 = new MyNewWidget2_1.default({ view: _this.props.view });
            return _this;
        }
        MyNewWidget.prototype.render = function () {
            var STYLE = {
                padding: "10px",
                color: "red",
                fontWeight: "bold",
                backgroundColor: 'white'
            };
            var addedString = this.props.addedString;
            return (widget_1.tsx("div", { class: "my-new-widget", styles: STYLE },
                addedString,
                this.myNewWidget2.render()));
        };
        MyNewWidget = __decorate([
            decorators_1.subclass("esri.widgets.HelloWorld")
        ], MyNewWidget);
        return MyNewWidget;
    }(Widget_1.default));
    exports.default = MyNewWidget;
});
//# sourceMappingURL=MyNewWidget.js.map