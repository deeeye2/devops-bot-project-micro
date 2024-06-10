#!/bin/bash

# Stop and remove all containers
docker-compose down -v --remove-orphans
docker system prune -a -f

# Remove unused volumes
docker volume prune -f

# Remove unused networks
docker network prune -f
