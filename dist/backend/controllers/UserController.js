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
exports.updateUserProfile = exports.createUser = exports.getUserProfile = exports.authenticateUser = void 0;
var generateToken_1 = __importDefault(require("../utils/generateToken"));
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var UserModel_1 = __importDefault(require("../models/UserModel"));
var ShippingAddressModel_1 = __importDefault(require("../models/ShippingAddressModel"));
// @desc       Authenticate user & get token
// @route      POST /api/users/login
// @access     Public
exports.authenticateUser = express_async_handler_1.default(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, matchedPassword;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, email = _a.email, password = _a.password;
                return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
            case 1:
                user = _b.sent();
                if (!user) {
                    response.status(404);
                    throw new Error('Incorrect email/password combination.');
                }
                return [4 /*yield*/, user.matchPassword(password)];
            case 2:
                matchedPassword = _b.sent();
                if (!matchedPassword) {
                    response.status(404);
                    throw new Error('Incorrect email/password combinantion.');
                }
                return [2 /*return*/, response.status(200).json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: generateToken_1.default(user._id),
                    })];
        }
    });
}); });
// @desc       Get user profile
// @route      GET /api/users/profile
// @access     Private
exports.getUserProfile = express_async_handler_1.default(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserModel_1.default.findById(request.userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    response.status(404);
                    throw new Error('User not found');
                }
                return [2 /*return*/, response.status(200).json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    })];
        }
    });
}); });
// @desc       Register a new user
// @route      POST /api/users
// @access     Public
exports.createUser = express_async_handler_1.default(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, isUser, user;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, name = _a.name, email = _a.email, password = _a.password;
                return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
            case 1:
                isUser = _b.sent();
                if (isUser) {
                    response.status(404);
                    throw new Error('User already exists');
                }
                return [4 /*yield*/, UserModel_1.default.create({
                        name: name,
                        email: email,
                        password: password,
                    })];
            case 2:
                user = _b.sent();
                return [2 /*return*/, response.status(200).json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                        token: generateToken_1.default(user._id),
                    })];
        }
    });
}); });
// @desc       Update user profile
// @route      PUT /api/users/profile
// @access     Private
exports.updateUserProfile = express_async_handler_1.default(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userWithUpdatedEmail, parseIdToString, updatedUser, shippingAddress, newUpdatedUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, UserModel_1.default.findById(request.userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    response.status(404);
                    throw new Error('User not found');
                }
                return [4 /*yield*/, UserModel_1.default.findOne({
                        email: request.body.email,
                    })];
            case 2:
                userWithUpdatedEmail = _a.sent();
                parseIdToString = String(userWithUpdatedEmail === null || userWithUpdatedEmail === void 0 ? void 0 : userWithUpdatedEmail._id);
                if (userWithUpdatedEmail && parseIdToString !== request.userId) {
                    throw new Error('Email already in use');
                }
                user.name = request.body.name || user.name;
                user.email = request.body.email || user.email;
                if (request.body.password) {
                    user.password = request.body.password;
                }
                return [4 /*yield*/, user.save()];
            case 3:
                updatedUser = _a.sent();
                return [4 /*yield*/, ShippingAddressModel_1.default.findOne({
                        'user._id': request.userId,
                    })];
            case 4:
                shippingAddress = _a.sent();
                if (!shippingAddress) return [3 /*break*/, 6];
                newUpdatedUser = updatedUser.toObject();
                shippingAddress.user = newUpdatedUser;
                return [4 /*yield*/, shippingAddress.save()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/, response.status(200).json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    isAdmin: updatedUser.isAdmin,
                    token: generateToken_1.default(updatedUser._id),
                })];
        }
    });
}); });
