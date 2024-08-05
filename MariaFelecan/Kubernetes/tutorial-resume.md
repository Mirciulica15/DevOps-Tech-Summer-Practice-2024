# Kubernetes
= open source container orchestration tool
- containers : store microservices => we need a tool that manages the complex relations between containers
- app is always accessible
- scalability (high performance)
- disaster recovery

## Kubernetes Components

- **Node**: simple server
- **Pod**: abstraction over a container, smallest unit of K8s
    - creates a running environment over a container
    - meant to run only one app
    - each Pod gets its own IP address, and they communicate with other pods through IPs
- **Service**: permanent IP address, even if the pod dies, the service and IP address stay
- **Ingress**: instead of service, the request goes to ingress and then the ingress forwards it to service (ingress has for example the name of the website, and service is the IP)
- **ConfigMap**: external configuration of app, for example, all the endpoints we need (like the DB URL, MongoDB username & password)
- **Secret**: like a ConfigMap that stores encoded data in base64
- **Deployments**: blueprint for an app

### Volumes

- if the DB gets restarted, the data is gone => using volumes, we assure the persistence of the data
- attaches a physical storage on a hard drive with the data
- K8s doesn’t manage data persistence, we need to assure that we put all the data, that we have good physical storage

### Replicating

- it is good to do a replica of the node (that contains all the pods) and connect it to our node through services

### Deployment

- we can’t replicate the DB through deployments

### Stateful Sets

- takes care of replicating the pods and makes sure that the DBs are synchronized, but it is more difficult than deployments

## Kubernetes Architecture

1 master node, many worker nodes

### Worker Node

- each node has more pods in it
- does the actual work
- 3 processes must be installed on every node
    1. **Container runtime**
    2. **Kubelet**: interacts with the container and node, starts the pod with the container inside
    3. **Kube Proxy**: forwards the request from the app to the DB replica that is in the same node with the app that forwarded the request
        - maintains the network configuration across all pods, all containers

### Cluster

- multiple worker nodes

### Master Nodes

- manages the entire cluster
- 4 processes run on each:
    1. **API Server**: cluster gateway - gets the initial requests from the cluster + gatekeeper for authentication
        - if we want to do any delete/add/etc it needs to go through the API server
        - we interact with the API with the UI and kubectl (a Go language binary)
        - req -> API server -> validates req -> .. -> pod
    2. **Scheduler**
        - decides on which node the new pod should be scheduled
        - schedule new pod -> API server -> scheduler -> where to put the pod -> kubelet
    3. **Controller Manager**
        - detects cluster state changes
        - ensures that the pods are up and running
        - controller manager -> scheduler -> kubelet -> restart pods
    4. **ETCD**: cluster brain, cluster changes get stored here
        - distributed key-value database
        - stores current cluster states

![entire kubernetes architecture](<Screenshot (1).png>)

## Minikube and Kubectl

- in a production cluster setup, we have at least 2 masters and many worker nodes

### Minikube

- 1 node cluster where the master and worker process run on 1 node, so it can run on 1 laptop
- creates a virtual box on our laptop and that node will run on a virtual box
- used for testing purposes

### Kubectl

- CLI for Kubernetes cluster
- used to communicate with the API server, so we can create/delete components etc.

#### Installation of Minikube and Kubectl

- minikube needs virtualization
- we need a hypervisor

## Basic Kubectl Commands

- `kubectl get nodes`: lists all nodes
- `kubectl get pods`
- `kubectl get services`

### Creating a Pod

- `kubectl create deployment <name> --image=nginx`

We are creating DEPLOYMENTS, not directly pods. Deployments are an abstraction over the pod, that creates the pod.

- `kubectl get deployment`: we can see the deployments
- `kubectl get pod`: we can see the pods
- `kubectl get replicaset`: managing the replica of a pod, we don’t need to deal with creating/deleting/updating them, Kubernetes does it for us

#### Layers of Abstraction:

- Deployment (manages a) -> ReplicaSet (manages a) -> Pod (abstraction of a) -> Container

Everything below deployment is managed by Kubernetes automatically.

- `kubectl edit deployment <name>`
    - we get an auto-generated file with default values of the deployment
    - if we edit the config file, the pod is automatically terminated and a new one is automatically created

### Debugging Pods

- `kubectl logs <pod-name>`
- `kubectl describe pod <pod-name>`
- `kubectl exec -it <pod-name> -- bin/bash` (it = interactive terminal)

### Deleting the Pods

- `kubectl delete deployment <name>`: deletes everything, all the replica sets too

### Creating a Deployment Easier

- `kubectl apply -f <conf-file-name.yaml>`

### Summary:

CRUD commands:

- create deployment: `kubectl create deployment <name>`
- edit deployment: `kubectl edit deployment <name>`
- delete deployment: `kubectl delete deployment <name>`

Status of different K8s components: 

- `kubectl get nodes|pods|services|replicaset|deployment`


## YAML configuration file

Each configuration file has 3 parts:

1. `metadata`
    - name
    - labels
2. `specification`
    - what we want to create
    - apiVersion, kind (ex: deployment)
    - spec + the specific configuration to that kind
3. `status`
    - kubernetees compares if the desired state and the actual state match
    - if they dont match, kubernetes tries to solve the problem

**Checking the corectness of the syntax:** some online yaml validator

Good pratice to store the conf file withing the code repo

**Template** : has its own metadata and spec section
- applies to a pod
- blueprint for a pod

**Labels and selectors** 
   -  labels are any key value pair
   -  they match a specific selector

**Ports** 
  -   service has a port where the service is located
  -  the service needs to know on which port should forward the request
  -  at which port is that pod listening ( Target Port )
  - endpoints : ip addresses of the pods that the service needs to forward the request
  -  to get the endpoints: kubectl get pod -o wide


## Step by step tutorial of a simple setup of a web app

1. create a mongo db pod with internal service, only pods within the same cluster can talk to it
2. create a mongo db express pod to connect to the db, to authenticate to the db
3. creating config map (with db url) and secret (db user and db password)
4. creating an external service : allows external requests to talk to the mongo express pod
![alt text](<Screenshot (2)-1.png>)

**Browser request flow**
![alt text](<Screenshot (3).png>)

### Detailed commands to use:

1. `create a cluster`
2. `create a mongo db deployment page`

```yaml
apiVersion : apps/v1
kind: Deployment
metadata:
    name: mongodb-deployment
    labels:
        app: mongodb
spec:
    replicas : 1
    selector:
        matchLabels:
            app: mongodb
    template:
        metadata: 
            labels:
                app: mongodb
        spec:
            containers:
            - name : mongodb
              image : mongo
              ports:
              - containerPort : 27017
              env :
              - name : MONGO_INITDB_ROOT_USERNAME
                value:
              - name : MONGO_INITDB_ROOT_PASSWORD   
                value: 
```
- to see on which port mongo is running, i can check mongodb on dockerhub. the default port is 27017

- username and password should not be stored here! but in secret

3. `Creating the secret configuration file`
- `kind` : "Secret"
- `name` : random name
- `type` : Opaque = default for key-value pairs

```yaml
apiVersion: v1
kind: Secret
metadata:
    name: mongodb-secret
    type: Opaque
    data:
        mongo-root-username:
        mongo-root-password:
```

The passwd and username should be base62 encoded