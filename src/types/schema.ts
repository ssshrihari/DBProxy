import { DataType, ModelAttributeColumnOptions } from "sequelize";

export interface ModelDefinition {
    name: string;
    columns: { [id: string]: DataType | ModelAttributeColumnOptions }
}
