import { DataTypes, Model } from 'sequelize';

class ContributionType extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ContributionType;
