docker exec -it auth-server /opt/jboss/keycloak/bin/standalone.sh \
-Djboss.socket.binding.port-offset=100 -Dkeycloak.migration.action=import \
-Dkeycloak.migration.provider=singleFile \
-Dkeycloak.migration.file=/tmp/app.json \
-Dkeycloak.profile.feature.upload_scripts=enabled
