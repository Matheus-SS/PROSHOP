"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
require("colorts/lib/string");
var ErrorMiddleware_1 = require("./middleware/ErrorMiddleware");
var database_1 = __importDefault(require("./config/database"));
var path_1 = __importDefault(require("path"));
var routes_1 = __importDefault(require("./routes"));
database_1.default();
var app = express_1.default();
app.use(express_1.default.json());
app.use(routes_1.default);
var __dirname = path_1.default.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.join(__dirname, 'frontend/build')));
    app.get('*', function (request, response) {
        return response.sendFile(path_1.default.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
else {
    app.get('/', function (request, response) {
        response.send('API is running...');
    });
}
// handling with status error 404
app.use(ErrorMiddleware_1.notFound);
// handling with status error 500
app.use(ErrorMiddleware_1.errorHandler);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
    console.log(("Server running in " + process.env.NODE_ENV + " mode on port " + PORT).yellow.bold);
});
