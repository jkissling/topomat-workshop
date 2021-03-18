define([
  "esri/widgets/Legend",
  "ttwidgets/_base/_widget",
  "dojo/_base/declare",
  "dojo/text!ttwidgets/widget.html",
  "dojo/domReady!"
], function (
  Legend,
  Widget,
  declare, template
) {
    return declare([Widget], {
        _i18n: {/*strings lan*/
            undefined: {
                title: 'widget:EN'
            },
            fr: {
                title: 'widget:FR'
            },
            de: {
                title: 'widget:DE'
            }
        },
        id: 'myWidget2',
        constructor(params) {
        },
        start(container, view) {
            return new Promise((resolve, reject) => {
                const legend = new Legend({
                    view:view,
                    basemapLegendVisible: true,
                    container:container
                })
                legend.when().then(() => {
                    resolve()
                })
            })
        }
    });
});
