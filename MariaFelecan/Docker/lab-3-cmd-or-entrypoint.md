* CMD
    -> ! ONLY ONE PER DOCKERFILE
    -> if we list more cmds in a dockerfile, only the last one takes effect
    ->sets the command to be executed when running a container from an image
    -> we can specify the CMD instruction using shell or exec forms
        - exec form : CMD ["executable", "param1","param2"]
                      CMD ["param1","param2"]
        - shell form: CMD command param1 param2

    -> purpose : provide defaults for an executing container
    -> these defaults can include an executable. if they do not, we need to specify an ENTRYPOINT
    -> if a user specifies arguments in docker run, then they will override the default specified in CMD, vut still use the default ENTRYPOINT

* ENTRYPOINT
    -> does not ignore additional paramters that we specify in the Docker run command

* RUN
    -> when executed, it always creates a new intermediate image layer on top of previous ones
    -> recommended: to chain all run commands together
    -> 2 forms:
            - exec form: RUN ["apt-get", "install", "forefox"]
            - shell form: RUN apt-get -y install firefox

- any docker image must have an ENTRYPOINT or CMD declaration for a container to start

- to inspect the cmd of an image named 'cmd-echo' : docker inspect cmd-echo | jq .[0].ContainerConfig.Cmd

- docker inspect name -> command used to inspect an object named 'name' . this object can be an image or a container