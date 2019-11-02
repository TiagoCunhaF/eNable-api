import { DataTypes, Model } from 'sequelize';

class ProjectTransaction extends Model {
  static init(sequelize) {
    super.init(
      {
        project_id: DataTypes.INTEGER,
        user_id: DataTypes.INTEGER,
        file_id: DataTypes.INTEGER,
        value: DataTypes.DECIMAL,
        transition_types_id: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.hasOne(models.Project, { foreignKey: 'project_id', as: 'project' });
    this.hasOne(models.User, { foreignKey: 'user_id', as: 'owner' });
    this.hasOne(models.File, { foreignKey: 'file_id', as: 'file' });
    this.hasOne(models.TransactionType, {
      foreignKey: 'project_id',
      as: 'TransactionType',
    });
  }
}

export default ProjectTransaction;
