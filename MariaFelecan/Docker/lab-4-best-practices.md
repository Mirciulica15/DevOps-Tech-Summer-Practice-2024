* Layers

    -> the order of a dockerfile instructions matters
    -> each instrution of a dockerfile = image layer

* Cached layers

    -> if a layer of an image is unchanged, then the builder picks it up from the build cache. if a layer has changed since the last build, that layer, and all layers that follow, must be rebuilt

    -> we can avoid this by reordering the instructions in the dockerfile => downloading and installing dependencies occur before the source code is copied over to the container

* Multi Stage builds
    -> we can run build steps in parallel + creating a final image with smaller footprint
    -> a build stage = FROM instruction
    -> reduces the footprint of an image

* Add stages
    -> different base images for your build and runtime environments

# syntax=docker/dockerfile:1
FROM golang:1.21-alpine
WORKDIR /src
COPY go.mod go.sum /src/
RUN go mod download
COPY . .
RUN go build -o /bin/client ./cmd/client
RUN go build -o /bin/server ./cmd/server
# as it is just a build step, we don't need CMD or ENTRYPOINT command

FROM scratch # minimal base image
COPY --from=0 /bin/server /bin/ # copy /bin/server file from the previously build image (0 as we didn't name it)
ENTRYPOINT [ "/bin/server" ]


-> useful because now when we run, we only access the scratch, we dont need to build everytime all the modules, we only need to compile the code

* Parallelism

    -> improves build speed
    -> we can split binary building steps into different stages
    -> in the final scrach file, we just copy the binaries from each corresponding build stage
    -> we can have a base stage with all the common dependencies

    => we separate client and server operations: building and running stages for each

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


    -> and then we run like this:

            Build the client image:

            docker build -t run-client --target=client .

            Build the server image:


            docker build -t run-server --target=server .

* Build Arguments

    we can pass build arguments at build-time, and we can set a default value that the builder uses as a fallback
        - FROM golang:1.21-alpine AS base
        + ARG GO_VERSION=1.21
        + FROM golang:${GO_VERSION}-alpine AS base

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

        # build the image:

        docker build --build-arg="GO_VERSION=1.22" .


* Exporting binaries

    To use the local exporter, pass the --output option to the docker build command. The --output flag takes one argument: the destination on the host machine where you want to save the files

    docker build --output=. --target=server .

    
    FROM scratch AS binaries
    COPY --from=server /bin/server /
    COPY --from=client /bin/client /

    docker build --output=/root/app --target=binaries .