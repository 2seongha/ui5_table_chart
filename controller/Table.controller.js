let aDelete = [],
  aDeleteEntry = [],
  aFilter = [],
  oView,
  oTable, oKostl,
  oMode;
sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/core/CustomData"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, MessageToast, MessageBox, CustomData) {
    "use strict";

    return Controller.extend("zc6.fi1401.mod.zc6fi1401.controller.Table", {

      onInit: function () {
        oView = this.getView();
        oTable = oView.byId("myTable");
        oKostl = this.getOwnerComponent().getModel('kostl');

        oMode = new sap.ui.model.json.JSONModel({
          mode: false,
          classname: 'editfalse'
        });

        oTable.setModel(oMode, 'mode');
      },
      onSave: function () {

        const oTable = this.byId("myTable");
        const oModel = oTable.getModel();
        const aCells = this.byId("lisItemForTable").clone().mAggregations.cells;

        MessageBox.confirm("저장 하시겠습니까?", {
          title: "알림",
          onClose: function (oAction) {
            if (oAction === "네") {
              if (aDelete.length > 0) {
                for (let i = 0; i < aDelete.length; i++) {
                  oModel.remove(aDelete[i]);
                }
              }
              if (aDeleteEntry.length > 0) {
                oModel.resetChanges(aDeleteEntry, false, true);
              }
              oModel.submitChanges();
              MessageToast.show("저장 완료")
            } else {
              oModel.resetChanges(null, false, true);
            }
            aDelete = [];
            aDeleteEntry = [];
            oTable.bindItems({
              path: "/Dom14_01Set",
              sorter: new sap.ui.model.Sorter('Belnr'),
              template: new sap.m.ColumnListItem({
                cells: [
                  ...aCells
                ]
              })
            });
            var oBinding = oTable.getBinding("items");
            oBinding.filter(aFilter);
          },
          styleClass: "",
          actions: ["네", "아니오"],
          emphasizedAction: "네",
          initialFocus: null,
          textDirection: sap.ui.core.TextDirection.Inherit
        });
      },
      onAdd: function () {

        const oModel = oTable.getModel();
        const onChange = this.onLiveChange;
        const aCells = this.byId("lisItemForTable").clone().mAggregations.cells;

        const oNewEntry = oModel.createEntry('/Dom14_01Set', {
          properties: {
            Bukrs: '',
            Belnr: '',
            Gjahr: '',
            Bktxt: '',
            Blart: '',
            Mwskz: '',
            Kostl: '',
            Process: '',
            Zcheck: false,
            Dmbtr: '',
            Waers: '',
          }
        })

        const oDataTemplate1 = new CustomData({ key: "editable", value: "{mode>/classname}", writeToDom: true });
        const oDataTemplate2 = new CustomData({ key: "editable", value: "{mode>/classname}", writeToDom: true });
        const oDataTemplate3 = new CustomData({ key: "editable", value: "{mode>/classname}", writeToDom: true });
        const oColumn = new sap.m.ColumnListItem({
          cells: [
            new sap.m.Input({ value: "{Bukrs}", liveChange: onChange, editable: '{mode>/mode}' }).addStyleClass('myCustomInput').addCustomData(oDataTemplate1),
            new sap.m.Input({ value: "{Belnr}", liveChange: onChange, editable: '{mode>/mode}' }).addStyleClass('myCustomInput').addCustomData(oDataTemplate2),
            new sap.m.Input({ value: "{Gjahr}", liveChange: onChange, editable: '{mode>/mode}' }).addStyleClass('myCustomInput').addCustomData(oDataTemplate3),
            aCells[3], aCells[4], aCells[5], aCells[6], aCells[7], aCells[8], aCells[9], aCells[10], aCells[11]
          ]
        })

        oColumn.setBindingContext(oNewEntry);
        oTable.addItem(oColumn);
      },
      onDelete: function () {

        if (!oTable.getSelectedItem()) return;

        const aSelectedItem = oTable.getSelectedItem().getParent()._aSelectedPaths;
        for (let i = 0; i < aSelectedItem.length; i++) {
          if (aSelectedItem[i].includes('id-')) {
            aDeleteEntry.push(aSelectedItem[i]);
          } else {
            aDelete.push(aSelectedItem[i]);
          }
        }

        const aSelectedItems = oTable.getSelectedItems();
        for (let i = 0; i < aSelectedItems.length; i++) {
          oTable.removeItem(aSelectedItems[i]);
        }
      },
      onLiveChange: function (oEvent) {
        const oModel = oTable.getModel();

        const uri = oEvent.getSource().getParent().getBindingContext().sPath;
        const changeColumn = oEvent.getSource().mBindingInfos.value.binding.sPath;
        const changeValue = oEvent.getParameters().value;

        oModel.setProperty(uri + `/${changeColumn}`, changeValue)
      },

      onFilter: function (oEvent) {

        aFilter = [];
        var sQuery = oEvent.getParameter("query");
        if (sQuery) {
          aFilter.push(new sap.ui.model.Filter("Bktxt",
            sap.ui.model.FilterOperator.Contains, sQuery.toUpperCase()));
        }
        var oBinding = oTable.getBinding("items");
        oBinding.filter(aFilter);
      },
      onDeleteButton: function (oEvent) {
        const oItem = oEvent.getSource().getParent();
        const oItemPath = oItem.getBindingContext().sPath;
        oTable.removeItem(oItem);
        if (oItemPath.includes('id-')) {
          aDeleteEntry.push(oItemPath);
        } else {
          aDelete.push(oItemPath);
        }
      },
      onCheck: function (oEvent) {
        const oModel = oTable.getModel();
        const uri = oEvent.getSource().getParent().getBindingContext().sPath;
        const changeValue = oEvent.getParameters().selected;
        oModel.setProperty(uri + '/Zcheck', changeValue);
        console.log(uri, changeValue)
      },
      onEdit: function () {
        let mode,
          classname;
        mode = oMode.getData().mode ? false : true;
        classname = oMode.getData().mode ? 'editfalse' : 'edittrue';
        oMode.setData({
          mode: mode,
          classname: classname
        })
      }
    });
  });
