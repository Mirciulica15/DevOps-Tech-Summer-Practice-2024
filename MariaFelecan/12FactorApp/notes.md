# 12-Factor App

1. **Codebase**
   - one codebase tracked in version control, many deploys 

2. **Dependencies**
   - explicitly declare dependencies, manage with a dependency manager

3. **Config**
   - store configuration in the environment (environment variables)

4. **Backing Services**
   - treat backing services (databases) as attached resources

5. **Build, Release, Run**
   - separate build, release, and run stages

6. **Processes**
   - run the app as stateless processes, store state externally

7. **Port Binding**
   - export services via port binding

8. **Concurrency**
   - scale out by running multiple processes

9. **Disposability**
   - make processes quick to start and stop gracefully

10. **Dev/Prod Parity**
    - keep development, staging, and production as similar as possible

11. **Logs**
    - treat logs as event streams, aggregate for analysis

12. **Admin Processes**
    - run admin tasks as one-off processes using the same codebase
