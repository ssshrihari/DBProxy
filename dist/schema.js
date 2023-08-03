"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.models = void 0;
const sequelize_1 = require("sequelize");
exports.models = [
    {
        name: "Users",
        columns: {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
            },
            address: {
                type: sequelize_1.DataTypes.STRING,
            },
        }
    }
];
