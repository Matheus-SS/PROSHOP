"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var UserController_1 = require("../controllers/UserController");
var AuthenticationMiddleware_1 = require("../middleware/AuthenticationMiddleware");
var userRouter = express_1.default.Router();
userRouter.post('/', UserController_1.createUser);
userRouter.post('/login', UserController_1.authenticateUser);
userRouter.get('/profile', AuthenticationMiddleware_1.protect, UserController_1.getUserProfile);
userRouter.put('/profile', AuthenticationMiddleware_1.protect, UserController_1.updateUserProfile);
exports.default = userRouter;
