#!/bin/bash
set -e

# DB_FILE=./local.db
DB_FILE=./prod.db

# Restore the database if it does not already exist.
if [ -f DB_FILE ]; then
  echo "Database already exists, skipping restore"
else
  echo "No database found, restoring from replica if exists"
  litestream restore -v -if-replica-exists -o DB_FILE "${REPLICA_URL}"
fi

# Run litestream with your app as the subprocess.
exec litestream replicate -exec "node dist/index.mjs"
