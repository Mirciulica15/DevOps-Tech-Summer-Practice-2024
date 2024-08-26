  #TERRAFORM TUTORIAL AND NOTES FROM THE COURSE

  **wHAT IS TERRAFORM?**

  Terraform automates and manages our infrastructure, our ptlatform and the services that run on that platform.

  Terraform is open-source and declarative(declarative= defines WHAT end result we want).

  It is a tool for infrastructure provisioning.

  We need to prepare:
  
  1. Private network space
  2. ec2 server instances
  3. install Docker and other tools on that servers
  4. Security

After that we can deploy the apps.

Terraform is used in the provisioning of the instracture phase.


**Differences between Ansible and Terraform**

Both are **Infrastucture as code.**

Terraform:
* Mainly a provisioning tool.

Ansible:
* Mainly a config tool


Managing the infrastructure can be done easy with Terraform.
Another common case for using terraform is replicating the infrastructure as DEV and PROD environment.

How does terraform connect to AWS, Google Cloud, etc.

2 main componnents:

* **Core(uses 2 input dources(TF-Config and TF State)) takes the inputs and figures what needs to be done to get to the desired state.**
* **Providers for specific technologies(AAWS,Cloud, Kubernetes,etc).Are cam peste 100 de provideri.**

### What does declarative mean exactly?

**you define the end state in the config file**

We need to define the end of the actions that we do. Declarativ practic, este ajustarea vechiului config file si re-executarea acestuia.

Always knows the current setup.

Clean and small config tme.


### Terraform commands for diffrent stages.

1. refresh :  Query the infrastructure to get current state.
2. Plan:  Creates an execution plan.
3. Apply(actual execution of plan happens)
4. Destroy:  Destroys the whole setup and clears all resources and infrasture.


 


