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

### Minikube and Kubectl Setup
 
 




















