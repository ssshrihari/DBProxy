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
exports.DbProxy = void 0;
const sequelize_1 = require("sequelize");
const schema_1 = require("./schema");
class DbProxy {
    constructor() {
        this.modelsMap = {};
        this.sequelize = new sequelize_1.Sequelize({
            dialect: 'sqlite',
            storage: 'database.sqlite', // The name of the SQLite database file.
        });
    }
    loadDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const model of schema_1.models) {
                this.modelsMap[model.name] = this.sequelize.define(model.name, model.columns);
            }
            yield this.sequelize.sync({ alter: true });
        });
    }
    ;
    createRow(modelName, rowContent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidModel(modelName)) {
                throw new Error("Invalid collection name");
            }
            return this.modelsMap[modelName].create(rowContent);
        });
    }
    deleteRow(modelName, rowId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidModel(modelName)) {
                throw new Error("Invalid collection name");
            }
            return this.modelsMap[modelName].destroy({
                where: {
                    [this.modelsMap[modelName].primaryKeyAttribute]: rowId
                }
            });
        });
    }
    updateRow(modelName, rowId, rowContent) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidModel(modelName)) {
                throw new Error("Invalid collection name");
            }
            return this.modelsMap[modelName].update(rowContent, {
                where: {
                    [this.modelsMap[modelName].primaryKeyAttribute]: rowId
                }
            });
        });
    }
    getRow(modelName, rowId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(rowId);
            if (!this.isValidModel(modelName)) {
                throw new Error("Invalid collection name");
            }
            return this.modelsMap[modelName].findByPk(rowId);
        });
    }
    closeDatabase() {
        return this.sequelize.close();
    }
    isValidModel(modelName) {
        return Object.keys(this.modelsMap).includes(modelName);
    }
}
exports.DbProxy = DbProxy;
