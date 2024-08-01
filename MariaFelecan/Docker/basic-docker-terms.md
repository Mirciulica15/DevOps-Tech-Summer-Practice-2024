
Dockerfile = text document that contains all the commands a user could call on the cmd to assamble an image

Docker Image = executable package of software that includes everything needed to run an application
Docker Container = virtual environment that bundles app code with all dependencies required to run the app

Docker can build images by reading a Dockerfile

* Docker Image

    components:

    -> layers : immutable filesystem layers stacked to form a complete image
    -> base image : the foundational layer
    -> dockerfile : a text file containing instructions to build a docker image
    -> image id 
    -> tages : labels used to manage and version docker images

* Docker volumes

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


* Bind Mounts

    a file/directory on the host machine is mounted into a container
    the file / directory is referenced by its absolute path on the host machine

    If you use -v or --volume to bind-mount a file or directory that does not yet exist on the Docker host, -v creates the endpoint for you. It is always created as a directory.

    If you use --mount to bind-mount a file or directory that does not yet exist on the Docker host, Docker does not automatically create it for you, but generates an error.


![alt text](types-of-mounts-volume.webp)


    