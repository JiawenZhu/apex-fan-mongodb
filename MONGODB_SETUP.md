# MongoDB CLI and API Setup

This project now has folder-local MongoDB commands. Run them from:

```bash
/Users/jiawenzhu/Developer/hackathon/apex-fan-mongodb
```

## Installed Local Tools

- `mongosh` for direct MongoDB shell access
- `atlas` for MongoDB Atlas project, cluster, and auth workflows

Verify:

```bash
mongosh --version
atlas --version
```

## Current Atlas Resources

- Atlas account: `zhujiawen519@gmail.com`
- Atlas organization ID: `607f4b9604a3a91e1bd026df`
- Atlas project: `ApexFan MongoDB 2026`
- Atlas project ID: `6a14fb4a422e337401bad234`
- Cluster: `apexfan-m0`
- Tier/provider/region: `M0` on `GCP` in `CENTRAL_US`
- Database: `apexfan`
- App user: `apexfan_app`

The database user password and connection URI are stored only in ignored local files:

- `.env`
- `.secrets/mongodb-uri.txt`

## Local Connection

Add the Atlas connection string to `.env`:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/apexfan
```

Then verify Atlas connectivity, counts, and `2dsphere` indexes:

```bash
npm run mongodb:verify
```

To also write a CLI verification record into `agent_actions`:

```bash
npm run mongodb:verify:audit
```

Open the shell using the `.env` connection string:

```bash
npm run mongodb:shell
```

## MongoDB Atlas CLI

Authenticate the Atlas CLI:

```bash
npm run atlas:login
```

Check the active Atlas user:

```bash
npm run atlas:whoami
```

The Atlas CLI is useful for creating or inspecting free M0 clusters, database users, and network access lists. Do not commit Atlas API keys or downloaded secrets.

For automation, use Atlas API keys or a service account instead of browser login. Keep these values in your shell or a local secret manager, not in Git:

```bash
export MONGODB_ATLAS_PUBLIC_API_KEY=your_public_key
export MONGODB_ATLAS_PRIVATE_API_KEY=your_private_key
export MONGODB_ATLAS_ORG_ID=your_org_id
export MONGODB_ATLAS_PROJECT_ID=your_project_id
```

The installed Atlas CLI also exposes Atlas Admin API operations:

```bash
atlas api --help
```

## ApexFan API Verification

With the app running locally:

```bash
npm start
npm run mongodb:api
```

For a deployed site:

```bash
APEXFAN_API_URL=https://apexfan-mongodb-2026.web.app npm run mongodb:api
```

The API check calls:

- `GET /api/status`
- `GET /api/live-mongodb`

Those endpoints provide judge-visible evidence that the app is using live MongoDB Atlas data when `MONGODB_URI` is configured.

## Cloud Run Secret

For deployment, create the MongoDB URI secret in the ApexFan Google Cloud project:

```bash
printf 'YOUR_MONGODB_URI' | gcloud secrets create MONGODB_URI --data-file=- --project apexfan-mongodb-2026
```

Current blocker: `apexfan-mongodb-2026` needs billing attached before `secretmanager.googleapis.com` can be enabled. After billing is attached, create the secret from the ignored local URI file:

```bash
gcloud services enable secretmanager.googleapis.com --project apexfan-mongodb-2026
gcloud secrets create MONGODB_URI --data-file=.secrets/mongodb-uri.txt --project apexfan-mongodb-2026
```

After the secret exists, the folder-local deploy command includes it automatically:

```bash
npm run deploy
```
