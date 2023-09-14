#!/bin/sh
echo "Creating test .env file ..."
tee -a .env << END
PORT=3000
POSTGRES_USER=postgres
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_PASSWORD=postgres
POSTGRES_DB=myapp

JWT_TOKEN_SECRET=38608b847677a380ae0f9bac1869d55fcbf59072
ID_TOKEN_VALIDITY=60m
END
echo "Done creating test configs"
