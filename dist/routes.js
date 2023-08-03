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
exports.router = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
exports.router = router;
router.post('/:collection', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const app = request.app;
    const collection = request.params.collection;
    const dbProxy = app.get("dbProxy");
    try {
        const row = yield dbProxy.createRow(collection, request.body);
        response.send(row);
    }
    catch (e) {
        response.status(400).json({ error: e.message });
    }
}));
router.get('/:collection/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const app = request.app;
    const collection = request.params.collection;
    const dbProxy = app.get("dbProxy");
    try {
        response.send(yield dbProxy.getRow(collection, request.params.id));
    }
    catch (e) {
        response.status(400).json({ error: e.message });
    }
}));
router.post('/:collection/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const app = request.app;
    const collection = request.params.collection;
    const rowId = request.params.id;
    const body = request.body;
    const dbProxy = app.get("dbProxy");
    try {
        response.send(yield dbProxy.updateRow(collection, rowId, request.body));
    }
    catch (e) {
        response.status(400).json({ error: e.message });
    }
}));
router.delete('/:collection/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const app = request.app;
    const collection = request.params.collection;
    const rowId = request.params.id;
    const dbProxy = app.get("dbProxy");
    try {
        yield dbProxy.deleteRow(collection, rowId);
        response.status(200);
    }
    catch (e) {
        response.status(400).json({ error: e.message });
    }
}));
