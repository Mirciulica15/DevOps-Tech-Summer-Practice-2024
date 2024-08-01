Run a new MySQL container with the following command.

 docker container run \
 --detach \
 --name mydb \
 -e MYSQL_ROOT_PASSWORD=my-secret-pw \
 mysql:latest
--detach will run the container in the background.
--name will name it mydb.
-e will use an environment variable to specify the root password (NOTE: This should never be done in production).


 docker container logs mydb
This shows the logs from the MySQL Docker container.

 docker exec -it mydb \
 mysql --user=root --password=$MYSQL_ROOT_PASSWORD --version
You will see the MySQL version number, as well as a handy warning


### mongodb

spring.data.mongodb.uri=${MONGODB_URI:mongodb://localhost:27017/todo}
server.port=${PORT:8080}