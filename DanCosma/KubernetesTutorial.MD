# Kubernetes Course(K8s)

1. What is K8s?
2. K8s Arhitecture
3. Main Components
4. Minikube si Kubectl- Local setup
5. Main Cubectl Commands- For K8s CLI
6. K8s Yaml config files
7. Demo with MongodB
8. K8s Namespaces
9. K8s Ingress
10. Helm-Package Manager
11. Volumes
12. Stateful Apps- Deploy
13. K8s services


**DEF!: Kubernetes is an orchestration tool that was developed by google and it helps us manage conteinerized apps in diffrent deployment environments.**


Ce ofera K8s?

* Aplicatia nu are downtime putem spune ca are High Availability
* Aplicatia va avea performante bune si putem sa spunem despre ea ca are **SCALABILITATE**.
* Disaster Recovery - backup si restore in situatii dezastroase

COMPONENTE:

**1. Node and Pod**

**A Node is a fizical or virtual machine.It is like a server.**

**The most basic and smallest unit in K8s is the Pod.**

**Un Pod este o abstractizare a unui container de genul celui din Docker.**

De obicei se foloseste un application per pod.

**Fiecare Pod din K8s primeste un IP adress cu care pot comunica intre ele.**

Componentele Pod pot sa cada/moara foarte usor, adica sunt efemere, astfel, daca ai avut o legatura de la un pod App la un pod Database si un container moare aceasta legatura nu va mai exista, Deoarece noul container ce se creeaza pentru cel ce a dat crash are o adresa noua de IP si nu mai exista relatia initiala.

New IP Adress on re-creation(Ce am spus mai sus dar mai scurt.)

**2. Servicce amd Ingress**

### Service is a permanent IP address(static) that can be attached to each pod.   The lifecycle of the pod and the service are not connected so if a pod dies, the service IP doesn't change.

If we want a app to be accesible through a browser we need to create an **EXTERNAL SERVICE**.

Pentru un database nu este o idee buna sa se poata face query uri publice asa ca pentru el se poate creea un **Internal Service**.

Internal si External trebuie sa fie specificate in comanda.

**Ingress ajuta la infrumusetarea URL-ului si functionalitatii intr-un node. De exemplu request-ul merge mai intai in INGRESS si face dupa forward catre Service.**

### Ingress routes traffic into the cluster.

**3. ConfigMap si SECRET**

### Database URL de obicei e pus in built app.

**ConfigMap:**

 Is an external configuration of our app. In it it has the config info that we use for the Pods to make our life easier (so we dont have to rebuild, pull and push for the new version of the app) .

 ### Do not put credentials in a ConfigMap!!!

 **Secret:**

It is exactly like the Configmap but it is used to store sensitive Information. The info is stored in base64 encoded format.

### The built-in mechanism it is not enabled by default!!!

You can use ConfigMap and Secret as an environmental variable or as a properties file in our node and Pods.


## Data Storage in Kubernetes(Volumes)

In a node that does not have volumes if the process is restarted we lose all the data that we stored. That is not ideal.

To store it we use **Volumes**.

**A volume works by adding a real local/remote(outside of the cluster) storage to our pod database**.

We should think of a volume like an external storage that we plugged in our computer because the **K8s cluster DOESN'T MANAGE DATA PERSISTANCE.**


## Deployment and Stateful Set

So, as a basic Ideea if we have an app in production that runs and our App-Pod dies or we need to add something to it, our user will experience downtime. That is not acceptable for our domain of work so as a general ideea we replicate everything before we make changes(The raplica service is connected to the same Service).

Don't forget that Service has 2 functionalities:
1. Permanent IP Address 
2. Load Balancer (The server will catch the request and will forward it to the pod that is more easy.)

To crate a replica to our curent pod instance we need to create a blueprint for it. That component is called **DEPLOYMENT**.


In practica noi nu vom creea Pods, vom lucra si creea cu Deployments. 

**Un Deployment este un layer de abstractizare asupra Pod-ului. Eu ma gandesc la ei ca ar semana cu niste pointeri doar ca in loc de memorie ei fac trimitere la procesul de functionare al unui app.**

Acum daca un Pod ar muri un requestul va fi trimis prin serviciu la  un altpod(replica).

Ce facem daca un DB-Pod moare??

DB-Pod nu poate sa fie replicat prin deployment asa ca se va folosi **Stateful SET** . Um Statefull set se foloseste cand avem un MYSQL,MongoDb,Elastic, etc.


### Deployment for stateLESS apps

### StatefulSet for stateFUL apps or Databases.

StatefulSet fuctioneaza exact ca Deployment, dar sigura sincronizarea datelor din volume fara a aparea erori.

### !!! Deploying a StatefulSet is not easy so, as common practice DB are often hosted outside the K8s cluster.

## Kubernetes Basic Arhitecture

Exista 2 tipuri de noduri pe care Kubernetes opereaza:

1. **Master**
2. **Slave**

 
**1. Node Processes**

In fiecare Node exista 3 must-have procese pentru a manage-ui si schedjule aceste procese.

Worker Nodes(clustered) do the actual work.

1. Prima chestie care trebuie sa ruleze este **container runtime.** Trebuie instalat pe fiecare nod in parte

2. **Kublet**: Un proces din Kubernetes insusi care interfateaza atat cu container runtime si node. Kublet este responsabil pentru preluarea configuratiei si Rularea Pod-ului sau Start a Pod cu un container inauntru.

Un Cluster K8s este format din multiple noduri care trebuie neaparai sa aiba containere si Kublet instalate.

3. **Kube Proxy**:  Forwards the Requests and is also one of the 3 essential things to have installed on a node.  Asigura co aceasta comunicare functioneaza intr-un mod performant si cu low overhead-time .


### Cum se interactioneaza cu acest Cluster?

Toate procesele de tip Management sunt facute de **Master Nodes.**

### 1. Master Nodes

Au procese complet diferite fata de cele precizate anterior. Acestea au in total 4 procese care trebuie sa ruleze pe Master Nodes.

**1. API SERVER:**  Like a cluster gateway, and a gatekeeper for authentification.  

EX:

Some request ->API Server -> Validates Request ->Other Processes ->Pod

**2.Scheduler:**  

Ex:Schedule new Pod -> API SERVER -> Scheduler -> Selects Intelligently where to put the pod -> Kublet

**3. Controller Manager** Checks state changes of Pods

Ex: Controller Manager -> Schedule ->Kublet

**4.etcd:** Key Value Store of a cluster state AKA Cluster Brain.  All the changes in that cluster get stored in the key value store.

etcd tells all the other procceses what to do by means of information. 

Application data not stored in **etcd.**

In practica, un K8s e format din mai multe clastere asa ca vom avea nevoie de mai multe clustere.

Master Nodes use less resources!

### Basic Kubectl Commands

**CRUD COMMANDS**

* kubectl create deployent [name]
* kubectl edit  deployment [name]
* kubectl delete deployment [name]

**Status of diffrent K8s components**

* kubectl get nodes |pod|services|replicaset|deploymemt

**Debbuging pods**

* Log to console:  kubectl logs [pod name]
* Get interactive terminal: kubectl exec -it [pod name] -- bin/bash
 
 USAGE EXEMPLE FOR CREATE:

 **kubectl create deployment NAME --image\=image [--dry-run] [options]**

 Cand creeam un deployment el creeaza si un blueprint pentru creearea de pod-uri.

COMMAND: **kubectl get replicaset**

### Replicaset is managing the replicas of a Pod.



COMMAND:
**kubectl exec -it [pod name] --bin/bash**

With this command we get inside the container and we can execute commands in it.

We can ude config files for options to make ourlife easier.

COMMAND: **kubectl apply -f [filename{config-file.yaml}]**

K8s knows when to update and create deployment!

### Syntax of a Config File

A Config.yaml file has 3 main parts:

1. Metadata (name)
2.  Specification (spec)

The specifications in the .yaml file are something specific to the kind of element it is(deployment, service).

3. Status (Automaticly generated and added by K8s)

The tatus is the basis for the self-healing capabilities of the Kubernetes Cluster. The info about the update that was made in the .yaml file is taken out of the **etcd** file.


### .Yaml has a stict syntax indentation rule.

Store the config file with the code.


A template(blueprint for pods) has it's own metadata and spec section.
  

### HELM

Helm is a package manager for kubernetes(it is a collection of .yaml files) and it distributes them in public and private repos.

Helm also changes from version to version so, the basics are the most important part of them.

Helm Charts:  for database apps, monitoring apps, etc.

COMMANDS:  helm search <keyword
sau prin Helm Hub.

As a second feature of helm you can think of it as a **TEMPLATE ENGINE**.

Practic iti creeaza un template pentru toate microserviciile care poate sa fie folosit la comun, iar valorile dinamice care ar trb sa se schimbe se vor inlocui cu placeholders care cel mai probabil vor fi luati dintr-un alt fisier .yaml, ca de exemplu: **values.yaml**.

It is practical for CI/CD. In our build we can replace the values on the fly.

Another use  for the Helm features is when we are deploying some apps across diffrent environments.


### Helm Chart Structure

Directory structure:

* mychart/
* Chart.yaml  (contains all meta info abt the chart)
* values.yaml (values for the template file, they are th default values that can be changed later)
* charts/  (has chart dependencies)
* templates/
* ...

**How to override values.yaml data:**

1. Command: **helm install --values=myvalues.yaml <chartname**

Unde myvalues.yaml is a comepletely new yaml file. This values are called **ovveride values.**

2. Direct in command line: **helm install --set version=2.0.0**

### Release Management

It differs from v2 to v3.

Pe scurt cea mai mare schimbare este deprecierea componentei Tiller (de tip server) care a disparut in v3.

### Working with volumes in K8s

3 Components:

1. Persistent Volume
2. Persistent Volume Gain
3. Storage Class

Storage Reqs:

1. Storage that doesn't depend on the pof lifecycle.
2. Storage that must be available on all nodes.
3. Storage that needs to survive even if the cluster crashes.


**1.Persistent Volume(PV)**

It is of the cluster resource type. We can think of him like it is RAM or CPU that is used to store data. It is created via YAML FILE and is the kind: **PersistentVolume.**

Needs actual physical storage(K8s cluster or clound storage)

The physical storage is put in rhe spec section of a yaml file:

EX:

storage: 5Gi

aditional params: **persistentVolumeReclaimPolicy: Recycle**

storageClassName:slow

NFS parameters: 
path and server

**Persistent volumes are not NAMESPACED!!**

Types:

1. Local
1. remote

Local volumes violate rule 2 and 3.Data persistance req:

**X Being tied to a specific node**

**X Surviving cluster crashes**

For DB Persistance you should use Remote Storage.

**2. Persistent Volume Claim Component(PVC)**

 Aplication has to **claim** the Persistent Volume.
 We can't forget to Use that PVC in Pods Configuration. 

 The steps that the PVC takes in the process:

* Pod requests the volume through the PV claim
* Claim tries o find a volume in cluster
* Volume has the actual storage backend
* Claims must be in the same namespace
* Volume is ounted into the pod
* After that volume is mounted in container
* Now we can read/write in the storage

**ConfigMap and Secret**

They are local volumes and are not created via PV and PVC. They are also managed by K8s.

How to use them for our pod:

1.  Crate the ConfigMap and/or Secret component
2.  Mount that into your Pod/Container
   
  **3. STORAGE CLASS**

  Still gets configured through YAML file.

  Another Abstraction level:
   - abstracts undelying storage provider.
   - parameters for the storage

Storage class usage:

- Still req by the PVC.
- Pod claims storage via PVC
- PVC req storage from SC
- Sc creates PV that meets the needs of the Claim.


## Kubernetes Stateful

StatefulSet for stateful apps.

Stateful apps:
1. Databases
2. Apps that stores data

Stateless Apps:

1. don't keep record of state.
2. Each req is completely new

Stateless apps are deployed using Deployment.

Stateful Apps are deployed using StatefulSet.

## Kubernetes Services:

Types:
1. ClusterIP Services
2. Headless Services
3. NodePort Services
4. LoadBalancer Services

What is a Service in K8s?
 Each Pod has it's own IP Address, but pods crahs or die so we cant use its IP. 

 A service is a stable Ip addrress that that can acces the pod. Everypod has one

 A service had a loadbalancer for pod replicas so the service can get it's requests to one of this pods

 A good exemple for loose coupling

**ClusterIP Service:**

It is the most common.

Headless Services se folosesc in Stateful apps.
Cand crream un asemenea service punem la **clusterIP:none**.






























  























