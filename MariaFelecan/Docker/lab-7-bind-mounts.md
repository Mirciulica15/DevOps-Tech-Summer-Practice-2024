## -v 
    -> is concise and good for simple mounts, but less clear and flexible
    docker run -v /host/data:/container/data myimage

## --mount 
    -> is more complex but offers greater clarity and flexibility for complex scenarios
    docker run --mount type=bind,source=<host_path>,target=<container_path> ...


## Docker volumes

    = mechanisms for persisting data used by Docker containers
    the file / directory is stored in a new directory within Doker's storage directory on the host machine
    => completely managed by docker

    - volumes are easier to back up or migrate than bind mounts.
    - you can manage volumes using Docker CLI commands or the Docker API.
    - volumes work on both Linux and Windows containers.
    - volumes can be more safely shared among multiple containers.
    - volume drivers let you store volumes on remote hosts or cloud providers, encrypt the contents of volumes, or add other functionality.
    - new volumes can have their content pre-populated by a container.
    - volumes on Docker Desktop have much higher performance than bind mounts from Mac and Windows hosts.


## Bind Mounts

    a file/directory on the host machine is mounted into a container
    the file / directory is referenced by its absolute path on the host machine

    If you use -v or --volume to bind-mount a file or directory that does not yet exist on the Docker host, -v creates the endpoint for you. It is always created as a directory.

    If you use --mount to bind-mount a file or directory that does not yet exist on the Docker host, Docker does not automatically create it for you, but generates an error.


    ### docker exec sample-app sh -c "ls /usr/share/nginx/html"

    docker exec: This command is used to run a command in a running container.

    sample-app: This is the name (or ID) of the running container in which you want to execute the command. The container must be running for docker exec to work.

    sh -c "ls /usr/share/nginx/html": This is the command being executed inside the container.

    sh: This starts a shell session in the container.
    -c: This flag tells the shell to execute the command that follows in quotes.
    ls /usr/share/nginx/html: This lists the contents of the directory /usr/share/nginx/html within the container

    When you’re actively working on an application it is inconvenient to have to stop the container, rebuild the image, and run a new version every time you make a change to your source code.

    One way to streamline this process is to mount the source code directory on the local machine into the running container. This will allow any changes made to the files on the host to be immediately reflected in the container.

    We do this using something called a bind mount.

