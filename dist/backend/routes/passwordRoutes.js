"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ResetPasswordController_1 = require("../controllers/ResetPasswordController");
var passwordRouter = express_1.default.Router();
passwordRouter.post('/forgot-password', ResetPasswordController_1.sendForgotPasswordEmail);
passwordRouter.post('/reset', ResetPasswordController_1.resetPassword);
exports.default = passwordRouter;
