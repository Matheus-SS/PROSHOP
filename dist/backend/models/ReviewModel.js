"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = exports.Review = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var ReviewSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.ReviewSchema = ReviewSchema;
var Review = mongoose_1.default.model('Review', ReviewSchema);
exports.Review = Review;
