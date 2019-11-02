import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import User from '../app/models/User';
import File from '../app/models/File';
import Project from '../app/models/Project';
import TransactionType from '../app/models/TransactionType';
import ContributionType from '../app/models/ContributionType';
import ProjectTransaction from '../app/models/ProjectTransaction';

import datatabaseConfig from '../config/database';

const models = [
  User,
  File,
  Project,
  ProjectTransaction,
  TransactionType,
  ContributionType,
];
class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(datatabaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
    });
  }
}

export default new Database();
