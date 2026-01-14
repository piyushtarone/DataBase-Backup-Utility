#!/bin/bash

echo "Testing CLI..."
db-backup --help || exit 1

echo "Testing MySQL connection..."
db-backup test-connection --db mysql --database test_db || exit 1

echo "Running backup..."
db-backup backup --db mysql --database test_db --output ./smoke-backups || exit 1

echo "Smoke test passed ✅"
