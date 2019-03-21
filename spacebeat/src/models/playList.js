'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    playlist_name: DataTypes.STRING,
  }, {});
  Playlist.associate = function(models) {
    models.Playlist.belongsTo(models.User,{
      onDelete: "CASCADE",     
      foreignKey:{
        allowNull: false
      }
    });
    models.Playlist.hasMany(models.PlaylistSong, {as: 'playlist_songs'});
  };
  return Playlist;
};
