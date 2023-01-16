"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorModel = /** @class */ (function () {
    function errorModel(status, message) {
        this.status = status;
        this.message = message;
    }
    return errorModel;
}());
exports.default = errorModel;
