"use strict";
exports.__esModule = true;
exports.LocalStorageCityHandler = void 0;
var LocalStorageCityHandler = /** @class */ (function () {
    function LocalStorageCityHandler(name) {
        this.cityTab = name;
    }
    LocalStorageCityHandler.prototype.isNotNull = function () {
        if (localStorage.getItem(this.cityTab)) {
            return true;
        }
        else {
            return false;
        }
    };
    LocalStorageCityHandler.prototype.getCityArray = function () {
        var tab = localStorage.getItem(this.cityTab).split("-");
        return tab;
    };
    LocalStorageCityHandler.prototype.addCityToArray = function (name) {
        if (this.isNotNull()) {
            var tab = localStorage.getItem(this.cityTab).split("-");
            tab.push(name);
            var newTabStrinigied = tab.join("-");
            localStorage.setItem(this.cityTab, newTabStrinigied);
        }
        else {
            localStorage.setItem(this.cityTab, name);
        }
    };
    return LocalStorageCityHandler;
}());
exports.LocalStorageCityHandler = LocalStorageCityHandler;
