let jwt = require( 'jsonwebtoken' );
let config = require( './config' );

// Clase encargada de la creación del token

module.exports = {
  login(req, res) {
    let username = req.body.username;
    console.log(username);
        // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
        let token = jwt.sign( { username: username },
          config.secret, { expiresIn: '24h' } );
        
        // Retorna el token el cuál debe ser usado durante las siguientes solicitudes
        res.json( {
          success: true,
          message: 'Authentication successful!',
          token: token
        });
  }
};