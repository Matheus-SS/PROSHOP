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
exports.resetPassword = exports.sendForgotPasswordEmail = void 0;
var UserModel_1 = __importDefault(require("../models/UserModel"));
var UserTokenModel_1 = __importDefault(require("../models/UserTokenModel"));
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var sendEmailFake_1 = require("../utils/sendEmailFake");
var sendEmailReal_1 = require("../utils/sendEmailReal");
var date_fns_1 = require("date-fns");
var path_1 = __importDefault(require("path"));
exports.sendForgotPasswordEmail = express_async_handler_1.default(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, token, userToken, URL, templatePath;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = request.body.email;
                return [4 /*yield*/, UserModel_1.default.findOne({ email: email })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new Error('User not found');
                }
                return [4 /*yield*/, new UserTokenModel_1.default().generateToken()];
            case 2:
                token = _a.sent();
                return [4 /*yield*/, UserTokenModel_1.default.create({
                        resetPasswordToken: token,
                        user_id: user._id,
                    })];
            case 3:
                userToken = _a.sent();
                URL = process.env.APP_URL + "/reset-password?token=" + token;
                templatePath = path_1.default.resolve(__dirname, '..', 'views', 'forgot-password.hbs');
                if (!(process.env.NODE_ENV === 'development')) return [3 /*break*/, 5];
                return [4 /*yield*/, sendEmailFake_1.sendMailFake({
                        to: {
                            name: user.name,
                            email: user.email,
                        },
                        subject: 'Recuperação de senha',
                        templateData: {
                            file: templatePath,
                            variables: {
                                name: user.name,
                                link: URL,
                            },
                        },
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, sendEmailReal_1.sendMailReal({
                    to: {
                        name: user.name,
                        email: user.email,
                    },
                    subject: 'Recuperação de senha',
                    templateData: {
                        file: templatePath,
                        variables: {
                            name: user.name,
                            link: URL,
                        },
                    },
                })];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7: return [2 /*return*/, response
                    .status(200)
                    .json('Email enviado com sucesso, verifique sua caixa de entrada, lixo eletrônico ou spam')];
        }
    });
}); });
exports.resetPassword = express_async_handler_1.default(function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token, password, confirm_password, userToken, user, minutes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, token = _a.token, password = _a.password, confirm_password = _a.confirm_password;
                return [4 /*yield*/, UserTokenModel_1.default.findOne({ resetPasswordToken: token })];
            case 1:
                userToken = _b.sent();
                if (!userToken) {
                    throw Error('Token does not exists');
                }
                return [4 /*yield*/, UserModel_1.default.findById(userToken.user_id)];
            case 2:
                user = _b.sent();
                if (!user) {
                    throw Error('User does not exists');
                }
                if (userToken.createdAt) {
                    minutes = date_fns_1.differenceInMinutes(new Date(), userToken.createdAt);
                    //throw a error if token is greater than 30 minutes
                    if (minutes > 30) {
                        throw Error('Token expired');
                    }
                }
                if (password !== confirm_password) {
                    throw Error('Confirm password different from password');
                }
                user.password = password;
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, response.status(200).json('Password change successfully')];
        }
    });
}); });
