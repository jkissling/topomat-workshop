define([
  "dojo/Evented",
  "dojo/_base/declare",
  "dojo/domReady!"
], function (
    Evented,
  declare
) {
    return declare([Evented], {
        constructor() {
            this.event = new CustomEvent('_customEvent', { detail: { source: this } });
            this.innerHTML = 'setting innerHTML'
        },
        getInnerHTML(addedString) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    this.event.value = this.innerHTML +' : '+ addedString
                    resolve(this.event.value)
                    setTimeout(() => {
                        this.emit('innerHTML-set', this.event)
                    }, 2000)
                },1000)
            }, () => { reject() })
        }
    });
});
