sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/data/FlattenedDataset",
    "sap/viz/ui5/controls/common/feeds/FeedItem"

], function (Controller, FlattenedDataset, FeedItem) {
    'use strict';

    return Controller.extend("zc6.fi1401.mod.zc6fi1401.controller.DonutChart", {
        onInit: function () {

            // Set Viz Data Set
            const oVizFrame = this.getView().byId("idPieChart");

            const oDataset = new FlattenedDataset({
                // Pie Section 
                dimensions: [{
                    name: "코스트센터 이름",
                    value: "{ktext}"
                },
                {
                    name: "통화키",
                    value: "{waers}"
                }],

                // Pie Section Value 
                measures: [{
                    name: "합",
                    value: "{dmbtr_sum}"
                }
                ],

                // Pie Data Location
                data: {
                    path: "kostl>/KostlSet14"
                }
            });
            oVizFrame.setDataset(oDataset);

            //Pie properties
            oVizFrame.setVizProperties({
                title: {
                    text: "Cost Center"
                },
                plotArea: {
                    colorPalette: ['#31BB74', '#36895D', '#2A724A', '#AEA792'],
                    drawingEffect: "glossy"
                }
            });

            let feedSize = new FeedItem({
                uid: "size",
                type: "Measure",
                values: ["합"]
            });
            let feedColor = new FeedItem({
                uid: "color",
                type: "Dimension",
                values: ["코스트센터 이름","통화키"]
            });
            oVizFrame.addFeed(feedSize);
            oVizFrame.addFeed(feedColor);
        }
    })
});