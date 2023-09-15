sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/viz/ui5/data/FlattenedDataset",
  "sap/viz/ui5/controls/common/feeds/FeedItem"

], function (Controller, FlattenedDataset, FeedItem) {
  'use strict';

  return Controller.extend("zc6.fi1401.mod.zc6fi1401.controller.BarChart", {
    onInit: function () {
      const oModel = this.getView().getModel();
      const oVizFrame = this.getView().byId("idColumnChart");
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
      oVizFrame.setModel(oModel);

      oVizFrame.setVizProperties({
        plotArea: {
          colorPalette: ['#13A4B4', '#ED4A7B'],
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
          //visible : false,
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
        'values': ["합"]
      }));

      oVizFrame.addFeed(new FeedItem({
        'uid': "valueAxis",
        'type': "Measure",
        'values': ["평균"]
      }));
    }
  })
});