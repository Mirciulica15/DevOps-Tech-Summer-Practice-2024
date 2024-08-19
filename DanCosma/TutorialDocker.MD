# Building an Docker Container from scratch

Create a new file /root/Dockerfile to build a container image from. It should:

    use bash as base
    run ping killercoda.com

Build the image and tag it as pinger .

Run the image (create a container) named my-ping .

First off we create and acces the Dockerfile file

#### vim Dockerfile

Then we add in the file

#### FROM bash
#### CMD ["ping", "killercoda.com"]


After that we build the image: 

#### docker build -t pinger
#### docker image ls

Run the image:

#### docker run --name my-ping pinger


### Pushing an image to the registry:

## Prentru a iesi dintr-un container initializat apasam CTRL+C.

Tag the image, which is currently tagged as pinger , also as local-registry:5000/pinger .

Then push the image into the local registry.

**docker tag pinger local-registry:5000/pinger**

**docker image ls**

**docker push local-registry:5000/pinger**

## Push image with custom tag to registry

Without specifying a :tag , the default :latest will be used. Now we want to use tag :v1 instead.

Tag the image, which is currently tagged as pinger , also as pinger:v1 and local-registry:5000/pinger:v1 .

Then push the image into the local registry.

**docker tag pinger pinger:v1**

**docker tag pinger local-registry:5000/pinger:v1**

**docker image ls**

**docker push local-registry:5000/pinger:v1**

# Using CMD and ENTRYPOINT in Dockerfile

## Using CMD

Build image cmd-echo using /root/Dockerfile . Check what is CMD of the newly created cmd-echo image.

Run the cmd-echo container:

    Don't modify Dockerfile
    Overwrite CMD with date via CLI
    Set the ENTRYPOINT to date via CLI

There can only be one CMD instruction in a Dockerfile.
If you list more than one CMD, only the last one takes effect.

The purpose of a CMD is to provide defaults for an executing container.

However, it can be used as a way to provide an executable and defaults.

Solution:

Build docker image /root/Dockerfile :

docker build -t cmd-echo .


Explore CMD of cmd-echo :

docker inspect cmd-echo | jq .[0].ContainerConfig.Cmd


Run the container with default values:

docker run --rm cmd-echo


Run the container with updated CMD command:

docker run --rm cmd-echo date


Run the container with ENTRYPOINT date :

docker run --rm --entrypoint date cmd-echo

## Using ENTRYPOINT

Remove CMD command from Dockerfile and add ENTRYPOINT command that will run the same echo hi, from container! command.

Build image entrypoint-echo using /root/Dockerfile. Check what is ENTRYPOINT  of the newly created entrypoint-echo image.

Run entrypoint-echo container:
1. Overwrite ENTRYPOINT with date via CLI
2. Set CMD to date via CLI

You can use the ENTRYPOINT to set fairly stable default commands 
and arguments and then use either form of CMD to set 
additional defaults that are more likely to be changed.


Solution:

Modify /root/Dockerfile :

cat > /root/Dockerfile <<EOF
FROM alpine
ENTRYPOINT ["echo", "hi, from container!"]
EOF


Build docker image /root/Dockerfile :

docker build -t entrypoint-echo .


Explore ENTRYPOINT of entrypoint-echo :

docker inspect entrypoint-echo | jq .[0].ContainerConfig.Entrypoint


Run the container with default values:

docker run --rm entrypoint-echo


Run the container with date:

docker run --rm --entrypoint date entrypoint-echo


Run the container with entrypoint date :

docker run --rm entrypoint-echo date

## Using Entrypoint and CMD

Use CMD and ENTRYPOINT to run the same echo "hi, from container!" command. Build image from /root/Dockerfile and name it image-echo . Check what is CMD and ENTRYPOINT of the newly created image-echo image.

Run the image-echo container:

    with default cmd and entrypoint values
    with another message hi, from the updated image via CLI
    Set the CMD to date via CLI
    Set ENTRYPOINT to date via CLI

In essence, the entrypoint is a binary, and cmd contains parameters in Docker. When running a container, you have the flexibility to override both entrypoint and cmd parameters.

However, overwriting the command is simpler when the entrypoint is either not defined or set as a shell. Therefore, for a more specific image, consider specifying the ENTRYPOINT along with default parameters through CMD. These parameters can then be easily modified via CLI when executing 'docker run.'

Alternatively, if you prefer, you can leave the ENTRYPOINT as is (often just a shell) and provide the complete command in the CMD. This allows you to use the image seamlessly to construct containers with any desired command.

Modify /root/Dockerfile :

cat > /root/Dockerfile <<EOF
FROM alpine
ENTRYPOINT ["echo"]
CMD ["hi, from container!"]
EOF


Build docker image /root/Dockerfile :

docker build -t image-echo .


Explore CMD and ENTRYPOINT of image-echo :

docker inspect image-echo | jq .[0].ContainerConfig.Cmd &&
docker inspect image-echo | jq .[0].ContainerConfig.Entrypoint


Run the container with default values:

docker run --rm image-echo


Run the container with updated message:

docker run --rm image-echo hi, from the updated image


Run the container with CMD date :

docker run --rm image-echo date


Run the container with ENTRYPOINT date :

docker run --rm --entrypoint date image-echo

# Dockerfile best practices

Layers

The order of Dockerfile instructions matters. A Docker build consists of a series of ordered build instructions. Each instruction in a Dockerfile roughly translates to an image layer. The following diagram illustrates how a Dockerfile translates into a stack of layers in a container image.

In Dockerfile every command is a layer. And if command is doing exactly the same then the layer will be loaded from cache.
However, in our case we copy all of the files (dependecies and modified source code files) in one command.
More effective will be to initially copy dependecy files (as they are changed less often than source code) and install them.
And only afterwards copy source code files. This way we got more layers loaded from the cache on the build of a new image.
It seems like a very small gain in time here, but it can be important when building really big applications.

## Cached Layers

There is a Dockerfile /root/app/Dockerfile. Modify it, so dependency layer can be reused. Build the image, name it server-1

Solution:


Modify /root/app/Dockerfile (remove # cached comments first):

# syntax=docker/dockerfile:1
FROM golang:1.21-alpine # cached
WORKDIR /src # cached
COPY go.mod go.sum /src/ # cached
RUN go mod download # cached
COPY . .
RUN go build -o /bin/client ./cmd/client
RUN go build -o /bin/server ./cmd/server
ENTRYPOINT [ "/bin/server" ]


Build the image:

docker build -t server-1 .

# Multi-stage build

Separate build stage and create image only with the resulted binary. Compare the size of the images server-1 and server-2 . Use scratch as a base image for the runnable image.

There are two main reasons for why you’d want to use multi-stage builds:
* They allow you to run build steps in parallel, making your build pipeline faster and more efficient.
* They allow you to create a final image with a smaller footprint, containing only what's needed to run your program.

With multi-stage builds:
- you can run builds in parallel
- you can separate build files from binaries

Solution:

(# syntax=docker/dockerfile:1)
FROM golang:1.21-alpine
WORKDIR /src
COPY go.mod go.sum /src/
RUN go mod download
COPY . .
RUN go build -o /bin/client ./cmd/client
RUN go build -o /bin/server ./cmd/server
(# as it is just a build step, we don't need CMD or ENTRYPOINT command)

FROM scratch # minimal base image
COPY --from=0 /bin/server /bin/ # copy /bin/server file from the previously build image (0 as we didn't name it)
ENTRYPOINT [ "/bin/server" ]


Build the image:

docker build -t server-2 .

# Build multiple images

Build **run-server** and **run-client** images from the same Dockerfile using target keyword.

It’s possible to create multiple different images using a single Dockerfile. 
You can specify a target stage of a build using the --target flag. 
Replace the unnamed FROM scratch stage with two separate stages named client and server.

Slution:

Add next line to the /root/Dockerfile :

# syntax=docker/dockerfile:1
FROM golang:1.21-alpine AS base
WORKDIR /src
COPY go.mod go.sum /src/
RUN go mod download
COPY . .

# build client
FROM base AS build-client
RUN go build -o /bin/client ./cmd/client

# build server
FROM base AS build-server
RUN go build -o /bin/server ./cmd/server

# copy client binary to client image
FROM scratch AS client
COPY --from=build-client /bin/client /bin/
ENTRYPOINT [ "/bin/client" ]

# copy server binary to server image
FROM scratch AS server
COPY --from=build-server /bin/server /bin/
ENTRYPOINT [ "/bin/server" ]


Build the client image:

docker build -t run-client --target=client .


Build the server image:

docker build -t run-server --target=server .


List available images:

docker image ls


## Build arguments

Add build argument GO_VERSION to the Dockerfile. And build image with provided golang version 1.22.

Documentation: https://docs.docker.com/build/guide/build-args/

Build arguments is a great way to add flexibility to your builds. 
You can pass build arguments at build-time, and you can set a default value that the builder uses as a fallback.

You can also inject values inside your code, but the way it's done is different for every language.

Solution: 


Add next line to the /root/Dockerfile :

# syntax=docker/dockerfile:1

# defining variable
ARG GO_VERSION=1.21

# using variable
FROM golang:${GO_VERSION}-alpine AS base
WORKDIR /src
COPY go.mod go.sum /src/
RUN go mod download
COPY . .

FROM base AS build-client
RUN go build -o /bin/client ./cmd/client

FROM base AS build-server
RUN go build -o /bin/server ./cmd/server

FROM scratch AS client
COPY --from=build-client /bin/client /bin/
ENTRYPOINT [ "/bin/client" ]

FROM scratch AS server
COPY --from=build-server /bin/server /bin/
ENTRYPOINT [ "/bin/server" ]


Build the image:

docker build --build-arg="GO_VERSION=1.22" .

# Export binaries

Export binaries to the /root/app/bin as server and client using Dockerfile.

The default format of output for build command is docker image.
But, it can be changed to binary by using local exporter (use --output flag).

Use docker build -h

Solution:

Add next line to the /root/app/Dockerfile :

# syntax=docker/dockerfile:1
ARG GO_VERSION=1.21
FROM golang:${GO_VERSION}-alpine AS base
WORKDIR /src
COPY go.mod go.sum /src/
RUN go mod download
COPY . .

FROM base AS build-client
RUN go build -o /bin/client ./cmd/client

FROM base AS build-server
RUN go build -o /bin/server ./cmd/server

FROM scratch AS client
COPY --from=build-client /bin/client /bin/
ENTRYPOINT [ "/bin/client" ]

FROM scratch AS server
COPY --from=build-server /bin/server /bin/
ENTRYPOINT [ "/bin/server" ]

# exporting binaries from server and client images
FROM scratch AS binaries
COPY --from=server /bin/server /
COPY --from=client /bin/client /


Export binaries:

docker build --output=/root/app --target=binaries .

# NEtwork Drivers

Firstly, initiate container named app-1 :

    mount /root/app-1 directory on the host to the /usr/share/nginx/html directory within the container
    utilize the nginx:alpine image

Secondly, initiate container named app-2 :

    mount /root/app-2 directory on the host to the /usr/share/nginx/html directory within the container
    utilize the nginx:alpine image

Make sure that containers are attached to the default bridge network.

Send get request from app-1 container to app-2 container:

    by using app-2 hostname
    by using app-2 ip address

Use "docker network ls" to list current networks.

If you do not specify any --network flags, the containers connect to the default bridge network.

Documentation - https://docs.docker.com/network/network-tutorial-standalone/#use-the-default-bridge-network.

Tip 1: Use curl -sS command to send get request.

Tip 2:
he IP addresses of containers within the network can be retrieved by executing the command:
"docker network inspect bridge | jq .[0].Containers".

TIP 3: 
You should expect an error message "Could not resolve host: app-1" 
upon making request by using ip address.

Solution:

Initiate app-1 and app-2 containers:

docker run -d -v /root/app-1:/usr/share/nginx/html --name app-1 nginx:alpine \
&& \
docker run -d -v /root/app-2:/usr/share/nginx/html --name app-2 nginx:alpine


List information about the network:

docker network inspect bridge


Send get request from app-1 to app-2 :

docker exec app-1 sh -c 'curl -sS app-2'


Send get request from app-1 to app-2 using its IP address:

docker exec app-1 sh -c 'curl -sS 172.17.0.3'

## Running containers in bridge network

Create bridge network bridge-network.

Detach app-1 and app-2 containers from default bridge network and attach to the newly created bridge-network .

Send get request from app-1 container to app-2 container:

    by using app-2 hostname
    by using app-2 ip address

Solution:

Create network bridge-network : (--driver bridge is not nessecary here, as it is a default behaviour)

docker network create --driver bridge bridge-network


Disconnect app-1 and app-2 from the default bridge network:

docker network disconnect bridge app-1 \
&& \
docker network disconnect bridge app-2


Connect app-1 and app-2 containers to the bridge-network network:

docker network connect bridge-network app-1 \
&& \
docker network connect bridge-network app-2


List information about the network:

docker network inspect bridge-network


Send get request from app-1 to app-2 :

docker exec app-1 sh -c 'curl -sS app-2'


Send get request from app-1 to app-2 using its IP address:

docker exec app-1 sh -c 'curl -sS 172.18.0.3'

## Run containers in host network

Remove app-1 container.

Initiate new container app-1:

* mount /root/app-1 directory on the host to the /usr/share/nginx/html directory within the container
* attach container to the predefined host network
* utilize the nginx:alpine image

MAke a request to localhost:80.

Tip 1: 
Use --network flag to attach container to the host network.

Attaching a running container to the host network isn't feasible, 
so make sure to configure it when launching the container.

Solution:

Remove container app-1 :

docker rm -f app-1

OR

docker stop app-1 \
&& \
docker rm app-1


Initiate app-1 container:

docker run -d -v /root/app-1:/usr/share/nginx/html --name app-1 --network host nginx:alpine


Send get request to localhost:80 :

curl localhost:80

# POST-FORWARDING IN DOCKER

AKA Publishing ports in docker.

## Publish port

By default, when you create or run a container using docker create or docker run, containers on bridge networks don't expose any ports to the outside world. Use the --publish or -p flag to make a port available to services outside the bridge network. This creates a firewall rule in the host, mapping a container port to a port on the Docker host to the outside world.

**IMPORTANT!:**

**Publishing container ports is insecure by default. Meaning, when you publish a container's ports it becomes available not only to the Docker host, but to the outside world as well.**

Solution:

Initiate app-1 container:

docker run -d -v /root/app-1:/usr/share/nginx/html -p 80:80 --name app-1 nginx:alpine


Send get request to localhost:80 :

curl localhost:80

## Publish port on host IP

Initiate container named app-2 :

    mount /root/app-2 directory on the host to the /usr/share/nginx/html directory within the container
    utilize the nginx:alpine image
    map 127.0.0.1:81 on the host with port 80 within the container

Send get request to localhost:81 .

Tip: 

Use -d (detached) flag when running the container.

Use -p or --publish flag to map ports.


Solution:

Initiate app-2 container:

docker run -d -v /root/app-2:/usr/share/nginx/html -p 127.0.0.1:81:80 --name app-2 nginx:alpine


Send get request to localhost:81 :

curl localhost:81


## Make a request from another host

Connect via SSH to the hos tnamed **node01**.

Issue GET requets  to both controlpane:80 and controlpane:81.
The hostname 'controlpane' refers to the host where you've recently set up containers.

Tip 1: 

If you include the localhost IP address (127.0.0.1) with the publish flag, 
only the Docker host can access the published container port.

To ssh use "ssh node01" command.

Tip 2:

You should expect an error message "Failed to connect to controlplane port 81: Connection refused" 
upon executing the "curl controlplane:81" command.

Solution:

Connect via SSH to the host named node01 :

ssh node01


Send get request to controlplane:80 :

curl controlplane:80


Send get request to controlplane:81 :

curl controlplane:81

# Updating containerized application

## Containerize an application

Build docker image named app/v1 using /root/Dockerfile .

Start the container named app , it should:

    use app/v1 image
    map port 3000 on the host with port 3000 in the container
    run in the background (use -d flag)

Make a request to localhost:3000.

Tip:

Use docker build and docker run commands. 

Use --help flag to see the help.

Solution:

Build app/v1 image:

docker build -t app/v1 .


Launch the container exposing port 3000:

docker run -d -p 3000:3000 --name app app/v1 


Make a request to localhost:3000:

curl localhost:3000


## Containerize an updated app

Append line "<h2>Some updates for app/v2</h2>" to /root/index.html file.

Build docker image app/v2 from /root/Dockerfile .

Remove container app .

Start the container named app , it should:

    use app/v2 image
    map port 3000 on the host with port 3000 in the container
    run in the background (use -d flag)

Make a request to localhost:3000

TIP:
Use >> to append text to the file.

Use docker build and docker run commands.

Use --help flag to see the help.

Solution:

Append line <h2>Some updates for app/v2</h2> to /root/index.html file:

echo "<h2>Some updates for app/v2</h2>" >> /root/index.html


Build app/v2 image:

docker build -t app/v2 .


Delete container app created from the image app/v1:

docker rm -f app

OR

docker stop app && docker rm app


Run the container with exposed port 3000.

docker run -d -p 3000:3000 --name app app/v2 


Make a request to localhost:3000:

curl localhost:3000

# Using Bind mounts

Starting a container with a bind mount.

## Start a container with a bind mount

Initiate a container named sample-app :

    utilize the nginx:alpine image
    attach it to the /root/app-data directory on the host
    mount this bind to the /usr/share/nginx/html directory within the container
    ensure port 80 on the host is mapped to port 80 within the container

Send get request to localhost:80 .

List files in the /usr/share/nginx/html directory in the container.

If the bind mount is empty, it won't be populated by the data from the container.
And it will clear the directory inside the container.

Tip 1: Use --mount or -v flag to mount volume.

Use -d flag to run container in the detached mode.

Use the 'curl' command to send a request to the localhost.

Tip 2: 
You will got 403 error as a reaponse to the get request to localhost:80.

There won't be any files in the /usr/share/nginx/html directory.


Solution: 

Run the container with the mounted directory:

docker run -d -p 80:80 --mount type=bind,src=/root/app-data,target=/usr/share/nginx/html --name sample-app nginx:alpine

OR

docker run -d -p 80:80 -v /root/app-data:/usr/share/nginx/html --name sample-app nginx:alpine


Send get request to localhost:80 :

curl localhost:80


List files in the container's directory:

docker exec sample-app sh -c "ls /usr/share/nginx/html"

## Update data in the container

Generate an index.html file within /usr/share/nginx/html containing "<h1>Hello from the updated App</h1>" .

Send get request to localhost:80 .

Remove sample-app container.

Solution:


Create index.html file:

docker exec sample-app sh -c "echo '<h1>Hello from the updated App</h1>' > /usr/share/nginx/html/index.html"


Send get request to localhost:80 :

curl localhost:80


Remove the sample-app container:

docker rm -f sample-app

OR

docker stop sample-app && docker rm sample-app


## Running another container

Initiate a container named sample-app :

    utilize the nginx:alpine image
    attach it to the /root/app-data directory on the host
    mount this bind to the /usr/share/nginx/html directory within the container
    ensure port 80 on the host is mapped to port 80 within the container

Send get request to localhost:80 .

Solution:


Run the container with the mounted directory:

docker run -d -p 80:80 --mount type=bind,src=/root/app-data,target=/usr/share/nginx/html --name sample-app nginx:alpine

OR

docker run -d -p 80:80 -v /root/app-data:/usr/share/nginx/html --name sample-app nginx:alpine


Send get request to localhost:80 :

curl localhost:80

## Change file in the bind mount

Add line "Added from the host" to the /root/app-data/index.html file on the host.

Send get request to localhost:80 .

Solution:

Add line to the /root/app-data/index.html file on the host:

echo "Added from the host" >> /root/app-data/index.html


Send get request to localhost:80 :

curl localhost:80


# Using enviroment variables:

**Building and running a container with environment variables**

## Build docker image using ENV key word

Create a new file /root/Dockerfile to build a container image from. It should:

    use nginx:alpine as base
    define environment variable key1=value1

Build the image and tag it as sample-image .

Instantiate a container named sample-app .

Confirm the presence of the environment variable key1=value1 within the container.

Info:

Dockerfile: List of commands from which an Image can be build.

Image: Binary file which includes all data/requirements to be run as a Container.

Container: Running instance of an Image.

Use docker --help to see the list of commands.

Tip: 

Use ENV key word to define environment variables in Dockerfile.
Use -d (detached) flag when running the container.

Solution:

Create /root/Dockerfile :

cat <<EOF >> /root/Dockerfile
FROM nginx:alpine
ENV key1=value1
EOF

Build the image:

docker build -t sample-image .


Run the container:

docker run -d --name sample-app sample-image


Display the container's environment variables:

docker exec sample-app env

## Overwrite environment variable

Launch a container named sample-app-2 using the existing image sample-image , introducing the environment variables key2=value2 and key1=new-value1 . Ensure the Dockerfile remains unchanged.

List the environment variables within the instantiated sample-app-2 container.

Info:

Environment variables in Docker:
https://docs.docker.com/develop/develop-images/instructions/#env.

Tip: 

Use -e flag when running the container.

Solution:

Run the image with new environment variables:

docker run -d --name sample-app-2 -e key2=value2 -e key1=new-value1 sample-image


Display the container's environment variables:

docker exec sample-app-2 env

# Using volume mounts

**Run container with mounted volume**

## Attach volume to the container

Create docker volume named sample-volume .

Initiate a container named sample-app :

    utilize the nginx:alpine image
    attach it to the volume sample-volume
    mount this volume to the /usr/share/nginx/html directory within the container
    ensure port 80 on the host is mapped to port 80 within the container

Send get request to localhost:80 .

Info: 

If the volume is empty, volume is populated by data from container. 
Otherwise, the data in the container is going to be replaced by the volume's data.

Check the instructions on handling volumes by using "docker volume --help".

Documentation - https://docs.docker.com/storage/volumes/#populate-a-volume-using-a-container.

Use --mount or -v flag to mount volume.

Use -d flag to run container in the detached mode.

Use the 'curl' command to send a request to the localhost.

Solution:

Create volume:

docker volume create sample-volume


Run the container with the mounted directory:

docker run -d -p 80:80 --mount type=volume,src=sample-volume,target=/usr/share/nginx/html --name sample-app nginx:alpine

OR

docker run -d -p 80:80 -v sample-volume:/usr/share/nginx/html --name sample-app nginx:alpine


Send get request to localhost:80 :

curl localhost:80

## Update data in the container

Rewrite /usr/share/nginx/html/index.html file with "<h1>Hello from the updated App</h1>" .

Send get request to localhost:80 .

Remove sample-app container.

Info:

Check the instructions on handling volumes by using "docker volume --help".

Documentation - https://docs.docker.com/storage/volumes/#populate-a-volume-using-a-container.

Tip:

Use > to rewrite contents of the file.

Use the 'curl' command to send a request to the localhost

Solution:

Rewrite index.html file:

docker exec sample-app sh -c "echo '<h1>Hello from the updated App</h1>' > /usr/share/nginx/html/index.html"


Send get request to localhost:80 :

curl localhost:80


Remove the sample-app container:

docker rm -f sample-app

Or

docker stop sample-app && docker rm sample-app


## Run Another container

Initiate a container named sample-app :

    utilize the nginx:alpine image
    attach it to the volume sample-volume
    mount this volume to the /usr/share/nginx/html directory within the container
    ensure port 80 on the host is mapped to port 80 within the container

Send get request to localhost:80 .

Info:

If the volume is empty, volume going to be populated by data from container.
Otherwise, the data in the container is going to be replaced by volume's data.

Check the instructions on handling volumes by using `docker volume --help` <span class='kc-markdown-code-copy'></span>.

Documentation - https://docs.docker.com/storage/volumes/#populate-a-volume-using-a-container.

Tip:

Use flag -v or --mount when running the container - https://docs.docker.com/storage/volumes/#choose-the--v-or---mount-flag.

Be cautious about where you attach the volume on the container's filesystem. 
If the volume isn't empty, all the existing data will be overwritten by the data in the volume.

Solution:

Run the container with a mounted volume: (specifying type=volume isn't required, as it's the default behavior)

docker run -d -p 80:80 --mount type=volume,src=sample-volume,target=/usr/share/nginx/html --name sample-app nginx:alpine

OR

docker run -d -p 80:80 -v sample-volume:/usr/share/nginx/html --name sample-app nginx:alpine


Send get request to localhost:80 :

curl localhost:80


## Update data on the host system:

Verify the directory location on the host where sample-volume is linked. Add the line "Added from the host" to the index.html file on the host.

Send get request to localhost:80 .

Info!:

**Warning! Don't do this in production.**

**Volumes are not designed to be edited on the host.** 
**Use bind mounts for this instead.**

Tip:

Use "docker volume inspect" command to see detailed information about the volume.

Use >> to append line to the file.

Solution:


Inspect sample-volume :

docker volume inspect sample-volume


Append line to the index.html on the host:

echo "Added from the host" >> /var/lib/docker/volumes/sample-volume/_data/index.html


Make a request to localhost:80 :

curl localhost:80




