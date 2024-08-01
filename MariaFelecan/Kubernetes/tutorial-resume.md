# Kubernetes 
    = open source container orchestration tool
    - containers : store microservices => we need a tool that manages the complex relations between containers
    - app is always accesible
    - scalability (high performance)
    - disaster recovery

## Kubernetes Components

    --> Node = simple server
    --> Pod = abstraction over a container, smallest unit of K8s
            = creates a running environment over a container
            = meant to run only one app
            = each Pod gets its own IP address, and they communicate with other pods trough ips
    --> Service : permanent IP address, even if the pod dies, the service and IP address stay
    --> Ingress : instead of servce, the request goes to ingress and then the ingress forwards it to service (ingress has for example the name of the website, and service is the ip)

    --> ConfigMap : external configuration of app : for example, all the endpoints we need (like the db url, monogo db username & passwd)
    --> Secret : like a config map that stors encoded data in base64
    --> Deploymens : blueprint for an app

* Volumes

    -> if the db gets restarted, the data is gone => using volumes, we assur the persistance of the data
    -> attaches a phisical storage on a hard drive with the data
    -> K8s doesnt mnage data persistance, we need to assure that we put all the data, that we have a good phisical storage

* Replicating

    -> it is good to do a replica of the node(that contains all the pods) and connect it to our node through services

* Deployment

    -> we cant replicate the db through deployments

* Statefull states = takes care of replicating the pods, and makes sure that the db s are syncronized, but it is more difficult than deployments

## Kubernetes architecture
NODE
-> each node has more pods in it
-> does the actual work
-> 3 processes must be installed on every node
    1. container runtime 
    2. kubelet : interacts with the container and node, starts the pod with the container inside
    3. 