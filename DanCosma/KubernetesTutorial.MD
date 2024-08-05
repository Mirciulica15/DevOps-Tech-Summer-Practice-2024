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














