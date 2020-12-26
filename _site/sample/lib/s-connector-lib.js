(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SConnector = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
exports.Methods = void 0;
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
exports.default = SConnector;

},{}]},{},[1])(1)
});
