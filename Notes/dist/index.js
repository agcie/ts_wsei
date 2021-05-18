/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AppStorage.ts":
/*!***************************!*\
  !*** ./src/AppStorage.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.AppStorage = void 0;
class AppStorage {
    constructor() {
        this.listOfIds.push(0);
    }
    getNextId() {
        const id = this.listOfIds[this.listOfIds.length - 1] + 1;
        this.listOfIds.push(id);
        return id.toString();
    }
    removeId(id) {
        var what, a = arguments, L = a.length, ax;
        while (L > 1 && this.listOfIds.length) {
            what = a[--L];
            while ((ax = this.listOfIds.indexOf(what)) !== -1) {
                this.listOfIds.splice(ax, 1);
            }
        }
    }
    getNote(id) {
        const newNote = localStorage.getItem(id);
        return JSON.parse(newNote);
    }
    addNote(someNote) {
        localStorage.setItem(this.getNextId(), JSON.stringify(someNote));
    }
    delNote(id) {
        this.removeId(Number(id));
        localStorage.removeItem(id);
    }
    getAllNotes() {
        let notTab = [];
        for (let i of this.listOfIds) {
            notTab.push(this.getNote(i.toString()));
        }
        return notTab;
    }
}
exports.AppStorage = AppStorage;


/***/ }),

/***/ "./src/NoteHandler.ts":
/*!****************************!*\
  !*** ./src/NoteHandler.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteHandler = void 0;
const AppStorage_1 = __webpack_require__(/*! ./AppStorage */ "./src/AppStorage.ts");
class NoteHandler {
    constructor() {
        this.bd = new AppStorage_1.AppStorage();
        this.createNoteBlocks();
    }
    createNoteDiv(not) {
        return __awaiter(this, void 0, void 0, function* () {
            let place = document.querySelector("#weatherBlocks");
            let WeatherDiv = `<div class="weatherInfo"><h2>Note</h2> 
        <br/>Title{` + not.title + `}
        <br/>Body: ` + not.body + `
        `;
            place.innerHTML += WeatherDiv;
        });
    }
    createNoteBlocks() {
        document.querySelector("#weatherBlocks").innerHTML = "";
        for (let note of this.bd.getAllNotes()) {
            this.createNoteDiv(note);
        }
    }
    refresh() {
        this.createNoteBlocks();
    }
}
exports.NoteHandler = NoteHandler;


/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const AppStorage_1 = __webpack_require__(/*! ./AppStorage */ "./src/AppStorage.ts");
const NoteHandler_1 = __webpack_require__(/*! ./NoteHandler */ "./src/NoteHandler.ts");
class App {
    constructor() {
        document.addEventListener('keypress', this.onKeyPress);
        this.storageHandler = new AppStorage_1.AppStorage();
        this.noteHandler = new NoteHandler_1.NoteHandler();
    }
    onKeyPress(ev) {
        if (ev.key == 'Enter') {
            let title = document.querySelector("#title");
            let body = document.querySelector("#body");
            let newNote = { title: title.value, body: body.value, date: "" };
            this.storageHandler.addNote(newNote);
            this.noteHandler.refresh();
        }
    }
}
exports.App = App;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
let app = new app_1.App();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0FwcFN0b3JhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL05vdGVIYW5kbGVyLnRzIiwid2VicGFjazovLy8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RUEsTUFBYSxVQUFVO0lBSW5CO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVELFNBQVM7UUFDTCxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsU0FB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QUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsY0FBYyxHQUFFLElBQUksdUJBQVUsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxXQUFXLEdBQUUsSUFBSSx5QkFBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVELFVBQVUsQ0FBQyxFQUFpQjtRQUN4QixJQUFHLEVBQUUsQ0FBQyxHQUFHLElBQUksT0FBTyxFQUFDO1lBQ2xCLElBQUksS0FBSyxHQUFzQixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hFLElBQUksSUFBSSxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdELElBQUksT0FBTyxHQUFRLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUcsSUFBSSxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQztZQUNsRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzFCO0lBQ0osQ0FBQztDQUNKO0FBbkJMLGtCQW1CSzs7Ozs7Ozs7Ozs7Ozs7O0FDdkJMLCtEQUF5QjtBQUV6QixJQUFJLEdBQUcsR0FBRyxJQUFJLFNBQUcsRUFBRSxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbnRlcmZhY2Ugb2JqZWN0Tm90ZXtcclxuICAgIG5vdGU6IG5vdGU7XHJcbiAgICBpZDogbnVtYmVyO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2Ugbm90ZXtcclxuICAgIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBib2R5OiBzdHJpbmc7XHJcbiAgICBkYXRlOiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIEFwcFN0b3JhZ2V7XHJcblxyXG4gICAgbGlzdE9mSWRzOiBudW1iZXJbXTtcclxuICAgIG5vdGVUYWIgOiBub3RlW107XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmxpc3RPZklkcy5wdXNoKDApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE5leHRJZCgpOiBzdHJpbmd7XHJcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmxpc3RPZklkc1t0aGlzLmxpc3RPZklkcy5sZW5ndGgtMV0rMTtcclxuICAgICAgICB0aGlzLmxpc3RPZklkcy5wdXNoKGlkKTtcclxuICAgICAgICByZXR1cm4gaWQudG9TdHJpbmcoKTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcmVtb3ZlSWQoaWQ6IG51bWJlcikge1xyXG4gICAgICAgIHZhciB3aGF0LCBhID0gYXJndW1lbnRzLCBMID0gYS5sZW5ndGgsIGF4O1xyXG4gICAgICAgIHdoaWxlIChMID4gMSAmJiB0aGlzLmxpc3RPZklkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgd2hhdCA9IGFbLS1MXTtcclxuICAgICAgICAgICAgd2hpbGUgKChheD0gIHRoaXMubGlzdE9mSWRzLmluZGV4T2Yod2hhdCkpICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0T2ZJZHMuc3BsaWNlKGF4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldE5vdGUoaWQ6IHN0cmluZyk6IG5vdGV7XHJcbiAgICAgICAgY29uc3QgbmV3Tm90ZSA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKGlkKTtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShuZXdOb3RlKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGROb3RlKHNvbWVOb3RlOiBub3RlKTogdm9pZHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGlzLmdldE5leHRJZCgpLCBKU09OLnN0cmluZ2lmeShzb21lTm90ZSkpOyAgIFxyXG4gICAgfVxyXG5cclxuICAgIGRlbE5vdGUoaWQ6IHN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVJZChOdW1iZXIoaWQpKTtcclxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShpZCk7ICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWxsTm90ZXMoKTogbm90ZVtde1xyXG4gICAgICAgIGxldCBub3RUYWI6IG5vdGVbXSA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSBvZiB0aGlzLmxpc3RPZklkcyl7XHJcbiAgICAgICAgICAgIG5vdFRhYi5wdXNoKHRoaXMuZ2V0Tm90ZShpLnRvU3RyaW5nKCkpKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbm90VGFiO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQXBwU3RvcmFnZSwgbm90ZSB9IGZyb20gJy4vQXBwU3RvcmFnZSc7XHJcblxyXG5leHBvcnQgY2xhc3MgTm90ZUhhbmRsZXJ7XHJcblxyXG4gICAgcHJpdmF0ZSBiZCA9IG5ldyBBcHBTdG9yYWdlKCk7XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKXtcclxuICAgICAgICB0aGlzLmNyZWF0ZU5vdGVCbG9ja3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBjcmVhdGVOb3RlRGl2KG5vdDogbm90ZSkge1xyXG4gICAgICAgIGxldCBwbGFjZTpIVE1MRGl2RWxlbWVudCA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJCbG9ja3NcIik7XHJcbiAgICAgICAgbGV0IFdlYXRoZXJEaXY9IGA8ZGl2IGNsYXNzPVwid2VhdGhlckluZm9cIj48aDI+Tm90ZTwvaDI+IFxyXG4gICAgICAgIDxici8+VGl0bGV7YCtub3QudGl0bGUrYH1cclxuICAgICAgICA8YnIvPkJvZHk6IGArbm90LmJvZHkrYFxyXG4gICAgICAgIGA7XHJcbiAgICAgICAgcGxhY2UuaW5uZXJIVE1MICs9V2VhdGhlckRpdjtcclxuICAgIH1cclxuICAgIGNyZWF0ZU5vdGVCbG9ja3MoKXtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlYXRoZXJCbG9ja3NcIikuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICBmb3IobGV0IG5vdGUgIG9mIHRoaXMuYmQuZ2V0QWxsTm90ZXMoKSl7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTm90ZURpdihub3RlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZWZyZXNoKCl7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVOb3RlQmxvY2tzKCk7XHJcbiAgICB9XHJcblxyXG59IiwiXHJcblxyXG5pbXBvcnQge0FwcFN0b3JhZ2UsIG5vdGV9IGZyb20gJy4vQXBwU3RvcmFnZSdcclxuaW1wb3J0IHtOb3RlSGFuZGxlcn0gZnJvbSAnLi9Ob3RlSGFuZGxlcidcclxuZXhwb3J0IGNsYXNzIEFwcHtcclxuICAgIHByaXZhdGUgc3RvcmFnZUhhbmRsZXI6IEFwcFN0b3JhZ2U7XHJcbiAgICBwcml2YXRlIG5vdGVIYW5kbGVyOiBOb3RlSGFuZGxlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIHRoaXMub25LZXlQcmVzcyk7XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlSGFuZGxlcj0gbmV3IEFwcFN0b3JhZ2UoKTtcclxuICAgICAgICB0aGlzLm5vdGVIYW5kbGVyPSBuZXcgTm90ZUhhbmRsZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbktleVByZXNzKGV2OiBLZXlib2FyZEV2ZW50KTogdm9pZHtcclxuICAgICAgICBpZihldi5rZXkgPT0gJ0VudGVyJyl7XHJcbiAgICAgICAgICAgbGV0IHRpdGxlIDogIEhUTUxJbnB1dEVsZW1lbnQ9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIik7XHJcbiAgICAgICAgICAgbGV0IGJvZHkgOiBIVE1MSW5wdXRFbGVtZW50PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JvZHlcIik7XHJcbiAgICAgICAgICAgbGV0IG5ld05vdGUgOm5vdGUgPXt0aXRsZTp0aXRsZS52YWx1ZSAsIGJvZHk6Ym9keS52YWx1ZSwgZGF0ZTogXCJcIn1cclxuICAgICAgICAgICB0aGlzLnN0b3JhZ2VIYW5kbGVyLmFkZE5vdGUobmV3Tm90ZSk7XHJcbiAgICAgICAgICAgdGhpcy5ub3RlSGFuZGxlci5yZWZyZXNoKCk7XHJcbiAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0iLCJpbXBvcnQge0FwcH0gZnJvbSAnLi9hcHAnXHJcblxyXG5sZXQgYXBwID0gbmV3IEFwcCgpOyJdLCJzb3VyY2VSb290IjoiIn0=