"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UserModel_1 = require("./UserModel");
var ShippingAddressSchema = new mongoose_1.default.Schema({
    user: UserModel_1.UserSchema,
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
var ShippingAddress = mongoose_1.default.model('ShippingAddress', ShippingAddressSchema);
exports.default = ShippingAddress;
