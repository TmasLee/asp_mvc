#!/bin/sh

DOCKER_IMAGE="884207845078.dkr.ecr.us-east-1.amazonaws.com/astronautsloth:latest"

docker build . -t $DOCKER_IMAGE -f Dockerfile
