var express = require('express');
var router = express.Router();
const userController = require('../controllers/user');
const postController = require('../controllers/post');
const artistController = require('../controllers/artist');
const albumController = require('../controllers/album');
const songController = require('../controllers/song');
const commentController = require('../controllers/comment');
const chatroomController = require('../controllers/chatroom');
const messageController = require('../controllers/message');
const playlistController = require('../controllers/playlist');
var middleware = require('./jwt/middleware');
var HandlerGenerator = require('./jwt/handlerGenerator');

// Static files on index.js of app will render front

//Authentication
router.post('/api/auth/', HandlerGenerator.login);

// User
router.get('/api/user/', middleware.checkToken, userController.getAll);
router.get('/api/user/:id', userController.get);
router.post('/api/user/', middleware.checkToken, userController.post);
router.put('/api/user/:id', middleware.checkToken, userController.put);
router.delete('/api/user/:id', middleware.checkToken, userController.delete);
router.get('/api/userbyname/:user_name', userController.getByName);
router.get('/api/userbyemail/:user_email', middleware.checkToken, userController.getByEmail);

// Friend
router.get('/api/user/:userfrom_id/friends', userController.getFriends);
router.post('/api/user/:userfrom_id/friends/:userto_id', userController.postFriend);
router.delete('/api/user/:userfrom_id/friends/:userto_id', userController.deleteFriend);

// Post
router.get('/api/user/:user_id/post/', middleware.checkToken, postController.getAll);
router.get('/api/user/:user_id/post/:id', middleware.checkToken, postController.get);
router.post('/api/user/:user_id/post/', middleware.checkToken,postController.post);
router.put('/api/user/:user_id/post/:id', middleware.checkToken, postController.put);
router.delete('/api/user/:user_id/post/:id', middleware.checkToken, postController.delete);

// Artist
router.get('/api/artist/', artistController.getAll);
router.get('/api/artist/:id', artistController.get);
router.post('/api/artist/',artistController.post);
router.put('/api/artist/:id',  artistController.put);
router.delete('/api/artist/:id', artistController.delete);
router.get('/api/artistbyidentifier/:artist_identifier', artistController.getByIdentifier);
router.get('/api/artistbyname/:artist_name', artistController.getByName);

// Album
router.get('/api/artist/:artist_id/album/', albumController.getAll);
router.get('/api/artist/:artist_id/album/:id', albumController.get);
router.post('/api/artist/:artist_id/album/', albumController.post);
router.put('/api/artist/:artist_id/album/:id', albumController.put);
router.delete('/api/artist/:artist_id/album/:id', albumController.delete);
router.get('/api/albumbyidentifier/:album_identifier',albumController.getByIdentifier);
router.get('/api/albumbyname/:album_name',albumController.getByName);

// Song
router.get('/api/artist/:artist_id/album/:album_id/song', songController.getAll);
router.get('/api/artist/:artist_id/album/:album_id/song/:id',  songController.get);
router.post('/api/artist/:artist_id/album/:album_id/song',  songController.post);
router.put('/api/artist/:artist_id/album/:album_id/song/:id',  songController.put);
router.delete('/api/artist/:artist_id/album/:album_id/song/:id',songController.delete);
router.get('/api/songbyidentifier/:song_identifier', songController.getByIdentifier);
router.get('/api/songbyname/:song_name',  songController.getByName);

// Playlist
router.get('/api/user/:user_id/playlist/', playlistController.getAll);
router.get('/api/user/:user_id/playlist/:id', playlistController.get);
router.post('/api/user/:user_id/playlist/',  playlistController.post);
router.put('/api/user/:user_id/playlist/:id', playlistController.put);
router.delete('/api/user/:user_id/playlist/:id', playlistController.delete);

// Song in playlists

router.get('/api/user/:user_id/playlist/:playlist_id/song', songController.getAllFromPlaylist);
router.get('/api/user/:user_id/playlist/:playlist_id/song/:id', songController.getFromPlaylist);
router.post('/api/user/:user_id/playlist/:playlist_id/song/:id', songController.postOnPlaylist);
router.delete('/api/user/:user_id/playlist/:playlist_id/song/:id', songController.deleteFromPlaylist);

// Comment
router.get('/api/user/:user_id/post/:post_id/comment', commentController.getAll);
router.get('/api/user/:user_id/post/:post_id/comment/:id', commentController.get);
router.post('/api/user/:user_id/post/:post_id/comment', commentController.post);
router.put('/api/user/:user_id/post/:post_id/comment/:id', commentController.put);
router.delete('/api/user/:user_id/post/:post_id/comment/:id', commentController.delete);

// Chatroom
router.get('/api/user/:user_id/chatroom', chatroomController.getAll);
router.get('/api/user/:user_id/chatroom/:id', chatroomController.get);
router.post('/api/user/:user_id/chatroom', chatroomController.post);
router.put('/api/user/:user_id/chatroom/:id', chatroomController.put);
router.delete('/api/user/:user_id/chatroom/:id', chatroomController.delete);

// Message
router.get('/api/user/:user_id/chatroom/:chatroom_id/message',  middleware.checkToken, messageController.getAll);
router.get('/api/user/:user_id/chatroom/:chatroom_id/message/:id', middleware.checkToken, messageController.get);
router.post('/api/user/:user_id/chatroom/:chatroom_id/message', middleware.checkToken, messageController.post);
router.put('/api/user/:user_id/chatroom/:chatroom_id/message/:id', middleware.checkToken, messageController.put);
router.delete('/api/user/:user_id/chatroom/:chatroom_id/message/:id',  middleware.checkToken, messageController.delete);

module.exports = router;