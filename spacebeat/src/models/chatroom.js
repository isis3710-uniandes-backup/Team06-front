'use strict';
module.exports = (sequelize, DataTypes) => {
  const Chatroom = sequelize.define('Chatroom', {
    chatroom_name: DataTypes.STRING
  }, {});
  Chatroom.associate = function(models) {
    models.Chatroom.belongsTo(models.User,{
      onDelete: "CASCADE",     
      foreignKey:{
        allowNull: false
      }
    });
    models.Chatroom.hasMany(models.Message,{as: 'artist_messages'});
  };
  return Chatroom;
};