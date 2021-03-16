#!/bin/bash

if [ ! -d "./backend/api/node_modules" ]; then
  cd backend/api
  npm install
  cd ../..
fi

sudo chmod +x ./auth/*.sh

if [ ! -d "./auth/db/dbdata" ]; then
  docker-compose -f ./auth/docker-compose.yml up -d
  docker-compose -f ./backend/docker-compose.yml up
  ./auth/import-realm.sh
else
  docker-compose -f ./auth/docker-compose.yml up -d
  docker-compose -f ./backend/docker-compose.yml up
fi

