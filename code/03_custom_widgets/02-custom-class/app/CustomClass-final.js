define(["require", "exports", "tslib", "esri/core/accessorSupport/decorators", "esri/core/Accessor", "esri/geometry", "esri/core/Collection"], function (require, exports, tslib_1, decorators_1, Accessor_1, geometry_1, Collection_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomClass = void 0;
    Accessor_1 = tslib_1.__importDefault(Accessor_1);
    Collection_1 = tslib_1.__importDefault(Collection_1);
    var CustomClass = /** @class */ (function (_super) {
        tslib_1.__extends(CustomClass, _super);
        //--------------------------------------------------------------------------
        //
        //  Lifecycle
        //
        //--------------------------------------------------------------------------
        function CustomClass(props) {
            var _this = _super.call(this) || this;
            //--------------------------------------------------------------------------
            //
            //  Properties
            //
            //--------------------------------------------------------------------------
            //----------------------------------
            //  active
            //----------------------------------
            _this.active = null;
            //----------------------------------
            //  view
            //----------------------------------
            _this.view = null;
            _this.view = props.view;
            _this.stops = props.stops;
            return _this;
        }
        //--------------------------------------------------------------------------
        //
        //  Public Methods
        //
        //--------------------------------------------------------------------------
        CustomClass.prototype.next = function () {
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var stops, index, next;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            stops = this.stops;
                            index = stops.indexOf(this.active) + 1;
                            if (index === stops.length) {
                                index = 0;
                            }
                            next = stops.getItemAt(index);
                            return [4 /*yield*/, this.view.goTo(next)];
                        case 1:
                            _a.sent();
                            this._set('active', next);
                            return [2 /*return*/];
                    }
                });
            });
        };
        tslib_1.__decorate([
            decorators_1.property({ readOnly: true })
        ], CustomClass.prototype, "active", void 0);
        tslib_1.__decorate([
            decorators_1.property({
                // Define the type of the collection of Points
                // When the property is set with an array,
                // the collection constructor will automatically be called
                type: Collection_1.default.ofType(geometry_1.Point)
            })
        ], CustomClass.prototype, "stops", void 0);
        tslib_1.__decorate([
            decorators_1.property()
        ], CustomClass.prototype, "view", void 0);
        CustomClass = tslib_1.__decorate([
            decorators_1.subclass("esri.demo.CustomClass")
        ], CustomClass);
        return CustomClass;
    }(Accessor_1.default));
    exports.CustomClass = CustomClass;
});
//# sourceMappingURL=CustomClass-final.js.map