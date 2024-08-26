

set the new image  :  

kubectl set image deployment/first-app kub-first-app=<dockname>/<appname>:<tag>  



update alreadt running project  

kubectl rollout status deployment/first-app  

kubectl get deployments  --  get site  

kubectl rollout status deployment/<appname>  

kubectl rollout undo deployment/<appname> : undo latest deployment  (add --to-revision=<number>) go to <number>  deployment  


kubectl rollout history deployment/<appname> --revision=1  

kubectl get deployments/pods

kubectl delete deployment <name>  

