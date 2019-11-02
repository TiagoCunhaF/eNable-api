import { DataTypes, Model } from 'sequelize';

class TransactionType extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        debit_credit: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default TransactionType;
