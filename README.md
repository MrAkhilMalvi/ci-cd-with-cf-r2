# CF R2 + Vite React + Docker + CI/CD (Test Project)

This is a simple React + Vite frontend used to test a full flow:

- Build static files
- Upload to Cloudflare R2
- Build and push Docker image
- Deploy to a VPS with Docker

## 1) Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## 2) Build and preview locally

```bash
npm run build
npm run preview -- --host
```

Open `http://localhost:4173`.

## 3) Docker (local test)

```bash
docker compose up --build
```

Open `http://localhost:8080`.

If you want to test pulling a prebuilt image, create a local `.env` file from `.env.example` and set `IMAGE`.

## 4) Cloudflare R2 setup

Create an R2 bucket and note these values:

- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`

Optional: set a public R2 domain if you want public access to your static files.

## 5) GitHub Actions secrets

Add these repository secrets:

Required for R2 upload:
- `R2_ACCOUNT_ID`
- `R2_ACCESS_KEY_ID`
- `R2_SECRET_ACCESS_KEY`
- `R2_BUCKET`

Required for Docker push:
- `DOCKER_PUSH_ENABLED` (set to `true`)

Required for VPS deploy:
- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `VPS_PORT` (optional, default 22)
- `GHCR_USERNAME`
- `GHCR_PAT`

Notes:
- `GHCR_PAT` must have `read:packages` and `write:packages`.
- If you do not set `VPS_HOST`, deploy step will be skipped.

## 6) CI/CD flow

On every push to `main`:

1. Build the Vite app.
2. Upload `dist/` to R2.
3. Build and push Docker image to GHCR.
4. SSH into VPS and restart the container.

## 7) VPS access

The deploy step runs a container on your VPS port `8080`, so the app will be available at:

```
http://<VPS_IP>:8080
```

Make sure Docker and the Docker Compose plugin are installed on the VPS.

## 8) Repo creation (example)

```bash
git init
git add .
git commit -m "Initial Vite + R2 + Docker + CI setup"
git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## 9) How R2 upload works

The workflow uses the AWS CLI with the R2 S3 endpoint:

```bash
aws s3 sync dist s3://$R2_BUCKET \
  --endpoint-url https://$R2_ACCOUNT_ID.r2.cloudflarestorage.com \
  --delete
```

---

If you want me to customize the pipeline (e.g., use Docker Hub instead of GHCR, or disable VPS deploy), tell me the exact changes and I will update it.
