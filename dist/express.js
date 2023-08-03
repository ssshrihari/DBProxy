"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
exports.app = (0, express_1.default)();
const port = 3001;
exports.app.use(express_1.default.json());
exports.app.use("/", routes_1.router);
function startServer(dbProxy) {
    exports.app.set("dbProxy", dbProxy);
    exports.app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}
exports.startServer = startServer;
