define(["require", "exports", "tslib", "esri/widgets/Widget", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget", "./CustomClass"], function (require, exports, tslib_1, Widget_1, decorators_1, widget_1, CustomClass_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Widget_1 = tslib_1.__importDefault(Widget_1);
    var CSS = {
        base: "custom-widget",
    };
    var CustomWidget = /** @class */ (function (_super) {
        tslib_1.__extends(CustomWidget, _super);
        function CustomWidget(props) {
            var _this = _super.call(this) || this;
            _this.interacting = false;
            _this.viewModel = new CustomClass_1.CustomClass({ view: props.view, stops: props.stops });
            return _this;
        }
        CustomWidget.prototype.render = function () {
            var interacting = this.interacting;
            var _a = this.viewModel, active = _a.active, next = _a.next;
            return widget_1.tsx("div", { class: this.classes(CSS.base), style: "background: white" },
                widget_1.tsx("h3", null, "My Custom Widget"),
                widget_1.tsx("h4", null, "Interaction"),
                widget_1.tsx("div", null,
                    widget_1.tsx("span", null, "View is interacting: "),
                    widget_1.tsx("span", null, interacting)),
                widget_1.tsx("h4", null, "Stops"),
                widget_1.tsx("p", null,
                    widget_1.tsx("button", { onclick: next.bind(this.viewModel) }, "Next Stop")),
                widget_1.tsx("p", null,
                    widget_1.tsx("h5", null, "Current"),
                    widget_1.tsx("div", null,
                        "x: ", active === null || active === void 0 ? void 0 :
                        active.x),
                    widget_1.tsx("div", null,
                        "y: ", active === null || active === void 0 ? void 0 :
                        active.y)));
        };
        tslib_1.__decorate([
            decorators_1.property(),
            widget_1.renderable(["active"])
        ], CustomWidget.prototype, "viewModel", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf('viewModel.view')
        ], CustomWidget.prototype, "view", void 0);
        tslib_1.__decorate([
            decorators_1.aliasOf('view.interacting'),
            widget_1.renderable()
        ], CustomWidget.prototype, "interacting", void 0);
        CustomWidget = tslib_1.__decorate([
            decorators_1.subclass("esri.demo.CustomWidget")
        ], CustomWidget);
        return CustomWidget;
    }(Widget_1.default));
    exports.default = CustomWidget;
});
//# sourceMappingURL=CustomWidget-final.js.map