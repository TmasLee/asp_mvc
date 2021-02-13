#!/bin/sh

DOCKER_IMAGE="884207845078.dkr.ecr.us-east-1.amazonaws.com/astronautsloth:latest"
AWS_PROFILE="xdwarrior"
DOCKER_LOGIN=$( aws ecr get-login-password --region us-east-1 --profile $AWS_PROFILE | docker login --username AWS --password-stdin 884207845078.dkr.ecr.us-east-1.amazonaws.com )

docker push $DOCKER_IMAGE

cluster=AstronautSloth

# Get services - figure out how to get specific service in case we need to add more services
service=$(aws ecs list-services --cluster $cluster --output text --region us-east-1 --query serviceArns --profile $AWS_PROFILE)

# List and stop tasks
tasks=$(aws ecs list-tasks --cluster $cluster --output text --region us-east-1 --query taskArns --profile $AWS_PROFILE)
echo Stopping old tasks : $tasks
for T in $tasks; do aws ecs stop-task --cluster $cluster --task $T --region us-east-1 --query serviceArns --profile $AWS_PROFILE; done

# Update service + deploy
aws ecs update-service --service $service --cluster $cluster --region us-east-1 --force-new-deployment --profile $AWS_PROFILE
