"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ShippingAddressController_1 = require("../controllers/ShippingAddressController");
var AuthenticationMiddleware_1 = require("../middleware/AuthenticationMiddleware");
var shippingAddressRouter = express_1.default.Router();
shippingAddressRouter.post('/', AuthenticationMiddleware_1.protect, ShippingAddressController_1.createShippingAddress);
shippingAddressRouter.get('/', AuthenticationMiddleware_1.protect, ShippingAddressController_1.getUserShippingAddress);
shippingAddressRouter.put('/', AuthenticationMiddleware_1.protect, ShippingAddressController_1.updateShippingAddress);
exports.default = shippingAddressRouter;
