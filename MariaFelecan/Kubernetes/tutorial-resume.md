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
1 master node, many worker nodes

WORKER NODE
-> each node has more pods in it
-> does the actual work
-> 3 processes must be installed on every node
    1. container runtime 

    2. kubelet : interacts with the container and node, starts the pod with the container inside

    3. kube proxy : forwards the reqeuest from the app to to the db replica that is in the same node with the app that forwarded the request

    mantains the network configuration across all pods, all containers

CLUSTER = multiple worker nodes

MASTER NODES
= manages the entire cluster
-> 4 processes run on each:
    1. API SERVER : cluster gateway - get the initial requests from the cluster + gatekeeper for authentication

    if we want to do any delete/add/etc it needs to go through the API server

    we interact with the API with the UI and kubectl(= go language binary)

    req -> Api server -> validates req -> .. -> pod

    2. SCHEDULER 
    -> just decides on which node the new pod should be scheduled

    schedule new pod -> api server -> scheduler -> where to put the pod -> kubelet

    3. CONTROLLER MANAGER

    detects cluster state changes
    ensures that the pods are up and running

    controller manager-> schduler -> kubelet -> restart pods

    4. ETCD = cluster brain, cluster changes get stored here

    - distributed key value database
    - stores current cluster states

![entire kubernetes architecture](<Screenshot (1).png>)

## Minikube and Kubectl

in a production cluster setup, qw have at least 2 masters and a lot of worker nodes

* Minikube : 1 node cluster where the master and worker process run on 1 node, so it can run on 1 laptop

- cretes a virtual box on our laptop and that node will run ona  virtual box
- used for testing purposes for testing purposes

* Kubectl - clt for kubernetes cluster

- used to communicate with the API server, so we can create/delete components etc

    ### installation of minikube and kubectl

    minikube needs virtualization
    we need hypervisor

## basic kubectl commands

kubectl get nodes -> lists all nodes
kubectl get pods
kubectl get services

-> creating a pod

kubectl create deployment name --image=nginx

we are creating DEPLOYMENTS, not directly pods
deployments are an abstraction over the pod, that creates the pod

kubectl get deployment - we can see the deployments
kubectl get pod - we can see the pods

kubectl get replicaset : managing the replica of a pod, we dont need to deal with creating them

    * Layers of abstraction:

    Deployment (manages a) -> ReplicaSet (manges a) -> Pod (abstraction of a)-> Container

    EVERITHING below deployment is managed by kuberenetes automatically

kubectl edit deployment name
    -> we get an auto generated file with default values of the deployment

    * Debugging pods

    kubectl logs <pod-name>

kubectl exec -it <pod-name> -- bin/bash

    -it = interactive terminal

-> deleting the pods : 

kubectl delete deployment <name> - deletes everything, all the replica sets too

-> creating a deployment easier : kubectl apply -f <conf-file-name.yaml>







