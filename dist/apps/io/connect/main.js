/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("http");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@socket.io/redis-adapter");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("ioredis");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.receive = exports.Io = exports.redirect = void 0;
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(8), exports);
var redirect_1 = __webpack_require__(9);
Object.defineProperty(exports, "redirect", ({ enumerable: true, get: function () { return redirect_1.redirect; } }));
var io_1 = __webpack_require__(10);
Object.defineProperty(exports, "Io", ({ enumerable: true, get: function () { return io_1.Io; } }));
var receive_1 = __webpack_require__(11);
Object.defineProperty(exports, "receive", ({ enumerable: true, get: function () { return receive_1.receive; } }));


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.channels = void 0;
function channels() {
    return 'Channels';
}
exports.channels = channels;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.redirect = void 0;
const errorCallback = (err, channel, message) => {
    err ?
        console.error(`${channel} publish: error`, err) :
        console.log(`${channel} publish: success`, message);
};
const redirect = (to, socket, redis) => {
    socket.on(to, (message) => {
        redis.publish(to, message, (err) => errorCallback(err, to, message));
    });
};
exports.redirect = redirect;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Io = void 0;
var Io;
(function (Io) {
    Io["CHAT"] = "chat";
    Io["DIALOG"] = "dialog";
    Io["MESSAGE"] = "message";
    Io["CONNECT"] = "connection";
})(Io || (exports.Io = Io = {}));


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.receive = void 0;
const errorCallback = (err, channel) => {
    err ? console.error(`${channel} subscription: error`, err) : console.log(`${channel} subscription: success`);
};
const receive = (channel, redis, handler) => {
    redis.subscribe(channel, (err) => errorCallback(err, channel));
    redis.on('message', (channel, message) => {
        console.log(`Получено сообщение для ${channel}: ${message}`);
        try {
            handler(message);
        }
        catch (err) {
            console.error(`Сообщение в канале ${channel}, не обработано: ${err}`);
        }
    });
};
exports.receive = receive;


/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("process");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const express_1 = tslib_1.__importDefault(__webpack_require__(2));
const http_1 = tslib_1.__importDefault(__webpack_require__(3));
const socket_io_1 = __webpack_require__(4);
const redis_adapter_1 = __webpack_require__(5);
const ioredis_1 = __webpack_require__(6);
const channels_1 = __webpack_require__(7);
const process = tslib_1.__importStar(__webpack_require__(12));
// ========================================= PROJECT ENV =============================================
const channel = channels_1.Io.CONNECT;
const port = process.env.IO_CONNECT_PORT;
// ========================================= CONNECTIONS =============================================
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: { origin: "*" } });
const pubClient = new ioredis_1.Redis({ host: process.env.REDIS_HOST, port: parseInt(process.env.REDIS_PORT) });
const subClient = pubClient.duplicate();
io.adapter((0, redis_adapter_1.createAdapter)(pubClient, subClient));
// ================================ SOCKET.IO + REDIS PUBLICATION ====================================
io.on('connection', (socket) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userAgent = socket.handshake.headers['user-agent'];
    const sid = socket.id;
    console.log("Connected:", sid);
    const sockets = yield io.fetchSockets();
    console.log("FetchSockets:", sockets.length);
    socket.on('disconnect', () => console.log("Disconnected:", socket.id));
    (0, channels_1.redirect)(channels_1.Io.CHAT, socket, pubClient);
    (0, channels_1.redirect)(channels_1.Io.DIALOG, socket, pubClient);
    (0, channels_1.redirect)(channels_1.Io.MESSAGE, socket, pubClient);
    socket.on(channel, (message) => {
        io.emit(channel, message);
        console.log(`main.ts:27-${message}`);
    });
}));
// ======================================= REDIS SUBSCRIBE ===========================================
(0, channels_1.receive)(channel, subClient, (message) => {
    console.log(`main.ts:30-${message}`);
});
// ========================================== REST API ================================================
app.get(`/io/${channel}`, (req, res) => {
    res.send({ message: 'Welcome to io-chat!' });
});
// ============================================ RUN ====================================================
server.listen(port, () => console.log(`Listening at http://localhost:${port}/io/${channel}`));
server.on('error', console.error);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map