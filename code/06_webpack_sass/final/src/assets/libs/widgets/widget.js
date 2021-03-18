// Decleration File index.d.ts defines this JS module
// Since this Module loads additional ressources, we moved it to our static folder, because ressources loaded at runtime need to be available in the output
// since this module is called ttwidgets and is outside our regular app/ dir, we created an alias in webpack.config, so that webpack finds it
// Additionally, we need to register it with dojo, because this module imports ressources (at runtime) relative to itself. This would be hard to handle with webpack
// Furthermore, there are absolute paths in the code, which cannot be resolve otherwise. Thus, some changes were neccessary
// --> html import relative to package
// --> Inline css import relative to host root

// Eventhoug we got this running, this kinda removes the benefits of wepack, because we do lots of the loading ourself at runtime
// This is definitely not a recommended way

define([
  "dojo/dom-construct",
  "ttwidgets/_base/_widget",
  "dojo/_base/declare",
  "dojo/text!ttwidgets/widget.html",
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
            this.view = params.view
        },
        start() {
            return new Promise((resolve, reject) => {
                domConstruct.create('link', {
                    onload: () => {
                        this.getInnerHTML(this.addedString).then((str) => {
                            this.contentDiv = domConstruct.create('div', { className: 'widgetCSS', innerHTML: template.replace('$str', str) }, document.body)
                        })
                        const _this = this
                        this.on('innerHTML-set', (e) => {
                            require(["ttwidgets/widget2"], (Widget2) => {
                                console.log(e.value)
                                let widget2 = new Widget2()
                                widget2.start(_this.contentDiv, _this.view).then(() => {
                                    resolve();
                                })
                            })
                        })
                    }, rel: "stylesheet", href: 'assets/libs/widgets/widget.css'
                }, document.head);
            }, () => { reject() })
        }
    });
});
