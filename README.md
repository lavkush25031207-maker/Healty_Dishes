# Healthy Dishes

Full-stack mini restaurant app with online ordering, dine-in table ordering, reservations, menu availability and order tracking.

## Stack

- Frontend: React, TypeScript, Vite, Zustand, Axios, React Router
- Backend: Java 21, Spring Boot, Spring Data JPA, Bean Validation
- Database: MySQL
- API testing: Swagger UI / OpenAPI

## Local setup

Keep MySQL running. The backend creates the `healthy_dishes` database automatically. Its default credentials are `root` / `root`. Override these when required:

```powershell
$env:DB_USERNAME="root"
$env:DB_PASSWORD="your_mysql_password"
```

Start the backend:

```powershell
cd backend
mvn spring-boot:run
```

Swagger UI: `http://localhost:8080/swagger-ui.html`

Start the frontend in a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. Vite proxies `/api` requests to Spring Boot at port `8080`.

The frontend uses its local preview menu by default, so it does not generate proxy errors when the backend is stopped. To use live MySQL data, create `frontend/.env` with:

```env
VITE_USE_LIVE_API=true
```

## Main APIs

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/api/menu-items` | Available menu |
| POST | `/api/menu-items` | Add a dish |
| PATCH | `/api/menu-items/{id}/availability` | Change availability |
| POST | `/api/bookings` | Reserve a table |
| POST | `/api/orders` | Delivery, pickup or dine-in order |
| GET | `/api/orders/track/{orderNumber}` | Track an order |
| PATCH | `/api/orders/{id}/status` | Update order status |

Sample dishes are inserted only when the menu table is empty.

## Production deployment

The repository is prepared for this setup:

- Frontend: Vercel
- Backend API: Render Web Service
- Database: Render PostgreSQL

### 1. Push the repository to GitHub

```powershell
git add .
git commit -m "Prepare production deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/Healthy_Dishes.git
git push -u origin main
```

If `origin` already exists, use `git remote set-url origin <repository-url>`.

### 2. Deploy the backend and database on Render

1. Open Render and choose **New > Blueprint**.
2. Connect this GitHub repository. Render reads `render.yaml` and creates the API and PostgreSQL database.
3. The Blueprint configures `CORS_ALLOWED_ORIGINS` for the GitHub Pages frontend.
4. Wait for the API deployment and copy its URL, for example `https://healthy-dishes-api.onrender.com`.
5. Verify `https://healthy-dishes-api.onrender.com/actuator/health` returns an `UP` status.
6. Open the live Swagger UI at `https://healthy-dishes-api.onrender.com/swagger-ui.html`.

The production profile uses PostgreSQL. Local development continues to use MySQL.

### 3. Deploy the frontend on Vercel

1. Import the same GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Keep framework preset **Vite**, build command `npm run build`, and output directory `dist`.
4. Add these production environment variables:

```env
VITE_API_URL=https://healthy-dishes-api.onrender.com/api
VITE_USE_LIVE_API=true
```

5. Deploy and copy the generated Vercel URL.

### 4. Connect frontend CORS

If you also deploy the frontend to Vercel, add its exact URL to `CORS_ALLOWED_ORIGINS` in Render:

```env
CORS_ALLOWED_ORIGINS=https://lavkush25031207-maker.github.io,https://your-project.vercel.app
```

For multiple frontend domains, use a comma-separated list. Save the environment settings and redeploy the API. Future pushes to `main` automatically redeploy both connected services.

### 5. Deploy the same frontend on GitHub Pages

The repository includes `.github/workflows/deploy-pages.yml`. It builds the frontend with the `/Healty_Dishes/` base path while Vercel continues using `/`.

1. Open GitHub repository **Settings > Secrets and variables > Actions > Variables**.
2. Create a repository variable named `VITE_API_URL` with this value:

```text
https://healthy-dishes-api.onrender.com/api
```

3. Open **Settings > Pages** and set **Source** to `GitHub Actions`.
4. Open the **Actions** tab and run **Deploy frontend to GitHub Pages**, or push a commit to `main`.
5. The frontend will be available at `https://YOUR_USERNAME.github.io/Healty_Dishes/`.

Update the Render API environment so both frontend origins are allowed:

```env
CORS_ALLOWED_ORIGINS=https://your-project.vercel.app,https://YOUR_USERNAME.github.io
```

Do not include `/Healty_Dishes/` in the GitHub CORS origin because a browser origin contains only the scheme and host.
