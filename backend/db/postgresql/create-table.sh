# To run this script, execute "docker exec -i db-server bash < create-table.sh"

#!/bin/bash
set -e

PGPASSWORD=password

psql --username "postgres" --dbname "db_a" <<-EOSQL
  CREATE TABLE IF NOT EXISTS products (
          product_id INTEGER,
          product_name VARCHAR
  );
  INSERT INTO products (product_id, product_name)
  VALUES (1, 'a');
EOSQL

psql --username "postgres" --dbname "db_b" <<-EOSQL
  CREATE TABLE IF NOT EXISTS products (
          product_id INT,
          product_name VARCHAR
  );
  INSERT INTO products (product_id, product_name)
  VALUES (2, 'b');
EOSQL

psql --username "postgres" --dbname "db_c" <<-EOSQL
  CREATE TABLE IF NOT EXISTS products (
          product_id INT,
          product_name VARCHAR
  );
  INSERT INTO products (product_id, product_name)
  VALUES (3, 'c');
EOSQL
