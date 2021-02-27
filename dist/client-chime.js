/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/templates/html/bootstrap/v4_5/login.ejs":
/*!*****************************************************!*\
  !*** ./src/templates/html/bootstrap/v4_5/login.ejs ***!
  \*****************************************************/
/***/ ((module) => {

eval("module.exports = function anonymous(locals, escapeFn, include, rethrow\n) {\nrethrow = rethrow || function rethrow(err, str, flnm, lineno, esc){\n  var lines = str.split('\\n');\n  var start = Math.max(lineno - 3, 0);\n  var end = Math.min(lines.length, lineno + 3);\n  var filename = esc(flnm); // eslint-disable-line\n  // Error context\n  var context = lines.slice(start, end).map(function (line, i){\n    var curr = i + start + 1;\n    return (curr == lineno ? ' >> ' : '    ')\n      + curr\n      + '| '\n      + line;\n  }).join('\\n');\n\n  // Alter exception message\n  err.path = filename;\n  err.message = (filename || 'ejs') + ':'\n    + lineno + '\\n'\n    + context + '\\n\\n'\n    + err.message;\n\n  throw err;\n};\nescapeFn = escapeFn || function (markup) {\n  return markup == undefined\n    ? ''\n    : String(markup)\n      .replace(_MATCH_HTML, encode_char);\n};\nvar _ENCODE_HTML_RULES = {\n      \"&\": \"&amp;\"\n    , \"<\": \"&lt;\"\n    , \">\": \"&gt;\"\n    , '\"': \"&#34;\"\n    , \"'\": \"&#39;\"\n    }\n  , _MATCH_HTML = /[&<>'\"]/g;\nfunction encode_char(c) {\n  return _ENCODE_HTML_RULES[c] || c;\n};\n;\nvar __line = 1\n  , __lines = \"Hello, <%=name%>!\"\n  , __filename = \"src/templates/html/bootstrap/v4_5/login.ejs\";\ntry {\n  var __output = \"\";\n  function __append(s) { if (s !== undefined && s !== null) __output += s }\n  with (locals || {}) {\n    ; __append(\"Hello, \")\n    ; __append(escapeFn(name))\n    ; __append(\"!\")\n  }\n  return __output;\n} catch (e) {\n  rethrow(e, __lines, __filename, __line, escapeFn);\n}\n\n//# sourceURL=src/templates/html/bootstrap/v4_5/login.ejs\n\n}\n\n//# sourceURL=webpack://aws-chime-client-backbone/./src/templates/html/bootstrap/v4_5/login.ejs?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var PATH_TO_SETTING_TEMPLATE__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! PATH_TO_SETTING_TEMPLATE */ \"./src/settings/allFeatures.js\");\n/* harmony import */ var PATH_TO_SETTING_TEMPLATE__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(PATH_TO_SETTING_TEMPLATE__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _modules_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/constants.js */ \"./src/modules/constants.js\");\n //see .env\n\n\nconst tplLogin = __webpack_require__(/*! PATH_TO_VIEW_TEMPLATES/login.ejs */ \"./src/templates/html/bootstrap/v4_5/login.ejs\")\n\n\n\n/* ## MODELS ########################################### */\n\n\n\n/* ## VIEWS ########################################### */\n\n\nvar LoginView = Backbone.View.extend({\n\tel: `#${_modules_constants_js__WEBPACK_IMPORTED_MODULE_1__.ID_APP}`,\n\n\tinitialize: function(){\n\t\tthis.render();\n\t},\n\n\trender: function(){  \n\t\tthis.$el.html( tplLogin({name:'AWS Chime client'}));\t\n\t}\n});\n\nvar loginView = new LoginView();\nvar test = '123'\n\n\n\n\n//# sourceURL=webpack://aws-chime-client-backbone/./src/app.js?");

/***/ }),

/***/ "./src/modules/constants.js":
/*!**********************************!*\
  !*** ./src/modules/constants.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ID_APP\": () => (/* binding */ ID_APP),\n/* harmony export */   \"CRENDTIALS_TO_MEETING_URL\": () => (/* binding */ CRENDTIALS_TO_MEETING_URL)\n/* harmony export */ });\n/**\n * The App main wrapper element ID.\n * \n * @constant\n * @type {string}\n */\nconst ID_APP = \"cz-kibo-meeting-chime-client\";\n\t\t\t\n/**\n * Server credentials URL\n * \n * From these URL the client ask for a Chime Meeting and Chime Attendee.\n * \n * @constant\n * @type {string}\n * \n * @see server.js\n */\nconst CRENDTIALS_TO_MEETING_URL = \"http://localhost:3000/meeting/\";\n\n//# sourceURL=webpack://aws-chime-client-backbone/./src/modules/constants.js?");

/***/ }),

/***/ "./src/settings/allFeatures.js":
/*!*************************************!*\
  !*** ./src/settings/allFeatures.js ***!
  \*************************************/
/***/ (() => {

eval("\n\n\n//# sourceURL=webpack://aws-chime-client-backbone/./src/settings/allFeatures.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;