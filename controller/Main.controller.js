let oKostl;

sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    'use strict';

    return Controller.extend("zc6.fi1401.mod.zc6fi1401.controller.Main", {
        onInit: function () {
            oKostl = this.getOwnerComponent().getModel('kostl');
            // const timeoutId = setInterval(() => {
            //     oKostl.refresh();
            //     console.log()
            // }, 5000);
        },
        onRefresh: function(){
            oKostl.refresh();
        }
    })
});