## PASOS PARA LA EJECUCIÓN DEL FRONTEND (DOCKER):
##### Crear la imagen de docker
docker build -t angular
##### Correr la imagen de Angular en la misma red
docker run -d -it -p 80:80/tcp --name frontend --network red-consulti angular
