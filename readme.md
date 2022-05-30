# Docker api web

## Lenguaje y Base de datos usadas
* JavaScript con NodeJS
* MySQL




## Como usar

 Para iniciar la aplicacion, dentro de la carpeta del proyecto usamos:

`docker-compose up`

Se usará curl para realizar las peticiones hacia el puerto 8000 del servidor web, estas peticiones serán de la forma `Content-Type: application/x-www-form-urlencoded`
### Nota: se usará la dirección que indique playwithdocker a la hora de iniciar la aplicación 
## Comprobar conexion a base de datos

`curl http://ip172-18-0-26-caaf7nc33d5g009rlhr0-8000.direct.labs.play-with-docker.com/`

## Crear usuario
`curl -X POST http://ip172-18-0-26-caaf7nc33d5g009rlhr0-8000.direct.labs.play-with-docker.com/ -H "Content-Type: application/x-www-form-urlencoded"   -d "nombreDeUsuario='augusto'&clave='12'&idEvento=2" `

## Autenticar usuario

`curl -X POST http://ip172-18-0-26-caaf7nc33d5g009rlhr0-8000.direct.labs.play-with-docker.com/login -H "Content-Type: application/x-www-form-urlencoded"   -d "nombreDeUsuario='augusto'&clave='12'&idEvento=2"`

## Borrar todos los usuarios

`curl -X DELETE http://ip172-18-0-26-caaf7nc33d5g009rlhr0-8000.direct.labs.play-with-docker.com/`

## Cargar usuarios desde archivo csv

Se podrá usar el archivo "datos.csv" para probar esta función

`curl -F users=@datos.csv http://ip172-18-0-26-caaf7nc33d5g009rlhr0-8000.direct.labs.play-with-docker.com/import`

Si no se hace uso de "datos.csv", reemplazar la ruta del archivo despues del @


## Estructura tabla usuario

`create table IF NOT EXISTS usuario (
	idUsuario INT NOT NULL AUTO_INCREMENT,
    nombreDeUsuario VARCHAR(20) NOT NULL,
    clave VARCHAR(50) NOT NULL ,
    idEvento VARCHAR(50) NOT NULL,
    PRIMARY KEY (idUsuario) 
);`
