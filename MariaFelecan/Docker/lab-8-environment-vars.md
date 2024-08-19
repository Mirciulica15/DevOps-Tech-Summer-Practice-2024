cat <<EOF >> /root/Dockerfile
FROM nginx:alpine
ENV key1=value1
EOF

cat: The cat command is used to concatenate and display the content.
<<EOF: This indicates the beginning of a here document. EOF is the delimiter that marks the end of the here document. You could use any string as the delimiter, but EOF is common.
>> /root/Dockerfile: This part appends the output to the file /root/Dockerfile. If the file doesn't exist, it will be created. If it does exist, the new content will be appended to the end of the file.

The lines between the two EOF markers are treated as the input to the cat command. This text will be written to the specified file (/root/Dockerfile).
FROM nginx:alpine and ENV key1=value1:

These lines specify the content to be added to /root/Dockerfile.
FROM nginx:alpine: This line in a Dockerfile specifies the base image to use, in this case, the nginx image based on the Alpine Linux distribution.
ENV key1=value1: This line sets an environment variable key1 to the value value1 within the Docker image.

Display the container's environment variables:


docker exec sample-app env

-> to introduce environment variables in a container : -e key=value
