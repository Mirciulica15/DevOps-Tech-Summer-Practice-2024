GitLab  - tries to be THE devops platform

-  it utomatically and continuously test, buuld, and release the code changes
- benefit : we already have our code on gitlab

`**CI/CD**`

CI: tests, build & package => artifact repo

CD: deploy to dev, deploy to staging, deploy to production

- a core part is executing tests

`**GitLab Architecture**`

1. GitLab instance / server

- where our source code & configsis stored
- knows what needs to be done

2. GitLa Runners : does what needs to be done


`**Pipeline config file**`

- it needs to be called: .gitlab-ci.yml

- jobs = run tetss/ build image/ deploy/ etc

    -> job to run the test: 

    run_tests: 
        script: 
        - make test (ex of the command we use to run tests)