'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    user_names: DataTypes.STRING,
    user_lastnames: DataTypes.STRING,
    user_email: {type:DataTypes.STRING, unique: true},
    user_password: DataTypes.STRING,
    user_image: DataTypes.STRING,
    user_banner: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    models.User.hasMany(models.Post, {as: 'user_posts'});
    models.User.hasMany(models.Message, {as: 'user_messages'});
    models.User.hasMany(models.Playlist, {as: 'user_playlists'});
  };
  return User;
};