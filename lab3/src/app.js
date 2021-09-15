"use strict";
exports.__esModule = true;
exports.App = void 0;
var localStorageCityHandler_1 = require("./localStorageCityHandler");
var apiHandler_1 = require("./apiHandler");
var App = /** @class */ (function () {
    function App() {
        document.addEventListener('keypress', this.onKeyPress);
        this.storageHandler = new localStorageCityHandler_1.LocalStorageCityHandler("cities2");
        if (this.storageHandler.isNotNull()) {
            this.apiHandler = new apiHandler_1.ApiHandler(this.storageHandler.getCityArray());
        }
    }
    App.prototype.onKeyPress = function (ev) {
        if (ev.key == 'Enter') {
            var nameOfCity = document.querySelector("#city");
            var name_1 = nameOfCity.value;
            if (name_1) {
                var storageHandler2 = new localStorageCityHandler_1.LocalStorageCityHandler("cities2");
                if (storageHandler2.isNotNull()) {
                    var apiHandler2 = new apiHandler_1.ApiHandler(storageHandler2.getCityArray());
                    storageHandler2.addCityToArray(name_1);
                    console.log(name_1);
                    apiHandler2.addNewCity(name_1);
                    console.log(storageHandler2.getCityArray());
                }
                else {
                    storageHandler2.addCityToArray(name_1);
                    var apiHandler2 = new apiHandler_1.ApiHandler(storageHandler2.getCityArray());
                    apiHandler2.addNewCity(name_1);
                }
            }
            else {
                console.log("Name city empty");
            }
        }
    };
    return App;
}());
exports.App = App;
