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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/ListFilter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ListFilter.js":
/*!***************************!*\
  !*** ./src/ListFilter.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Is launched for each list items\n * @callback onUpdateCallback\n * @param {string} searchPattern\n * @param {HTMLElement} element\n * @param {boolean} isMatching\n * @return boolean\n *\n * Is launched before finish\n * @callback onAfterSearchCallback\n * @param {string} searchPattern\n * @param {HTMLElement[]} foundElements\n */\n\n\n\n/**\n * init events for binding the list with trigger\n * @param {HTMLElement} trigger\n * @param {HTMLElement} list\n * @param {object} [options]\n * @param {boolean} options.caseSensitive\n * @param {Number} options.keyupDelay\n * @param {boolean|String} options.searchInAttribute\n * @param {boolean|onUpdateCallback} options.onSearch\n * @param {boolean|onAfterSearchCallback} options.onAfterSearch\n * @constructor\n */\nlet ListFilter = function (trigger, list, options) {\n\n\tlet me = this;\n\tlet listItems = list.getElementsByTagName('li');\n\tlet isMatching, matchingLiElements, searchPattern, timeoutOnGoing;\n\n\t// options\n\tlet defaults = {\n\t\tcaseSensitive: false,\n\t\tkeyupDelay: 50,\n\t\tonAfterSearch: false,\n\t\tonSearch: false,\n\t\tsearchInAttribute: false\n\t};\n\toptions = Object.assign(defaults, options);\n\n\t/**\n\t * @param {String} triggerValue\n\t * @returns {string}\n\t */\n\tfunction getSearchPattern(triggerValue)\n\t{\n\t\tif(!options.caseSensitive){\n\t\t\treturn triggerValue.toLowerCase();\n\t\t}else{\n\t\t\treturn triggerValue;\n\t\t}\n\t}\n\n\t/**\n\t * @param {HTMLElement} li\n\t * @returns {string}\n\t */\n\tfunction getLiValue(li)\n\t{\n\t\tlet str;\n\t\tif(options.searchInAttribute === false){\n\t\t\tstr = li.innerHTML;\n\t\t}else{\n\t\t\tstr = li.getAttribute(options.searchInAttribute);\n\t\t}\n\t\tif(!options.caseSensitive){\n\t\t\treturn str.toLowerCase();\n\t\t}else{\n\t\t\treturn str;\n\t\t}\n\t}\n\n\t/**\n\t * @param {String} sPattern\n\t * @param {HTMLElement} li\n\t */\n\tfunction testMatch(sPattern, li)\n\t{\n\t\tlet isMatching;\n\t\tlet sValue = getLiValue(li);\n\t\tisMatching = sValue.indexOf(sPattern) >= 0;\n\t\tif(typeof(options.onSearch) === 'function'){\n\t\t\tisMatching = options.onSearch(sPattern, li, isMatching);\n\t\t}\n\t\treturn isMatching;\n\t}\n\n\t/**\n\t * @param {HTMLElement} li\n\t * @param {boolean} isMatching\n\t */\n\tfunction updateDisplay(li, isMatching)\n\t{\n\t\tif(isMatching){\n\t\t\tli.style.display = '';\n\t\t}else{\n\t\t\tli.style.display = 'none';\n\t\t}\n\t}\n\n\t/**\n\t * refresh DOM\n\t */\n\tfunction doRefresh()\n\t{\n\t\tmatchingLiElements = [];\n\t\tsearchPattern = getSearchPattern(trigger.value);\n\n\t\tfor(let liElement of listItems){\n\t\t\tisMatching = testMatch(searchPattern, liElement);\n\n\t\t\tif(isMatching){\n\t\t\t\tmatchingLiElements.push(liElement);\n\t\t\t}\n\n\t\t\tupdateDisplay(liElement, isMatching);\n\t\t}\n\n\t\tif(typeof(options.onAfterSearch) === 'function'){\n\t\t\toptions.onAfterSearch(searchPattern, matchingLiElements);\n\t\t}\n\t}\n\n\t/**\n\t * refresh DOM\n\t * @param {boolean} [waitDelay=false]\n\t */\n\tthis.refresh = function(waitDelay){\n\t\tclearTimeout(timeoutOnGoing);\n\t\tif(waitDelay){\n\t\t\tsetTimeout(function () {\n\t\t\t\tdoRefresh();\n\t\t\t}, options.keyupDelay);\n\t\t}else{\n\t\t\tdoRefresh();\n\t\t}\n\t};\n\n\t// event\n\ttrigger.onkeyup = function(){\n\t\tme.refresh(true);\n\t};\n\n};\n\nmodule.exports = ListFilter;\n/* istanbul ignore next */\nif (typeof window !== 'undefined') {\n\twindow.ListFilter = ListFilter;\n}\n\n\n//# sourceURL=webpack:///./src/ListFilter.js?");

/***/ })

/******/ });