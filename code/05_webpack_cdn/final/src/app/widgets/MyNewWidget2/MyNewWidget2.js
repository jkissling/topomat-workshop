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
define(["require", "exports", "esri/core/accessorSupport/decorators", "esri/widgets/Widget", "esri/widgets/support/widget", "esri/widgets/Legend"], function (require, exports, decorators_1, Widget_1, widget_1, Legend_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = __importDefault(Widget_1);
    Legend_1 = __importDefault(Legend_1);
    var MyNewWidget2 = /** @class */ (function (_super) {
        __extends(MyNewWidget2, _super);
        function MyNewWidget2(props) {
            var _this = _super.call(this) || this;
            _this.props = props;
            _this.legend = new Legend_1.default({
                view: _this.props.view,
                basemapLegendVisible: true,
            });
            return _this;
        }
        MyNewWidget2.prototype.render = function () {
            return (widget_1.tsx("div", { "data-node-ref": "legendNode" }, this.legend.render()));
        };
        MyNewWidget2 = __decorate([
            decorators_1.subclass("esri.widgets.HelloWorld")
        ], MyNewWidget2);
        return MyNewWidget2;
    }(Widget_1.default));
    exports.default = MyNewWidget2;
});
//# sourceMappingURL=MyNewWidget2.js.map