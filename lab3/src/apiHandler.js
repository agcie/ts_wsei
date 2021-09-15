"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ApiHandler = void 0;
var ApiHandler = /** @class */ (function () {
    function ApiHandler(cities) {
        this.apiKey = '9fcbf0032afb2c9c309efe1a889d469d';
        console.log("const");
        this.citiesArr = cities;
        this.createWeatherBlocks();
    }
    ApiHandler.prototype.KtoC = function (val) {
        return val - 273.15;
    };
    ApiHandler.prototype.createWeatherDiv = function (city) {
        return __awaiter(this, void 0, void 0, function () {
            var place, openWeatherUrl, weatherResponse, weatherData, WeatherDiv;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("createWeatherDiv" + city);
                        place = document.querySelector("#weatherBlocks");
                        openWeatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + this.apiKey;
                        return [4 /*yield*/, fetch(openWeatherUrl)];
                    case 1:
                        weatherResponse = _a.sent();
                        return [4 /*yield*/, weatherResponse.json()];
                    case 2:
                        weatherData = _a.sent();
                        console.log(weatherData);
                        WeatherDiv = "<div class=\"weatherInfo\"><h2>" + city + "</h2> \n        <h4>{" + weatherData.coord.lon + "," + weatherData.coord.lat + "}</h4>\n        Weather:\n        <br/>Temp{" + this.KtoC(weatherData.main.temp).toString().substr(0, 5) + "C ," + weatherData.main.temp + "K }\n        <br/>Clouds: " + weatherData.clouds.all + "\n        <br/>Wind{speed: " + weatherData.wind.speed + ", degree:" + weatherData.wind.deg + "}\n        <br/> Visibility: " + weatherData.visibility.toString().substr(0, 3) + " \n        ";
                        place.innerHTML += WeatherDiv;
                        return [2 /*return*/];
                }
            });
        });
    };
    ApiHandler.prototype.createWeatherBlocks = function () {
        document.querySelector("#weatherBlocks").innerHTML = "";
        console.log("createWeatherBlocks");
        for (var _i = 0, _a = this.citiesArr; _i < _a.length; _i++) {
            var city = _a[_i];
            this.createWeatherDiv(city);
        }
    };
    ApiHandler.prototype.addNewCity = function (city) {
        console.log("addNewCity");
        this.citiesArr.push(city);
    };
    return ApiHandler;
}());
exports.ApiHandler = ApiHandler;
