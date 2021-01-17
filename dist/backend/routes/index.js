"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productRoutes_1 = __importDefault(require("./productRoutes"));
var userRoutes_1 = __importDefault(require("./userRoutes"));
var shippingAddressRoutes_1 = __importDefault(require("./shippingAddressRoutes"));
var passwordRoutes_1 = __importDefault(require("./passwordRoutes"));
var routes = express_1.Router();
routes.use('/api/products', productRoutes_1.default);
routes.use('/api/users', userRoutes_1.default);
routes.use('/api/address', shippingAddressRoutes_1.default);
routes.use('/api/password', passwordRoutes_1.default);
exports.default = routes;
