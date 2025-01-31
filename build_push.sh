#!/bin/bash

# Variables
REPOSITORY_URL=$(terraform output -raw ecr_repository_url)
IMAGE_TAG="latest"

# Construir la imagen Docker
docker-compose build todo_app

# Iniciar sesión en ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $REPOSITORY_URL

# Etiquetar la imagen
docker tag technical-test-nodejs_todo_app:latest $REPOSITORY_URL:$IMAGE_TAG

# Subir la imagen a ECR
docker push $REPOSITORY_URL:$IMAGE_TAG