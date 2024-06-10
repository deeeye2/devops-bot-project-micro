# devops-bot-project-micro

Access the Application:

Ensure your services are running
kubectl get services

Project Structure
devops-bot/
├── auth-service/
│   ├── Dockerfile
│   ├── authService.js
│   ├── package.json
│   └── .env
├── registration-service/
│   ├── Dockerfile
│   ├── registrationService.js
│   ├── package.json
│   └── .env
├── problem-service/
│   ├── Dockerfile
│   ├── problemService.js
│   ├── package.json
│   └── .env
├── solution-service/
│   ├── Dockerfile
│   ├── solutionService.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   ├── styles.css
│   ├── dashboard.html
│   ├── dashboard.css
│   ├── app.js
│   ├── package.json
│   └── .env
└── k8s/
    ├── auth-deployment.yaml
    ├── auth-service.yaml
    ├── registration-deployment.yaml
    ├── registration-service.yaml
    ├── problem-deployment.yaml
    ├── problem-service.yaml
    ├── solution-deployment.yaml
    ├── solution-service.yaml
    ├── frontend-deployment.yaml
    └── frontend-service.yaml

kubectl apply -f k8s/devops-bot-pod.yaml


