🗄️ Database Backup Utility (CLI-Based)

A CLI-based database backup and restore utility built using Node.js and TypeScript, designed to safely back up MySQL databases, compress backups, and restore data reliably in case of failure or data loss.

📌 Overview

The Database Backup Utility is a command-line application that helps prevent data loss by automating database backup and restore operations.
It focuses on reliability, data integrity, and cross-platform compatibility, especially for Windows environments.

The project follows a CLI-first approach, similar to real-world DevOps and backend engineering tools, before extending to UI or cloud integrations.

🎯 Problem Statement

Databases are critical assets, and data loss can occur due to:

Accidental deletion

System crashes

Server failures

Deployment mistakes

Manual backup processes are often:

Inconsistent

Error-prone

Difficult to restore

✅ Solution

This utility provides:

Reliable full database backups

Automatic compression to save storage

Safe restore functionality

Clear logging and error handling

A simple CLI interface

🛠️ Tech Stack
Category	Technology
Language	TypeScript
Runtime	Node.js (ESM)
CLI Framework	Commander.js
Database	MySQL
Backup Tool	mysqldump
Compression	Node.js zlib
Logging	Winston
Config Management	dotenv
🧱 Project Architecture
User
  ↓
CLI Command
  ↓
Configuration Loader (.env)
  ↓
Backup / Restore Engine
  ↓
Shell Executor (mysqldump / mysql)
  ↓
Compression / Restore Logic
  ↓
Filesystem (Backups & Logs)

📁 Project Structure
db-backup-cli/
│
├── src/
│   ├── cli/                 # CLI commands
│   ├── backup/              # Backup logic
│   ├── restore/             # Restore logic
│   ├── config/              # Environment config loader
│   ├── services/            # Compression and logging
│   ├── utils/               # Shell execution helpers
│   └── index.ts             # Application entry point
│
├── backups/                 # Generated backup files
├── logs/                    # Application logs
├── .env                     # Environment variables
├── package.json
├── tsconfig.json
└── README.md

⚙️ Environment Configuration

Create a .env file in the project root:

DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=db_backup_demo


⚠️ Do not commit .env to Git.

🔄 Workflow
🔹 Backup Workflow

User runs the backup command

Environment variables are loaded

Backup directory is created if missing

mysqldump exports the database to a .sql file

The SQL file is compressed to .sql.gz

The original .sql file is removed

Operation is logged

Success or failure message is displayed

🔹 Restore Workflow

User provides a backup file path

File existence is validated

.sql.gz file is decompressed

SQL content is piped into MySQL

Tables and data are restored

Temporary SQL file is deleted

Operation is logged

Success or failure message is displayed

🧠 Algorithm (Simplified)
Backup Algorithm
START
Load configuration
Ensure backup directory exists
Generate timestamped filename
Run mysqldump
IF SQL file exists
   Compress SQL file
   Delete original SQL
   Log success
ELSE
   Log failure
END

Restore Algorithm
START
Check if backup file exists
Decompress SQL file
Pipe SQL into MySQL
Delete temporary SQL file
Log success
END

🧪 CLI Commands
🔹 Backup Command
npm run dev backup


Creates a compressed backup file:

backups/db_backup_demo_YYYY-MM-DD-HH-MM-SS.sql.gz

🔹 Restore Command
npm run dev restore -- -f backups/db_backup_demo_YYYY-MM-DD-HH-MM-SS.sql.gz


Restores:

Database tables

Schema

Data

📜 Logging

All backup and restore operations are logged in:

logs/app.log

Example Log Entry
{
  "level": "info",
  "message": "Backup completed",
  "timestamp": "2025-12-28T11:05:52.097Z"
}

🔐 Security Considerations

Database credentials are stored only in .env

Passwords are never logged

Backup operations fail safely

File existence checks prevent corruption

✅ Features Implemented (Phase 1)

✔ MySQL full backup
✔ Compressed backups
✔ Restore functionality
✔ CLI-based interface
✔ Cross-platform compatibility (Windows-safe)
✔ Structured logging
✔ Error handling

🚀 Future Enhancements

Database connection testing

PostgreSQL support

AWS S3 cloud backups

Scheduler (cron jobs)

Backup retention policy

Web-based dashboard (UI)

🧠 Key Learnings

CLI tool design

Database backup strategies

Cross-platform shell execution

TypeScript + Node.js ESM setup

Error handling and logging

Real-world DevOps concepts

🏁 Conclusion

This project demonstrates a production-style approach to database backups using modern backend tools.
It is designed to be reliable, extensible, and scalable, making it suitable for real-world usage and future SaaS expansion.
