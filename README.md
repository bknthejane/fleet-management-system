
# DriveOp Fleet Management System

## Overview
DriveOp is a robust fleet management system designed to streamline operations for municipalities. The application is built with a modern technology stack, featuring Next.js for a dynamic front end and the ABP Framework for a scalable backend. The front end is hosted on Vercel, while the backend is deployed on Render, leveraging a Neon database for reliable data storage.

## Key Features

- **Super Admin:** Creates and manages municipalities and their respective admins.

- **Municipality Admin:**
  - Manages user accounts, including drivers and supervisors.
  - Adds and manages vehicles.

- **Supervisor:**
  - Creates and manages mechanic accounts.
  - Receives automated job cards for incidents logged by drivers.
  - Assigns job cards to mechanics.
  - Marks job cards as closed once the work is complete.

- **Driver:** Logs incidents from the field, which automatically generates a new job card.

- **Mechanic:**
  - Receives assigned job cards from supervisors.
  - Marks job cards as complete upon finishing the repair.

## Getting Started

### Cloning the Repository
Clone the entire repository:

```bash
git clone https://github.com/bknthejane/fleet-management-system
```

### Running the Project Locally

#### Frontend
Navigate to the frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The front end will be accessible at [http://localhost:3000](http://localhost:3000).

#### Backend
Navigate to the backend directory:

```bash
cd Backend
```

Install dependencies and configure your database connection string for your local PostgreSQL instance (or Neon, if preferred).

Run database migrations.

Start the backend application. The specific command will depend on your ABP setup (e.g., `dotnet run` for a .NET project).

## Deployment
- **Frontend:** The front end is deployed on Vercel and automatically builds from the main branch.
- **Backend:** The backend is deployed on Render, connected to the Neon database.

## Technologies Used
- **Frontend:** Next.js
- **Backend:** ABP Framework
- **Database:** Neon (PostgreSQL)
- **Hosting:** Vercel (Frontend), Render (Backend)
