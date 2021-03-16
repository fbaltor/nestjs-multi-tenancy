cd backend/api
npm install
cd ../..
docker-compose -f ./backend/docker-compose.yml up -d
docker-compose -f ./auth/docker-compose.yml up -d
