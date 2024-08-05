# Kubernetes
- open source container orchestration tool
- helps you manage containerized applications in different deployment environments

## What features do orchestration tools offers?
- High Availability (the application has no downtime so it's always accessible by the users)
- Scalability (it loads fast and the users have a very high response rates from the application)
- Disaster recovery (backup and restore)
  
## Kubernetes Components

1. Node 
 - a simple server, a physical or virtual machine
 - run the containers of your application

2. Pod 
 -  the basic component 
 - the smallest unit of kubernetes
 - it creates this running environment or a layer on top of the container (Abstraction over container)
 - usually 1 application per Pod
 - each Pod gets its own IP adress (NOT THE CONTAINER)

3. Service 
- pods communicate with each other using a service 
- permanent IP adress
- lifecycle of Pod and Service are not connected 
4. Ingress   
- Instead of service, the reqest goes first to ingress and it does the forwarding then to the service
5. ConfigMap
- external configuration of your application 
6. Secret 
- used to store secret data
- base64 encoded 
  
### Data Storage