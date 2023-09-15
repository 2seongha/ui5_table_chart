sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/viz/ui5/data/FlattenedDataset",
  "sap/viz/ui5/controls/common/feeds/FeedItem"

], function (Controller, FlattenedDataset, FeedItem) {
  'use strict';

  return Controller.extend("zc6.fi1401.mod.zc6fi1401.controller.LineChart", {
    onInit: function () {
      const oVizFrame = this.getView().byId("idLineChart");
      const oDataset = new FlattenedDataset({
        dimensions: [{
          name: "코스트센터 이름",
          value: "{ktext}"
        }, {
          name: "통화키",
          value: "{waers}"
        }],

        measures: [{
          name: "합",
          value: "{dmbtr_sum}"
        },
        {
          name: "평균",
          value: "{dmbtr_avg}"
        }
        ],

        data: {
          path: "kostl>/KostlSet14"
        }
      });
      oVizFrame.removeAllFeeds();
      oVizFrame.setDataset(oDataset);

      oVizFrame.setVizProperties({
        plotArea: {
          colorPalette: ['#2F6497', '#5899DA'],
          dataLabel: {
            visible: true
          },

          window: {
            start: "firstDataPoint",
            end: "lastDataPoint"
          },
        },
        legend: {
          title: {
            visible: false
          }
        },
        title: {
          text: "Cost Center"
        }
      });

      oVizFrame.addFeed(new FeedItem({
        'uid': "categoryAxis",
        'type': "Dimension",
        'values': ["코스트센터 이름", "통화키"]
      }));

      oVizFrame.addFeed(new FeedItem({
        'uid': "valueAxis",
        'type': "Measure",
        'values': ["합","평균"]
      }));
    }
  })
});