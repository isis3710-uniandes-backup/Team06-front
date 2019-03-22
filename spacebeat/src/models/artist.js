'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    artist_name: DataTypes.STRING,
    artist_genre: DataTypes.STRING,
    artist_likes: DataTypes.INTEGER,
    artist_image: DataTypes.STRING
  }, {});
  Artist.associate = function(models) {
    models.Artist.hasMany(models.Album,{as: 'artist_albums'});
  };
  return Artist;
};