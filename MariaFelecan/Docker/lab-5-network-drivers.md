* volume mounting

    volume mounting is a feature in Docker that allows you to share files or directories between the host (your local machine) and the container. This enables you to persist data, share files, or modify container files without needing to rebuild the image

    -v /root/app-1:/usr/share/nginx/html

    The -v option maps the host directory /root/app-1 to the container directory /usr/share/nginx/html.
    This means that any files present in /root/app-1 on the host will be accessible from /usr/share/nginx/html within the container


Send get request from app-1 to app-2 :
docker exec app-1 sh -c 'curl -sS app-2'

Send get request from app-1 to app-2 using its IP address:
docker exec app-1 sh -c 'curl -sS 172.17.0.3'

List information about the network:
docker network inspect bridge

* creating a new network:

    docker network create name

* disconecting a container from a network

    docker network disconnect bridge app-1

* connecting a conainer to a network

    docker network connect bridge-network app-1

* send get request from app-1 to app-2 :

    docker exec app-1 sh -c 'curl -sS app-2'

* send get request from app-1 to app-2 using its IP address:

    docker exec app-1 sh -c 'curl -sS 172.18.0.3'

* removing a container

    docker rm -f app-1

    or

    docker stop app-1 \
    && \
    docker rm app-1

* send get request to localhost:80

    curl localhost:80


