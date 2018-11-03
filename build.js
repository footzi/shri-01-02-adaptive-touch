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
/******/ 	return __webpack_require__(__webpack_require__.s = "./scripts/app/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./scripts/app/app.ts":
/*!****************************!*\
  !*** ./scripts/app/app.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst home_1 = __importDefault(__webpack_require__(/*! ./pages/home */ \"./scripts/app/pages/home.ts\"));\nconst cameras_1 = __importDefault(__webpack_require__(/*! ./pages/cameras */ \"./scripts/app/pages/cameras.ts\"));\nconst router_1 = __importDefault(__webpack_require__(/*! ./router */ \"./scripts/app/router.ts\"));\nconst router = new router_1.default({\n    '/': home_1.default,\n    '/cameras': cameras_1.default\n});\n\n\n//# sourceURL=webpack:///./scripts/app/app.ts?");

/***/ }),

/***/ "./scripts/app/pages/cameras.ts":
/*!**************************************!*\
  !*** ./scripts/app/pages/cameras.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Cameras {\n    constructor() {\n        this.paint();\n    }\n    paint() {\n        console.log('cameras paint');\n    }\n    clear() {\n    }\n    init() {\n        // const data = store.$getters.GETDATA();\n        // store.dispatch('send', 'formdata');\n        // console.log(data);\n        // //@ts-ignore\n        // document.querySelector('.b-title').addEventListener('click', (event )=> {\n        //     store.dispatch('click', event);\n        //     console.log(store.$getters.GETDATA());\n        // })\n    }\n}\nexports.default = Cameras;\n\n\n//# sourceURL=webpack:///./scripts/app/pages/cameras.ts?");

/***/ }),

/***/ "./scripts/app/pages/home.ts":
/*!***********************************!*\
  !*** ./scripts/app/pages/home.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst store_1 = __importDefault(__webpack_require__(/*! ../store */ \"./scripts/app/store.ts\"));\nconst utils_1 = __webpack_require__(/*! ../utils */ \"./scripts/app/utils.ts\");\nclass Home {\n    constructor() {\n        utils_1.remove('home');\n    }\n    init() {\n        const data = store_1.default.$getters.GETDATA();\n        store_1.default.dispatch('send', 'formdata');\n        console.log(data);\n        //@ts-ignore\n        document.querySelector('.b-title').addEventListener('click', (event) => {\n            store_1.default.dispatch('click', event);\n            console.log(store_1.default.$getters.GETDATA());\n        });\n    }\n}\nexports.default = Home;\n\n\n//# sourceURL=webpack:///./scripts/app/pages/home.ts?");

/***/ }),

/***/ "./scripts/app/router.ts":
/*!*******************************!*\
  !*** ./scripts/app/router.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Router {\n    constructor(routes) {\n        this.routes = routes;\n        this.links = null;\n        this.linkHref = window.location.pathname;\n        this.routerLink();\n        this.bindEvents();\n        this.jump();\n    }\n    bindEvents() {\n        if (this.links) {\n            this.links.forEach((item) => {\n                item.addEventListener('click', (event) => {\n                    event.preventDefault();\n                    const target = event.target;\n                    this.linkHref = target.getAttribute('href');\n                    this.jump();\n                });\n            });\n        }\n    }\n    jump() {\n        for (const route in this.routes) {\n            if (route === this.linkHref) {\n                //@ts-ignore\n                new this.routes[route];\n                window.history.pushState(null, '', route);\n            }\n        }\n    }\n    routerLink() {\n        this.links = Array.from(document.querySelectorAll('.j-router-link'));\n    }\n}\nexports.default = Router;\n\n\n//# sourceURL=webpack:///./scripts/app/router.ts?");

/***/ }),

/***/ "./scripts/app/store.ts":
/*!******************************!*\
  !*** ./scripts/app/store.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst index_1 = __importDefault(__webpack_require__(/*! ../../vuex/index */ \"./vuex/index.ts\"));\nconst store = new index_1.default();\nstore.state({\n    page: 'home',\n    data: ''\n});\nstore.getters({\n    GETDATA: function () {\n        return this.$state;\n    }\n});\nstore.actions({\n    send: function (data) {\n        return 5;\n    },\n    click: function (event) {\n        store.commit('SETDATA', event.target);\n    }\n});\nstore.mutations({\n    SETDATA: function (data) {\n        //@ts-ignore\n        this.$state.page = data;\n    }\n});\nexports.default = store;\n\n\n//# sourceURL=webpack:///./scripts/app/store.ts?");

/***/ }),

/***/ "./scripts/app/utils.ts":
/*!******************************!*\
  !*** ./scripts/app/utils.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst paint = (data) => {\n    console.log('paint ' + data);\n};\nexports.paint = paint;\nconst remove = (data) => {\n    console.log('remove ' + data);\n};\nexports.remove = remove;\n\n\n//# sourceURL=webpack:///./scripts/app/utils.ts?");

/***/ }),

/***/ "./vuex/index.ts":
/*!***********************!*\
  !*** ./vuex/index.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Vuex {\n    constructor() {\n        this.$state = {};\n        this.$getters = {};\n        this.$actions = {};\n        this.$mutations = {};\n    }\n    state(data) {\n        this.$state = data;\n        return this.$state;\n    }\n    getters(data) {\n        for (let item in data) {\n            this.$getters[item] = data[item].bind(this);\n        }\n    }\n    actions(data) {\n        for (let item in data) {\n            this.$actions[item] = data[item].bind(this);\n        }\n    }\n    mutations(data) {\n        for (let item in data) {\n            this.$mutations[item] = data[item].bind(this);\n        }\n    }\n    dispatch(name, data) {\n        return this.$actions[name](data);\n    }\n    commit(name, data) {\n        return this.$mutations[name](data);\n    }\n}\nexports.default = Vuex;\n\n\n//# sourceURL=webpack:///./vuex/index.ts?");

/***/ })

/******/ });