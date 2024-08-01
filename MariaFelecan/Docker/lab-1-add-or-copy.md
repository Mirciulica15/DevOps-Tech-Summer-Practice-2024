ADD, COPY -> copy a file

we add to the dockerfile:

COPY copy_file.txt /app
ADD add_file.txt /app

then we build the image by:
docker build -t app-image .

to confirm that the files were copied:
docker run --rm app-image ls /app


ADD [OPTIONS] <src> ... <dest>

    -> this copies new files, directories or remote file URLs from <src> and adds them to the filesystem of the image at path <dest>
    -> available options:
            --keep-git-dir
            --checksum
            --chown
            --chmod
            --link
            --exclude
    -> multiple <src> resources may be specified but if they are files or directories, their paths are interpreted as relatie to the source of the context of the build
    -> <src> may contain wildcards 
    -> if <src> is remote, the destination will have permissions 600
    -> if the remote file being retrieved has an HTTP Last-Modified header, the timestamp from that header will be used to set the mtime on the destination file
    -> id multiple <src> resources are specified, then <dest> ends with a trailing slash /


COPY [OPTIONS] <src> ... <dest>

    -> copies new files or directories from <src> and adds them to the filesystem of the container at the path <dest>
    -> available options:
            --from
            --chown
            --chmod
            --link
            --parents
            --exclude
    
