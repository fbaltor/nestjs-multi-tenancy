#!/bin/bash

set -e

if [ ! -x "./auth/export-realm.sh" ] || [ ! -x "./auth/import-realm.sh" ]; then
  sudo chmod +x ./auth/*.sh
fi

if [ ! -d "./backend/api/node_modules" ]; then
  cd backend/api
  npm install
  cd ../..
fi

if [ ! -d "./auth/db/dbdata" ]; then
  ./auth/import-realm.sh
fi

docker-compose -f ./auth/docker-compose.yml up -d

docker-compose -f ./backend/docker-compose.yml -p backend up -d
docker exec db-server bash < ./backend/db/postgresql/create-table.sh
