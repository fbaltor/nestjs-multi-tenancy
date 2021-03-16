#!/bin/bash

cd backend/api
npm install
cd ../..

sudo chmod +x ./auth/{*.sh}

if [ ! -d "./auth/db/dbdata" ]; then
  docker-compose -f ./backend/docker-compose.yml up -d
  docker-compose -f ./auth/docker-compose.yml up -d
  ./auth/import-realm.sh
else
  docker-compose -f ./backend/docker-compose.yml up -d
  docker-compose -f ./auth/docker-compose.yml up -d
fi

