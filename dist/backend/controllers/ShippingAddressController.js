"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShippingAddress = exports.getUserShippingAddress = exports.createShippingAddress = void 0;
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var ShippingAddressModel_1 = __importDefault(require("../models/ShippingAddressModel"));
var UserModel_1 = __importDefault(require("../models/UserModel"));
// @desc       Register a new address
// @route      POST /api/address
// @access     Private
exports.createShippingAddress = express_async_handler_1.default(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, address, city, postalCode, country, user, isUserAlreadyHaveAddress, shippingAddress, newShippingAddress;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, address = _a.address, city = _a.city, postalCode = _a.postalCode, country = _a.country;
                return [4 /*yield*/, UserModel_1.default.findById(request.userId)];
            case 1:
                user = _b.sent();
                if (!user) {
                    response.status(404);
                    throw new Error('User not found');
                }
                return [4 /*yield*/, ShippingAddressModel_1.default.findOne({
                        'user._id': request.userId,
                    })];
            case 2:
                isUserAlreadyHaveAddress = _b.sent();
                if (isUserAlreadyHaveAddress) {
                    throw new Error('User already has a registered address');
                }
                return [4 /*yield*/, ShippingAddressModel_1.default.create({
                        address: address,
                        city: city,
                        country: country,
                        postalCode: postalCode,
                        user: user,
                    })];
            case 3:
                shippingAddress = _b.sent();
                newShippingAddress = shippingAddress.toObject();
                delete newShippingAddress.user.password;
                // show the shipping address without password field
                return [2 /*return*/, response.status(200).json(newShippingAddress)];
        }
    });
}); });
// @desc       Get user address
// @route      GET /api/address
// @access     Private
exports.getUserShippingAddress = express_async_handler_1.default(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, shippingAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserModel_1.default.findById(request.userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    response.status(404);
                    throw new Error('User not found');
                }
                return [4 /*yield*/, ShippingAddressModel_1.default.findOne({
                        'user._id': request.userId,
                    }).select('-__v -user.password -user.__v')];
            case 2:
                shippingAddress = _a.sent();
                if (!shippingAddress) {
                    throw new Error('User does not have a registered address, please register a address');
                }
                return [2 /*return*/, response.status(200).json(shippingAddress)];
        }
    });
}); });
// @desc       Update Shipping Address
// @route      PUT /api/address
// @access     Private
exports.updateShippingAddress = express_async_handler_1.default(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, shippingAddress, updatedShippingAddress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserModel_1.default.findById(request.userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    response.status(404);
                    throw new Error('User not found');
                }
                return [4 /*yield*/, ShippingAddressModel_1.default.findOne({
                        'user._id': request.userId,
                    }).select('-__v -user.password -user.__v')];
            case 2:
                shippingAddress = _a.sent();
                if (!shippingAddress) {
                    throw new Error('User does not have a registered address, please register a address');
                }
                shippingAddress.address = request.body.address || shippingAddress.address;
                shippingAddress.city = request.body.city || shippingAddress.city;
                shippingAddress.postalCode =
                    request.body.postalCode || shippingAddress.postalCode;
                shippingAddress.country = request.body.country || shippingAddress.country;
                return [4 /*yield*/, shippingAddress.save()];
            case 3:
                updatedShippingAddress = _a.sent();
                return [2 /*return*/, response.status(200).json(updatedShippingAddress)];
        }
    });
}); });
