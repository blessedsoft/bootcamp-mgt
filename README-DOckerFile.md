# Docker Guide (Manual Commands)

This guide uses **individual Docker commands** (no Compose) to run Postgres, the backend, and the frontend. It is written for Windows but works the same in Bash with minor path differences.

**Goal:**
- Postgres running on `localhost:5432`
- Backend running on `http://localhost:3001`
- Frontend running on `http://localhost:3000`

## Prerequisites
1. Docker Desktop installed and running.
2. A terminal (PowerShell or Bash).
3. Project root contains:
   - `bootcamp-demo-backend/`
   - `bootcamp-demo-frontend/`
   - `.env`

## Environment Variables
The backend reads DB settings from `.env` (uses `DB_*` variables).

Example `.env` (project root):
```env
DB_HOST=postgres-db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=Passw0rd
DB_DATABASE=DATABASE
PORT=3001
CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Tip: Use a non-default password for `DB_PASSWORD`.

---

## Step 1: Create a Docker Network
This allows containers to reach each other by name (e.g., `postgres-db`).

```bash
docker network create bootcamp-network
```

---

## Step 2: Start the Postgres Database
Run Postgres in the background and load credentials from `.env`.

```bash
docker run -d --name postgres-db --env-file .env -p 5432:5432 -v postgres_data:/var/lib/postgresql/data postgres:15-alpine
```

What this does:
1. `-d` runs the container in detached mode.
2. `--env-file .env` injects DB credentials.
3. `-p 5432:5432` exposes Postgres on your machine.
4. `-v postgres_data:/var/lib/postgresql/data` persists DB data.

---

## Step 3: Connect Postgres to the Network
Attach the database container to `bootcamp-network`.

```bash
docker network connect bootcamp-network postgres-db
```

---

## Step 4: Verify Postgres is Healthy
Check logs to confirm it started correctly.

```bash
docker logs -f postgres-db
```

Press `Ctrl+C` to stop following logs.

---

## Step 5: Build and Run the Backend
You can run the backend in a new terminal so Postgres logs keep running.

1. Move into the backend folder:
   ```bash
   cd bootcamp-demo-backend
   ```
2. Build the image:
   ```bash
   docker build -t bootcamp-backend .
   ```
3. Run the container:
   ```bash
   docker run -it --name bootcamp-backend --network bootcamp-network -p 3001:3001 bootcamp-backend
   ```

Notes:
- The backend connects to Postgres at `postgres-db:5432`.
- If `bootcamp-backend` name already exists, remove it:
  ```bash
  docker rm -f bootcamp-backend
  ```

---

## Step 6: Build and Run the Frontend
Open another terminal if the backend is running in the foreground.

1. Move into the frontend folder:
   ```bash
   cd ..\bootcamp-demo-frontend
   ```
2. Build the image:
   ```bash
   docker build -t bootcamp-frontend .
   ```
3. Run the container:
   ```bash
   docker run -it --name bootcamp-frontend --network bootcamp-network -p 3000:3000 bootcamp-frontend
   ```

Notes:
- If you run into a name conflict, remove the container:
  ```bash
  docker rm -f bootcamp-frontend
  ```

---

## Step 7: Access the Application
1. Frontend UI: `http://localhost:3000`
2. Backend API: `http://localhost:3001`

---

## Troubleshooting
1. **Backend cannot connect to Postgres**
   - Make sure Postgres is running: `docker ps`.
   - Confirm `.env` contains `DB_HOST=postgres-db`.
   - Ensure the DB container is on `bootcamp-network`.
2. **Port already in use**
   - Stop the conflicting process or change the port mapping.
3. **Stale containers**
   - Remove and restart:
     ```bash
     docker rm -f bootcamp-frontend bootcamp-backend postgres-db
     ```

---

## Cleanup (Optional)
1. Stop containers (Ctrl+C for foreground containers).
2. Remove containers:
   ```bash
   docker rm -f bootcamp-frontend bootcamp-backend postgres-db
   ```
3. Remove network:
   ```bash
   docker network rm bootcamp-network
   ```
4. Remove volume (deletes database data):
   ```bash
   docker volume rm postgres_data
   ```