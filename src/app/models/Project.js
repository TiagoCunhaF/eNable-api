import { DataTypes, Model } from 'sequelize';

class Project extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        status: DataTypes.STRING,
        dateStart: DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.hasMany(models.ProjectTransaction, {
      foreignKey: 'project_id',
      as: 'trasactions',
    });
  }
}

export default Project;
