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
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/app.js":
/*!************************!*\
  !*** ./scripts/app.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar container = document.querySelector(\".j-container\");\nvar image = container.querySelector(\"img\");\nvar pointer = container.querySelector(\".j-pointer\");\n\nvar containerWidth = 0;\nvar startPosition = 0;\nvar leftBorder = 0;\nvar rightBorder = 0;\nvar newPosition = 0;\nvar endPosition = 0;\nvar startX = 0;\nvar ratio = 0;\nvar pointerNewPosition = 0;\n\nvar touches = {\n    first: 0,\n    second: 0\n};\n\nvar newTouches = {\n    first: 0,\n    second: 0\n};\n\nimage.onload = function () {\n    var imageWidth = image.offsetWidth;\n    containerWidth = container.offsetWidth;\n    var pointerWidth = pointer.offsetWidth;\n    var pointerPosition = containerWidth / 2 - pointerWidth / 4;\n\n    startPosition = (containerWidth - imageWidth) / 2;\n    leftBorder = 0;\n    rightBorder = containerWidth - imageWidth;\n\n    image.style.left = startPosition + \"px\";\n    pointer.style.left = pointerPosition + \"px\";\n};\n\nvar moveHandler = function moveHandler() {\n    newPosition = event.x - startX + startPosition;\n    ratio = newPosition / rightBorder;\n    pointerNewPosition = ratio * containerWidth;\n\n    if (newPosition >= rightBorder && newPosition <= leftBorder) {\n        image.style.left = newPosition + \"px\";\n        endPosition = newPosition;\n\n        pointer.style.left = pointerNewPosition + \"px\";\n    }\n};\n\nvar pinchHandler = function pinchHandler() {\n    var scale = (newTouches.second - touches.second) / 100 + 1;\n\n    if (scale > 1) {\n        image.style.transform = \"scale(\" + scale + \")\";\n    }\n};\n\nvar rotateHandler = function rotateHandler() {\n    var brightness = 100 - (newTouches.second - newTouches.first) / 5;\n\n    image.style.filter = \"brightness(\" + brightness + \"%)\";\n};\n\nimage.addEventListener(\"pointerdown\", function (event) {\n    startX = event.x;\n\n    if (event.isPrimary) {\n        touches.first = event.x;\n        touches.firstY = event.y;\n    } else {\n        touches.second = event.x;\n        touches.secondY = event.y;\n    }\n});\n\nimage.addEventListener(\"pointermove\", function (event) {\n    if (event.isPrimary) {\n        newTouches.first = event.x;\n    } else {\n        newTouches.second = event.x;\n    }\n\n    if (newTouches.first === 0 && touches.second != newTouches.second) {\n        rotateHandler();\n    }\n\n    if (newTouches.first != 0 && touches.second != newTouches.second) {\n        pinchHandler();\n    }\n\n    if (touches.second === 0 && newTouches.second === 0) {\n        moveHandler();\n    }\n});\n\nimage.addEventListener(\"pointerup\", function () {\n    startPosition = endPosition;\n    touches.first = 0;\n    touches.second = 0;\n    newTouches.first = 0;\n    newTouches.second = 0;\n});\n\n//# sourceURL=webpack:///./scripts/app.js?");

/***/ })

/******/ });