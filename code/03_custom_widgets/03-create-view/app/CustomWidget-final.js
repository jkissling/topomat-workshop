define(["require", "exports", "tslib", "esri/widgets/Widget", "esri/core/accessorSupport/decorators", "esri/widgets/support/widget"], function (require, exports, tslib_1, Widget_1, decorators_1, widget_1) {
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
            _this.view = props.view;
            return _this;
        }
        CustomWidget.prototype.render = function () {
            var interacting = this.interacting;
            return widget_1.tsx("div", { class: this.classes(CSS.base), style: "background: white" },
                widget_1.tsx("h3", null, "My Custom Widget"),
                widget_1.tsx("div", null,
                    widget_1.tsx("span", null, "View is interacting: "),
                    widget_1.tsx("span", null, interacting)));
        };
        tslib_1.__decorate([
            decorators_1.property()
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