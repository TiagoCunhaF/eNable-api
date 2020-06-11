import { DataTypes, Model } from 'sequelize';

class Notification extends Model {
  static init(sequelize) {
    super.init(
      {
        content: DataTypes.STRING,
        read: DataTypes.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Notification;
