"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var generateToken = function (id) {
    return jsonwebtoken_1.default.sign({ id: id }, process.env.JWT_SECRET || 'default', {
        expiresIn: '1d',
    });
};
exports.default = generateToken;
