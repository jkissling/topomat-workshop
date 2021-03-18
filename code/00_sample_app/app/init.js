define([
  "ttwidgets/widget",
  "dojo/_base/declare",
  "dojo/domReady!"
], function (
   MyWidget,
    declare
) {
    _view.when().then(() => {
        var widget = new MyWidget({ addedString: 'this is added' });
        widget.start().then(() => {
            console.log('app.started')
        })
    })
});

