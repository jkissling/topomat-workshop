define([
  "dojo/dom-construct",
  "ttwidgets/_base/_widget",
  "dojo/_base/declare",
  "dojo/text!./widget.html",
  "dojo/domReady!"
], function (
  domConstruct,
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
        id: 'myWidget',
        constructor(params) {
            this.addedString = params.addedString;
        },
        start() {
            return new Promise((resolve, reject) => {
                domConstruct.create('link', {
                    onload: function () {
                        this.getInnerHTML(this.addedString).then((str) => {
                            this.contentDiv = domConstruct.create('div', { className: 'widgetCSS', innerHTML: template.replace('$str', str) }, document.body)
                        })
                        this.on('innerHTML-set', (e) => {
                            require(["ttwidgets/widget2"], (Widget2) => {
                                console.log(e.value)
                                let widget2 = new Widget2()
                                widget2.start(this.contentDiv).then(() => {
                                    resolve();
                                })
                            })
                        })
                    }.bind(this), rel: "stylesheet", href: 'widgets/widget.css'
                }, document.head);
            }, () => { reject() })
        }
    });
});
