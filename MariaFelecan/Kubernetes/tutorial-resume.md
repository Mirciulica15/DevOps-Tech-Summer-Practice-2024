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
   - selector used to connect to pod through label

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
                valueFrom:
                    secretKeyRef:
                        name: mongodb-secret
                        key: mongo-root-username
              - name : MONGO_INITDB_ROOT_PASSWORD   
                valueFrom: 
                    secretKeyRef:  # adding this only in step 5
                        name: mongodb-secret
                        key: mongo-root-password
    ---
    appVersion: v1   #adding this after the first configuration, in step 7
    kind: Service
    metadata:
        name: mongodb-service
    spec:
        selector: 
            app: mongodb
        ports:
        - protocol: TCP
          port: 27017
          targetPort: 27017
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
        mongo-root-username: <something-encoded>
        mongo-root-password: <something-encoded>
```

The passwd and username should be base64 encoded:
echo -n 'username' | base64

4. `kubectl apply -f secret` 
5. `referencing the secret in the mongo configuration file (with secretFrom)`
6. `creating the mongo deployment`

we can put multiple documents in 1 file, we need to separate them by ---
7. `adding the service part and applying the service` : kubectl apply -f mongo config file

kubectl get all | grep mongodb

8. `creating a new file for mongo express`

```yaml
apiVersion : apps/v1
kind: Deployment
metadata:
    name: mongo-express
    labels:
        app: mongo-express
spec:
    replicas : 1
    selector:
        matchLabels:
            app: mongo-express
    template: #pod definition
        metadata: 
            labels:
                app: mongo-express
        spec:
            containers:
            - name : mongo-express
              image : mongo-express
              ports:
              - containerPort: 8081
              env:
              - name: ME_CONFIG_MONGODB_ADMINUSERNAME
                valueFrom: 
                    secretKeyRef: 
                        name: mongodb-secret
                        key: mongo-root-username
              - name: ME_CONFIG_MONGODB_ADMINPASSWORD
                valueFrom:
                    secretKeyRef: 
                        name: mongodb-secret
                        key: mongo-root-password      
              - name: ME_CONFIG_MONGODB_SERVER
                valueFrom:
                    configMapKeyRef:  
                        name: mongodb-configmap  # added after step 9
                        key: database_url
     ---
    appVersion: v1   #adding this only in step 10
    kind: Service
    metadata:
        name: mongodb-express-service
    spec:
        selector: 
            app: mongo-express
        type: LoadBalancer # another name for external service
        ports:
        - protocol: TCP
          port: 8081
          targetPort: 8081
          nodePort: 30000 # must be between 30000-32767
```
ConfigMap:  - external configuration
            - centrlized

9. `creating the Config Map`

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
    name: mongodb-configmap
data:
    database_url: mongodb-service
```

if we want to reference the config map inside the deployment, we need first to create it
kubectl apply -f mongo-configmap.yaml
kubectl apply -f mongo-express.yaml

10. `we need an external service, so we can access mongo from the web`

we add the service in the same file with the mongo express

kubectl apply -f mongo-express.yaml

minikube service mongo-express-service => creates a server web page

## Kubernetees Namespaces

We can organize a cluster in namespaces
Namespace = virtual cluster inside the cluster
There are **4 namespaces by default**:
1. `kube-system`
    not meant for our use, should not be modified
    syste processes are deployed here
2. `kube-public`
    publicely accessible data
    a config map which contains cluster information
3. `kube-node-lease`
    each node has associated lease object in namespaces

    Leases in Kubernetes help manage and organize tasks by ensuring only one component (like a controller) is the leader at a time. This prevents conflicts and helps keep things running smoothly in a cluster

    this determines the availability of a node
4. `default` : resources we create are located here

**Creating a namespace**

- Using kubectl create namespace <name>
- Using namespace config file

**Why should i use namespaces?**

- if we use only the default namespaces, we cant get any overview of what we have in there, because its going to have way to much stuff from many places
=> we should group resources into namespaces: ex: database namespacem monitoring namespace, nginx-ingress namespace,, elastic stack namespaces

- if two teams work in the same namespace, and have deployments with same name but different configurations, they would overwrite each other

- if we have 2 versions of the same application in the same cluster

- access limits for resources meant to be seen by only some workers

- we can put a limit to CPU, RAM, Storage usage per namespace

**Characteristics of namespaces**

- we cant access most resoures from another namespace => each namespace must create their own ConfigMap, even if they reference the same resources

## Creating a component in namespaces

By default, if we dont define a specific namespace, components are created in  default namespace

**Adding the namespace**: 
1. kubectl apply -f mysql-configmap.yaml --namespace=my-namespace
2. from the configuration file of the config map, in metadata, we can write namespace: my-namespace - BETTER WAY, bc its better documented

**Changing the namespace**
With kubens
1. install kubencx
2. kubens => this will give all the namespaces and highlight the ones that are active
3. kubens my-namespace => this changes the active namespace to my-namespace

## Kubernetees Ingress explained

When we only have the service, we can access the web app through http://service-ip:port

The way to avoid having an ugly link is to use ingress:

we dont open the app through ip address and port, but a link name that forwards the request to the service link

**Ingress file example:**

- Simple http, no secure connection configuration

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
    name: myapp-ingress
spec:
    rules:
    - host: myapp.com
      http:
        paths: 
        - backend:
            serviceName: myapp-internal-service
            servicePort: 8080
```

### How to configure ingress in my cluster:

Ingress Controller Pod = evaliates all the rules, manages redirections, entrypoint to cluster

Cloud Load Balancer implemented by cloud provider -> Ingress Controller Pod

**Installing ingress controller in minikube:** *minikube addons enable ingress*

dashboard-ingress.yaml:

```yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
    name: dashboard-ingress
    namespace: kubernetees-dashboard
spec: 
    rules:
    - host: dashboard.com
      http: 
        paths
```

