# Timesheet Tracking API

# Documentation

### Prerequisites

1. NodeJS = >v12
2. PostgreSQL

### commands to get you started

1. git clone https://github.com/jianwu0309/timesheet-tracking-backend.git and go to project folder.
2. create [.env](#sample-.env) file in config directory
3. `npm install` (install packages locally, since we don't mount node_modules in container)
4. `npm run start`

A collection of useful commands which might be helpful

### Linting / Code prettify

1. `npm run lint`
2. `npm run lint:fix`
3. `npm run format:check`
4. `npm run format:fix:all`

### Run tests

1. `npm run test`

### Sample .env

```
NODE_ENV=local

#Database
TYPEORM_DATABASE=vanapp
TYPEORM_ENTITIES=src/entities/**/*.ts
TYPEORM_HOST=vanapp.rds.amazonaws.com
TYPEORM_PASSWORD=xxxxxxxxx
TYPEORM_PORT=5432
TYPEORM_USERNAME=vanapp
```
