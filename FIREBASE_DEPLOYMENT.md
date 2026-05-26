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
gcloud config set project apexfan-mongodb-2026
gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com
```

4. Create required secrets:

```bash
printf 'YOUR_MONGODB_URI' | gcloud secrets create MONGODB_URI --data-file=-
printf 'YOUR_GEMINI_API_KEY' | gcloud secrets create GEMINI_API_KEY --data-file=-
```

5. Deploy the API:

```bash
gcloud run deploy apex-fan-mongodb \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --min-instances 0 \
  --max-instances 1 \
  --cpu 1 \
  --memory 512Mi \
  --set-secrets MONGODB_URI=MONGODB_URI:latest,GEMINI_API_KEY=GEMINI_API_KEY:latest
```

6. Deploy Firebase Hosting:

```bash
firebase deploy --only hosting --project apexfan-mongodb-2026
```
