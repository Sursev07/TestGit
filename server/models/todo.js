'use strict';
module.exports = (sequelize, DataTypes) => {
  const ToDo = sequelize.define('ToDo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    due_date: DataTypes.DATE,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      },
    },
  }, {});
  ToDo.associate = function(models) {
    // associations can be defined here
    ToDo.belongsTo(models.User, { foreignKey: 'id', onDelete: 'cascade', hooks: 'true' });
  };
  return ToDo;
};