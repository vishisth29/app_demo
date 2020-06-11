#!/usr/bin/env bash

echo Creating new user and database

psql -v ON_ERROR_STOP=1 --username "postgres" --dbname "template1" <<-EOSQL
  CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypass';
  CREATE DATABASE mydb WITH OWNER myuser;
  CREATE USER test;
  CREATE DATABASE test;
  GRANT ALL PRIVILEGES ON DATABASE test TO test;
EOSQL