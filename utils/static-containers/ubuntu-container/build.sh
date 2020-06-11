#!/bin/bash

IMAGE=$(docker images base_ubuntu --format "{{.Repository}}");

if [ "$IMAGE" ]; then
  echo "Found base_ubuntu. No need to build.";
  exit 0;
fi

echo "HERE:" $(pwd)

D_PATH=$(realpath ./utils/static-containers/ubuntu-container);

docker build "$D_PATH" -t base_ubuntu;
