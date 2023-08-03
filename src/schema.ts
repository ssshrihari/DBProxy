import { DataTypes } from "sequelize";
import { ModelDefinition } from "./types/schema";

export const models: ModelDefinition[] = [
    {
        name: "Users",
        columns: {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
            },
            address: {
                type: DataTypes.STRING,
            },
        }
    }
]