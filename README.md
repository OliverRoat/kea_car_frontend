# Kea Car Frontend
A frontend application designed for the backend application found at https://github.com/niiicolai/kea_car_backend.

## CI/CD 
[![Publish VM Production](https://github.com/OliverRoat/kea_car_frontend/actions/workflows/ci-cd.yaml/badge.svg)](https://github.com/OliverRoat/kea_car_frontend/actions/workflows/ci-cd.yaml)

The project uses GitHub Actions for CI/CD. The workflow is defined in `.github/workflows/ci-cd.yaml`. The workflow is triggered on push to the `main` branch. The workflow builds the project, runs the E2E tests, and deploys the project to the VM. 

## Install

Install dependencies
```bash
npm i
```

Setup environment variables
```bash
cp .env.example .env
```

## Development

Start the development server
```bash
npm run dev
```

## Build

To build the project, run the following command:
```bash
npm run build
```

## Sitemap

To generate the sitemap, run the following command:
```bash
npm run sitemap
```

## Lint

To lint the project, run the following command:
```bash
npm run lint
```

## E2E test
The project uses Cypress for E2E tests. 

*Note: The frontend and backend servers must be running before running the tests.*

To open the Cypress test runner, run the following command:
```bash
npm run cy:open
```

To run the tests in headless mode, run the following command:
```bash
npm run cy:run
```

## Docker

To build the Docker image, run the following command:
```bash
docker build -t frontend:v1.0 .
```

To run the Docker container, run the following command:
```bash
docker run -p 3000:3000 frontend:v1.0
```

## Docker Compose

**Note: You must build the Docker image because the Docker Compose expects a local image.**

To start the Docker Compose, run the following command:
```bash
docker-compose -f docker-compose.yaml up -d
```
