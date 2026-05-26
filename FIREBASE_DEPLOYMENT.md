# Firebase Deployment

Firebase project: `apexfan-mongodb-2026`

Hosting URL: `https://apexfan-mongodb-2026.web.app`

Cloud Run service: `apex-fan-mongodb`

Region: `us-central1`

## Architecture

Firebase Hosting serves the static UI in `public/`.

Requests under `/api/**` are routed to Cloud Run so the Express API can keep using MongoDB Atlas and Gemini credentials without exposing secrets in the browser.

## Low-Cost Settings

- Cloud Run `min-instances=0`
- Cloud Run `max-instances=1`
- 1 CPU, 512 MiB memory
- MongoDB Atlas M0/free cluster for judge data
- Secrets stored in Secret Manager, not committed to Git

## Deploy Order

1. Attach billing or upgrade this Firebase project to Blaze.
2. Reauthenticate Google Cloud CLI if needed:

```bash
gcloud auth login
gcloud auth application-default login
```

3. Enable deploy services:

```bash
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com --project apexfan-mongodb-2026
```

4. Create required secrets:

```bash
printf 'YOUR_MONGODB_URI' | gcloud secrets create MONGODB_URI --data-file=- --project apexfan-mongodb-2026
printf 'YOUR_GEMINI_API_KEY' | gcloud secrets create GEMINI_API_KEY --data-file=- --project apexfan-mongodb-2026
```

5. Deploy the API and Hosting from this folder:

```bash
npm run deploy
```

This runs the folder-specific scripts in `package.json`, with `--project apexfan-mongodb-2026` already specified.

API-only deploy:

```bash
npm run deploy:api
```

Hosting-only deploy:

```bash
npm run deploy:hosting
```
