# Docker Command Reference Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Basic Commands](#basic-commands)
   - [docker version](#docker-version)
   - [docker info](#docker-info)
   - [docker pull](#docker-pull)
   - [docker build](#docker-build)
   - [docker run](#docker-run)
   - [docker ps](#docker-ps)
   - [docker stop](#docker-stop)
   - [docker rm](#docker-rm)
   - [docker rmi](#docker-rmi)
3. [Intermediate Commands](#intermediate-commands)
   - [docker logs](#docker-logs)
   - [docker exec](#docker-exec)
   - [docker cp](#docker-cp)
   - [docker inspect](#docker-inspect)
   - [docker network](#docker-network)
   - [docker volume](#docker-volume)
4. [Advanced Commands](#advanced-commands)
   - [docker-compose](#docker-compose)
   - [docker swarm](#docker-swarm)
   - [docker stack](#docker-stack)
   - [docker service](#docker-service)
   - [docker secret](#docker-secret)
5. [Conclusion](#conclusion)

## Introduction

Docker is a platform designed to simplify the process of building, deploying, and running applications using containerization. Containers allow developers to package applications with all the necessary components (libraries, dependencies, etc.) and deploy them consistently across different environments.

This guide covers a range of Docker commands, from basic to advanced, to help you manage Docker containers efficiently.

## Basic Commands

### docker version
Displays the installed version of Docker.

```bash
docker version    

docker info  

docker pull <image_name>:<tag>  
# Example
docker pull nginx:latest  

docker build -t <image_name>:<tag> .  
# Example
docker build -t my-app:latest .  

docker run -d -p <host_port>:<container_port> --name <container_name>   <image_name>:<tag>
# Example
docker run -d -p 8080:80 --name my-nginx nginx:latest  

docker ps  

docker stop <container_name_or_id>  
# Example
docker stop my-nginx  


