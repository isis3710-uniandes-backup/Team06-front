let jwt = require( 'jsonwebtoken' );
const config = require( './config.js' );

// Función encargada de realizar la validación del token y que es directamente consumida por server.js
let checkToken = ( req, res, next ) => {
  
  // Extrae el token de la solicitud enviado a través de cualquiera de los dos headers especificados
  // Los headers son automáticamente convertidos a lowercase
  let token = req.headers[ 'x-access-token' ] || req.headers[ 'authorization' ];
  
  // Si existe algún valor para el token, se analiza
  // de lo contrario, un mensaje de error es retornado
  if( token ) {

    // Si el token incluye el prefijo 'Bearer ', este debe ser removido
    if ( token.startsWith( 'Bearer ' ) ) {
        token = token.slice(7, token.length );
        // Llama la función verify del paquete jsonwebtoken que se encarga de realizar la validación del token con el secret proporcionado
        jwt.verify( token, config.secret, ( err, decoded ) => {
      
        // Si no pasa la validación, un mensaje de error es retornado
        // de lo contrario, permite a la solicitud continuar
        if( err ) {
          res.sendStatus( 403 ).json( {
            success: false,
            message: 'Authentication failed! Please check the request'
          } );
          res.end();
        } else {
          req.decoded = decoded;
          next();
        }
      } );
    }
  } else {
    
    res.sendStatus( 403 ).json( {
      success: false,
      message: 'Authentication failed! Please check the request'
    } );
    res.end();

  }

};

module.exports = {
  checkToken: checkToken
}