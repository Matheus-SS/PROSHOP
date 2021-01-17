"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var ProductController_1 = require("../controllers/ProductController");
var productRouter = express_1.default.Router();
// @desc       Fetch all products
// @route      GET /api/products
// @access     Public
productRouter.get('/', ProductController_1.getProducts);
// @desc       Fetch single products
// @route      GET /api/products/:id
// @access     Public
productRouter.get('/:id', ProductController_1.getProductById);
exports.default = productRouter;
