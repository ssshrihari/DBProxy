import { ModelCtor, Sequelize } from "sequelize";
import { models } from "./schema";

export class DbProxy {

  private sequelize;
  private modelsMap: { [id: string]: ModelCtor<any> };

  constructor() {
    this.modelsMap = {};
    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'database.sqlite', // The name of the SQLite database file.
    });
  }

  async loadDatabase(): Promise<void> {
    for (const model of models) {
      this.modelsMap[model.name] = this.sequelize.define(model.name, model.columns);
    }
    await this.sequelize.sync({ alter: true });
  };

  async createRow(modelName: string, rowContent: any) {
    if (!this.isValidModel(modelName)) {
      throw new Error("Invalid collection name");
    }
    return this.modelsMap[modelName].create(rowContent);
  }

  async deleteRow(modelName: string, rowId: string) {
    if (!this.isValidModel(modelName)) {
      throw new Error("Invalid collection name");
    }
    return this.modelsMap[modelName].destroy({
      where: {
        [this.modelsMap[modelName].primaryKeyAttribute]: rowId
      }
    })
  }

  async updateRow(modelName: string, rowId: string, rowContent: any) {
    if (!this.isValidModel(modelName)) {
      throw new Error("Invalid collection name");
    }
    return this.modelsMap[modelName].update(
      rowContent,
      {
        where: {
          [this.modelsMap[modelName].primaryKeyAttribute]: rowId
        }
      })
  }

  async getRow(modelName: string, rowId: string) {
    console.log(rowId)

    if (!this.isValidModel(modelName)) {
      throw new Error("Invalid collection name");
    }
    return this.modelsMap[modelName].findByPk(rowId);
  }

  closeDatabase(): Promise<void> {
    return this.sequelize.close();
  }

  isValidModel(modelName: string) {
    return Object.keys(this.modelsMap).includes(modelName);
  }
}