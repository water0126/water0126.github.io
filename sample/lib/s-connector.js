"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SConnector = exports.Methods = void 0;
var Methods;
(function (Methods) {
    Methods["Init"] = "init";
    Methods["JoinRoom"] = "joinRoom";
})(Methods = exports.Methods || (exports.Methods = {}));
var SConnector = (function () {
    function SConnector(parent, endpoint) {
        this.receiveHandler = function (e) {
            switch (e.data.method) {
                case Methods.Init:
                    SConnector.isSconnectorInit = true;
                    break;
                default: break;
            }
        };
        this.endpoint = "https://remote.interwater.biz";
        if (endpoint)
            this.endpoint = endpoint;
        this.rElement = document.createElement("iframe");
        this.rElement.setAttribute("allow", "camera; microphone; display-capture");
        this.rElement.setAttribute("style", "display:none");
        parent.appendChild(this.rElement);
        window.addEventListener("message", this.receiveHandler);
    }
    SConnector.prototype.joinRoom = function (join) {
        if (!join.roomName)
            console.error("roomName undefined error");
        if (!join.userName)
            console.error("userName undefined error");
        if (!join.roomName || !join.userName)
            return;
        this.rElement.setAttribute("src", this.endpoint);
        this.rElement.setAttribute("style", "width:100%;height:100%");
        this.sendToSconnector(Methods.JoinRoom, join);
    };
    SConnector.prototype.sendToSconnector = function (method, message) {
        var _this = this;
        var timeout = 10 * 1000;
        var interval = 500;
        var time = 0;
        var timer = setInterval(function () {
            time += interval;
            if (SConnector.isSconnectorInit) {
                clearInterval(timer);
                var remote = _this.rElement["contentWindow"];
                remote.postMessage(__assign(__assign({}, message), { method: method }), _this.endpoint);
            }
            else if (time > timeout) {
                clearInterval(timer);
                console.error("Time out Error.");
            }
            else {
                console.debug("wait initialize.");
            }
        }, 500);
    };
    return SConnector;
}());
exports.SConnector = SConnector;
//# sourceMappingURL=s-connector.js.map