/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zc6fi1401mod/zc6fi1401/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
