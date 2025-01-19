## Folders
- Prueba-club:
  Aplicación global
- Prueba-notifications:
  Microservicio que gestiona las notificaciones, inicialmente solo email. Funciona como un cliente de un Rabittmq que se levanta al ejecutar el compose
- Mysql:
  Carpeta donde se aloja los scripts y la configuración de la base de datos


## Running the containers

```bash
docker-compose up --build
```
## Información
- Cada aplicación se puede ejecutar independientemente siempre que se tenga tanto la bd como el rabittmq, y se establezcan las conexiones en los ficheros .env de cada carpeta. 

- Hay un script de pruebas en la carpeta [mysql/scripts](mysql/scripts/init.sql), para el caso de que se ejecute en local y no usando el contenedor y creando la base de datos: prueba_club

- La aplicación una vez levantada, tiene accesible un swagger para testearla, en la siguiente url: /swagger-doc.json
  
- Colección de [postman](postman_collection.json)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test (pending)

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Asier Fernández](asierfd@msn.com)

## License

Esta prueba es [MIT licensed](LICENSE).
