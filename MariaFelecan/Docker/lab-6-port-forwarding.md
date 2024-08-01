* ports in docker

    by default, when you create or run a container using docker create or docker run, containers on bridge networks don't expose any ports to the outside world. use the --publish or -p flag to make a port available to services outside the bridge network.

    -> this creates a firewall rule in the host, mapping a container port to a port on the Docker host

    -p 8080:80	Map port 8080 on the Docker host to TCP port 80 in the container.
    -p 192.168.1.100:8080:80	Map port 8080 on the Docker host IP 192.168.1.100 to TCP port 80 in the container.
    -p 8080:80/udp	Map port 8080 on the Docker host to UDP port 80 in the container.
    -p 8080:80/tcp -p 8080:80/udp	Map TCP port 8080 on the Docker host to TCP port 80 in the container, and map UDP port 8080 on the Docker host to UDP port 80 in the container

* connecting via ssh to a host named node01 : ssh node01

    Connecting via SSH (Secure Shell) refers to using a network protocol to securely access and manage a remote computer or server over a potentially insecure network, such as the internet. SSH provides a secure channel for communication, allowing users to log in to remote systems, execute commands, transfer files, and perform administrative tasks

