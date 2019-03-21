const Album = require('../models').Album;
const Artist = require('../models').Artist;

module.exports = {
    getAll(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Album.findAll({
                where: {ArtistId: req.params.artist_id},
                order: [['createdAt', 'DESC'],],
            }).then((albums) => res.status(200).send(albums))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));         
    },
    get(req, res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Album.findById(req.params.id)
            .then((album) =>{
                if(!album){
                    return res.status(404).send({
                        message: 'Album not found',
                    });
                }
                return res.status(200).send(album);
            })
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));        
    },
    post(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }
            return Album.create({
                album_name: req.body.album_name,
                album_releasedate: req.body.album_releasedate,
                album_likes: req.body.album_likes || 0,
                album_image: req.body.album_image,
                ArtistId: req.params.artist_id
            }).then((album) => res.status(201).send(album))
            .catch((error) => res.status(400).send(error));
        }).catch((error) => res.status(400).send(error));        
    },
    put(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }

            return Album.findById(req.params.id)
            .then((album)=>{
                if(!album){
                    return res.status(404).send({
                        message: 'Album not found',
                    });
                }
                return album.update({
                    album_name: req.body.album_name || album.album_name,
                    album_releasedate: req.body.album_releasedate || album.album_releasedate,
                    album_likes: req.body.album_likes || album.album_likes,                    
                    album_image: req.body.album_image || album.album_image,
                    ArtistId: req.params.artist_id || album.ArtistId
                }).then((album) => res.status(201).send(album))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));          
        }).catch((error) => res.status(400).send(error));
    },
    delete(req,res){
        return Artist.findById(req.params.artist_id)
        .then((artist) => {
            if(!artist){
                return res.status(404).send({
                    message: 'Artist not found',
                });
            }

            return Album.findById(req.params.id)
            .then((album)=>{
                if(!album){
                    return res.status(404).send({
                        message: 'Album not found',
                    });
                }
                return album.destroy()            
                .then((album) => res.status(200).send(album))
                .catch((error) => res.status(400).send(error));
            }).catch((error) => res.status(400).send(error));          
        }).catch((error) => res.status(400).send(error));
    },
};