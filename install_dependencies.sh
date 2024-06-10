#!/bin/bash

# Install dependencies for each service
services=("auth-service" "registration-service" "problem-service" "solution-service" "frontend")

for service in "${services[@]}"; do
  echo "Installing dependencies for $service..."
  cd $service
  npm install
  cd ..
done
