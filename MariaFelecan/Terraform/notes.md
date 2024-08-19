## IaC (Infrastructure as code)

= management of it infrastructure using machine-readable configuration files
`Terraform` : - type of IaC, taking code and making it readable for the machine, but for the human as well
Terraform uses a declarative language called HashiCorp Configuration Language (HCL). HCL is designed to be both machine-readable and human-readable.
              - declarative language
              - automates the creating and updating the infrastructure
              - automates replictaing the infrastructure for production

- Terraform takes what I wrote in the terraform file and does all the hard work of setting up those computers, databases, networks, and other things for my app exactly how I described them, so I dont have to do this anymore

Provider :  is like a translator between Terraform and the service you want to manage. For example, if you want to create resources on AWS, you'd use the AWS provider

ex of a terraform (.tf) file:

```tf
provider "aws" {
    region = "us-east-1
}
```
- when we run this, it is going to use the aws access key i need to configure before

### Instructions

- **`terraform init`**: Initializes the Terraform project.
  
- **`terraform validate`**: Checks the syntax and validity of the configuration file.
  
- **`terraform plan`**: Creates an execution plan.
  
  - Terraform reads your configuration files and compares them to the current state of the infrastructure.
  
  - It then generates a plan showing what changes (if any) will be made to bring the infrastructure to the desired state.
  
  - The plan outlines what resources will be created, modified, or destroyed but doesn't actually make any changes yet.

- **`terraform apply`** : applies the execution plan

- **`terraform destroy`** : destroys all the configurations and the resource

- **`terraform refresh`** : queries the infrastructure provider to get the up to date state, so it can now what is the state of the infrastructure
### Creating an instance

```
provider "aws" {
    region = "us-east-1
}

resource "aws_instance" "example-name"{
    ami = "" # we get this from the aws console, from 'create an instance', we take the ami code of the nstance we want
    instance_type = "t2.micro"
}
```

EC2 = like a virtual machine where your app can run

* assignment: create a provider config, ec2 resource block, ami for windos server 2019, instance type arg and set as t2.micro

```
provider = "aws"{
    region = cv
}
resource "aws_instance" "name"{
    ami = ""
    instance_type = "t2.micro"
}
```

### Setup

2 steps:

1. `Preparing the infrastructure` - by devops

    - create a private network space
    - ec2 server instances
    - instal docker and other tools
    - security

All these need to be made in the correct order

2. `Deploying applications` - by the software developer

### Difference between Ansible and terraform

Both : IaC

Ansible                 |           Terraform

config tool             |         infrastructure provisioning tool


### How does terraform work?

**`Terraform Architecture`**

2 input sources:

1. Core

    uses 2 input sources:
    - TF-Configuration file(the one we write)
    - State (how the current state of the infrastructure is)

Core takes the 2 and compares the configuration we wnt to the actual state, and decides what needs to be done in order to make them the same
It creates an execution plan, and then uses the providers to carry out the execution plan

2. Providers

ex: AWS, Azure, Kubernetees
Through the provider we have access to their resources
