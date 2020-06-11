module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('project_transactions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: Sequelize.INTEGER,
        references: { model: 'projects', key: 'id' },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
      },
      file_id: {
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        allowNull: true,
      },
      value: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      transition_types_id: {
        type: Sequelize.INTEGER,
        references: { model: 'transaction_types', key: 'id' },
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('project_transactions');
  },
};
