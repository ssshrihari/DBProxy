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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const express_1 = require("./express");
const dbProxy = new db_1.DbProxy();
dbProxy.loadDatabase().then(() => {
    (0, express_1.startServer)(dbProxy);
});
// Gracefully close the database connection when the server is terminated.
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Closing database connection");
    yield dbProxy.closeDatabase();
    console.log("Exiting the process");
    process.exit();
}));
