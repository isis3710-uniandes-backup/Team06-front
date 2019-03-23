## Entrega 3 Proyecto WEB

Los recursos creados sobre el proyecto fueron implementados, de una vez, sobre una base de datos PostgreSQL que está en la máquina virtual
del estudiante Nicolás Hernández (nm.hernandez10). La IP de la máquina con la base de datos es 172.24.41.67. Esta máquina está en la red local
de la Universidad de los Andes, por tanto, cuando se haga el uso y le ejecución de este proyecto, debe estarse conectado en dicha red
físicamente o por medio de una VPN.

Los elementos de la entrega están distribuidos de la siguiente manera:

- La carpeta ./src/routes tiene en el archivo index.js todas las rutas de los servicios CRUD para cada uno de los 9 recursos.
- La carpeta ./src/models tiene los modelos de cada uno de los 9 recursos con los atributos y relaciones respectivas.
- La carpeta ./src/controllers tiene los métodos relacionados a cada ruta creada para realizar el servicio CRUD respectivo.
- La carpeta ./postman tiene el archivo .json con las pruebas de postman funcionales.

## How to run this project?

1. npm install
2. npm start

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

## Configurations PostgreSQL

(These steps are not for running this project. Do NOT follow these instructions.)

1. Install sequelize
2. Install sequelize-auto-migrations
3. Install pg (npm install --save pg pg-hstore)
4. Inicializar Sequelize (../node_modules/.bin/sequelize init)
4. Create model files on /models
5. Create migrations (node ../node_modules/sequelize-auto-migrations/bin/makemigration)
6. [if PostgreSQL run on remote devices] Create Firewall Rule incoming to allow connections on port 5432.
7. [if PostgreSQL run on remote devices] C://program files/postgress/11/data and add: (host    all             all      0.0.0.0/0            md5)
8. [if PostgreSQL run on remote devices] Restart PostgreSQL: Open Run Window by Winkey + R -> Type services.msc -> Search PostgreSQL service -> Restart
9. Allow following privileges to user of postgres: Can login? & Create Databases
8. Run migrations (node ../node_modules/sequelize-auto-migrations/bin/runmigration)