* we build the image by:
    docker build -t app-image .

* run container with default commands:
    docker run --rm app-image

* to inspect the cmd of an image named 'cmd-echo' : 
    docker inspect cmd-echo | jq .[0].ContainerConfig.Cmd

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
