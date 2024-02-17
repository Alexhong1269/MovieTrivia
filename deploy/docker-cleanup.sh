#!/bin/bash
CONTAINER_NAME = "movie"

# Stop container
docker stop $CONTAINER_NAME

# Remove container
docker rm $CONTAINER_NAME

echo "Container $CONTAINER_NAME removed!"