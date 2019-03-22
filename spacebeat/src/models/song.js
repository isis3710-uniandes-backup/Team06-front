'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    song_name: DataTypes.STRING,
    song_duration: DataTypes.INTEGER,
    song_likes: DataTypes.INTEGER
  }, {});
  
  Song.associate = function(models) {
    models.Song.belongsTo(models.Album,{
      onDelete: "CASCADE",      
      foreignKey:{
        allowNull: false
      }
    });
    models.Song.hasMany(models.PlaylistSong, {as: 'song_playlists'});   
  };
  return Song;
};
