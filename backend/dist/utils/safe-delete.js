"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var safeDelete = function (link) {
    try {
        if (!link || !fs_1.default.existsSync(link))
            return;
        fs_1.default.unlinkSync(link);
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = safeDelete;
