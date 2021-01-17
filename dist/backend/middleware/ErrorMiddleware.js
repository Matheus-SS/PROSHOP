"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
var notFound = function (request, response, next) {
    var error = new Error("Not Found - " + request.originalUrl);
    response.status(404);
    next(error);
};
exports.notFound = notFound;
var errorHandler = function (error, _, response, next) {
    var statusCode = response.statusCode === 200 ? 500 : response.statusCode;
    response.status(statusCode);
    response.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? null : error.stack,
    });
};
exports.errorHandler = errorHandler;
