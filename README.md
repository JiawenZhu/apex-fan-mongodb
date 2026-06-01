# ApexFan

### World Cup 2026 sports concierge powered by Gemini, Google Cloud, and MongoDB Atlas

ApexFan helps matchday groups answer a practical question: **where should we go, what should we do, and how do we prove the recommendation came from real data?**

It combines a fan-facing concierge UI with MongoDB-backed venue, commerce, itinerary, group decision, retrieval-trace, and audit-log data. The demo is built for the Google Cloud Rapid Agent Hackathon MongoDB track and is optimized for fast judge verification.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ApexFan-00c48c)](https://apexfan-mongodb-2026.web.app/)
[![Demo Mode](https://img.shields.io/badge/Demo%20Mode-%2F%3Fdemo%3Dtrue-16a34a)](https://apexfan-mongodb-2026.web.app/?demo=true)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%2B%202dsphere-13aa52)](MONGODB_SETUP.md)
[![Google Cloud](https://img.shields.io/badge/Google%20Cloud-Gemini%20%2B%20Cloud%20Run-4285f4)](FIREBASE_DEPLOYMENT.md)

![ApexFan dashboard](demo-video/assets/screenshots/frontend/01-home-dashboard.png)

---

## Live Demo

- Live app: [https://apexfan-mongodb-2026.web.app/](https://apexfan-mongodb-2026.web.app/)
- One-click demo: [https://apexfan-mongodb-2026.web.app/?demo=true](https://apexfan-mongodb-2026.web.app/?demo=true)
- Demo video: [Watch on YouTube](https://www.youtube.com/watch?v=SnqhCoHUuro)
- YouTube upload workflow: [YOUTUBE_UPLOAD.md](YOUTUBE_UPLOAD.md)
- Judge checklist: [JUDGE_CHECKLIST.md](JUDGE_CHECKLIST.md)
- Demo script: [DEMO_SCRIPT.md](DEMO_SCRIPT.md)
- MongoDB setup and verification: [MONGODB_SETUP.md](MONGODB_SETUP.md)
- Firebase and Cloud Run deployment: [FIREBASE_DEPLOYMENT.md](FIREBASE_DEPLOYMENT.md)

The deployed demo requires no user authentication. Open the demo URL, click **Run Auto-Tour**, and inspect **User Status Checks** for live API and MongoDB evidence.

---

## What Is This?

ApexFan is a sports travel coordination agent for the 2026 FIFA World Cup. It focuses on the real friction around large events:

- Fans need nearby food, retail, transit, and venue-aware options.
- Groups need a shared itinerary, budget, and voting memory.
- Local businesses need matchday demand to be routed intelligently.
- Judges and users need proof that AI answers are grounded in inspectable data.

The app uses MongoDB Atlas data as the operational source of truth and Gemini as the conversational layer. Every important user-facing claim is backed by retrievable evidence such as collection names, read-only operations, counts, indexes, or audit-log entries.

---

## The 3-Step Demo Journey

| Step | User action | What ApexFan proves |
| --- | --- | --- |
| 1. Ask | Ask for nearby food, budget, stadium, or group planning help. | Gemini responds with MongoDB-grounded context and visible tool-call chips. |
| 2. Inspect | Open retrieval evidence, playbook, trust check, or User Status Checks. | The app reveals collections, operations, live counts, indexes, and fallback state. |
| 3. Act | Vote in the group decision room or add itinerary activity. | MongoDB-style group memory, CRUD updates, budget changes, and audit logs update the plan. |

---

## Screenshot Tour

The README intentionally keeps screenshots limited: one frontend view, one overall video contact sheet, and three MongoDB Atlas backend evidence captures. Additional captures are preserved in the demo-video folder for video production and QA.

### Frontend

The dashboard screenshot at the top of this README shows the primary user experience: chat, itinerary, evidence, status checks, and group planning in one product surface.

### Overall Demo Proof

![Judge review contact sheet](demo-video/review-frames/judge-review-contact-sheet.png)

### MongoDB Atlas Backend Evidence

![ApexFan database expanded](demo-video/assets/screenshots/backend/03-apexfan-database-expanded.png)

![Fan profile documents](demo-video/assets/screenshots/backend/05-fan-profiles-documents.png)

![2dsphere index evidence](demo-video/assets/screenshots/backend/08-malls-2dsphere-indexes.png)

---

## Feature Showcase

### Venue-Aware Concierge

ApexFan includes all 16 FIFA World Cup 2026 host venues across the United States, Canada, and Mexico. Users can ask about host cities, official venues, nearby restaurants, malls, and fan logistics.

### MongoDB Geospatial Commerce Matching

The app models stadiums and nearby commerce with GeoJSON point coordinates and `2dsphere` indexes. This supports proximity-ranked restaurant and retail recommendations around venues such as SoFi Stadium, MetLife Stadium, and Estadio Azteca.

### Group Itinerary and Budget Memory

The group itinerary uses MongoDB-style update patterns, including `$push` for new activities and `$inc` for budget changes. The UI turns those changes into a visible group plan instead of a static recommendation.

### Decision Room Voting

The group decision room stores proposals, options, votes, decision logs, and proposal status. It demonstrates how an agent can support group coordination without pretending that one user speaks for everyone.

### Read-Only Retrieval Trace

Every important chat answer can expose the collections, operations, documents read, and evidence used to ground the response. This is built to reduce hallucination risk and make the agent auditable.

### User Status Checks

The status panel calls live endpoints such as `/api/status`, `/api/live-mongodb`, `/api/retrieval-trace`, and `/api/trust-check` so a user or judge can verify the system without reading source code.

### Agent Action Audit Trail

Agent actions are recorded in `agent_actions` when MongoDB is connected, with in-memory fallback for local demos. This gives users a lightweight operational history of what the concierge did.

---

## MongoDB Capability Count

Judges can verify nine MongoDB-backed capabilities in the running demo:

1. `2dsphere` geospatial retail proximity lookup
2. Aggregation pipeline for group budget utilization
3. CRUD itinerary updates with `$push` and `$inc`
4. Agent action audit trail in `agent_actions`
5. Change Stream-ready group sync simulation for live itinerary activity
6. Group decision voting memory in `group_decisions`
7. Read-only retrieval trace evidence for every chat answer
8. Demo-safe fan preference memory in `fan_profiles`
9. Official venue trust check against World Cup host venue records

The UI exposes these through tool-call chips, the retrieval evidence panel, User Status Checks, `/api/status`, `/api/playbook`, `/api/retrieval-trace`, `/api/live-mongodb`, and `/api/trust-check`.

---

## Architecture

```text
┌──────────────────────────────────────────────────────────────────┐
│ Firebase Hosting                                                 │
│ Public ApexFan web app                                           │
│ Demo mode, concierge UI, evidence panels, group decision room     │
└───────────────────────────────┬──────────────────────────────────┘
                                │ HTTPS / JSON
                                ▼
┌──────────────────────────────────────────────────────────────────┐
│ Express API on Google Cloud Run                                  │
│ /api/chat, /api/status, /api/live-mongodb, /api/retrieval-trace   │
│ deterministic fallback when Gemini or MongoDB credentials absent  │
└───────────────┬─────────────────────────────────┬────────────────┘
                │                                 │
                ▼                                 ▼
┌──────────────────────────────┐   ┌───────────────────────────────┐
│ Gemini / Vertex AI            │   │ MongoDB Atlas                  │
│ conversational planning        │   │ stadiums, malls, itineraries   │
│ grounded answer synthesis      │   │ fan_profiles, group_decisions  │
└──────────────────────────────┘   └───────────────────────────────┘
```

The app can run with live MongoDB Atlas and Gemini credentials, or in deterministic fallback mode for local review. Fallback mode still keeps the demo usable and explains which credentials are required for live evidence.

---

## Grounded Agent Flow

```text
User asks a matchday question
        |
        v
Intent is mapped to stadium, commerce, budget, decision, or trust-check context
        |
        v
MongoDB snapshot and retrieval trace are assembled
        |
        v
Gemini receives grounded context and returns a concise answer
        |
        v
UI shows answer, tool chips, trace evidence, and audit-log state
```

The important design choice: Gemini is not the database. MongoDB holds the venue, commerce, group, memory, and evidence records; Gemini explains them in natural language.

---

## API Reference

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `/api/venues` | `GET` | Returns all 16 World Cup 2026 host venues. |
| `/api/malls?stadiumId=sofi` | `GET` | Returns nearby commerce records for a venue. |
| `/api/playbook` | `GET` | Returns MongoDB operation examples used in the demo. |
| `/api/status` | `GET` | Returns User Status Checks for database, Gemini, geospatial, audit, and capability evidence. |
| `/api/live-mongodb` | `GET` | Returns live Atlas counts and indexes when `MONGODB_URI` is configured. |
| `/api/retrieval-trace?query=show%20nearby%20food%20and%20budget` | `GET` | Returns read-only grounding operations behind a user answer. |
| `/api/trust-check?venue=Cowboys%20Stadium` | `GET` | Corrects venue aliases against official World Cup host records. |
| `/api/group-decisions` | `GET` | Returns group voting state and decision logs. |
| `/api/group-decisions/:proposalId/vote` | `POST` | Records a member vote for a proposal option. |
| `/api/chat` | `POST` | Sends a user question to Gemini or deterministic fallback with trace evidence. |
| `/api/add-activity` | `POST` | Adds an itinerary activity and updates the group budget. |
| `/api/itinerary` | `GET` | Returns the active demo itinerary. |
| `/api/audit-log` | `GET` | Returns recent agent actions from MongoDB or fallback memory. |

---

## Database Shape

| Collection | Purpose | Judge-visible evidence |
| --- | --- | --- |
| `stadiums` | Official World Cup 2026 host venue records | 16 venue count, coordinates, capacity, country |
| `malls` | Nearby restaurant and retail records | `2dsphere` index, proximity recommendations, surge metadata |
| `itineraries` | Group plans and budget state | `$push`, `$inc`, aggregation budget summary |
| `group_decisions` | Proposal options, votes, and decision logs | decision room and vote updates |
| `fan_profiles` | Demo-safe preference memory | synthetic profile, no private user data required |
| `agent_actions` | Agent activity audit trail | action log and latest operational history |

---

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account for live database evidence
- Google Cloud project with Vertex AI or a Gemini API key for live AI responses
- Firebase CLI and Google Cloud CLI for deployment

### Install and Run

```bash
git clone https://github.com/JiawenZhu/apex-fan-mongodb.git
cd apex-fan-mongodb
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Configure Environment

Create `.env` in the project root:

```env
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/apexfan
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
PORT=3000
```

Vertex AI mode is also supported:

```env
USE_VERTEX_AI=true
GOOGLE_CLOUD_PROJECT=apexfan-mongodb-2026
GOOGLE_CLOUD_LOCATION=us-west1
GEMINI_MODEL=gemini-2.5-flash
MONGODB_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/apexfan
```

You can start from [.env.example](.env.example).

---

## Reproducibility and Testing

### MongoDB Verification

```bash
npm run mongodb:verify
```

This checks Atlas connectivity, collection counts, and `2dsphere` indexes.

To write verification into the audit trail:

```bash
npm run mongodb:verify:audit
```

### API Verification

With the app running locally:

```bash
npm start
npm run mongodb:api
```

For the deployed site:

```bash
APEXFAN_API_URL=https://apexfan-mongodb-2026.web.app npm run mongodb:api
```

### Manual Judge Path

1. Open [https://apexfan-mongodb-2026.web.app/?demo=true](https://apexfan-mongodb-2026.web.app/?demo=true).
2. Click **Run Auto-Tour**.
3. Ask: `Show nearby food and budget for my group`.
4. Open retrieval evidence and confirm the MongoDB collections and read-only operations.
5. Open **User Status Checks**.
6. Vote in the group decision room and inspect the audit log.
7. Call `/api/live-mongodb` to verify Atlas counts and indexes.

---

## Demo Video Package

The professional demo video package lives in [demo-video/](demo-video/).

- YouTube demo video: [Watch on YouTube](https://www.youtube.com/watch?v=SnqhCoHUuro)
- Local final render: [demo-video/renders/video/apexfan-hackathon-demo-v3-final.mp4](demo-video/renders/video/apexfan-hackathon-demo-v3-final.mp4)
- YouTube upload runbook: [YOUTUBE_UPLOAD.md](YOUTUBE_UPLOAD.md)
- Duration: 2:22
- Format: 1920x1080 H.264 MP4 with AAC audio
- TTS: Gemini 3.1 Flash TTS
- Video guide: [demo-video/JUDGE_VIDEO_GUIDE.md](demo-video/JUDGE_VIDEO_GUIDE.md)
- Transcript: [demo-video/remotion-workspace/scripts/apexfan-demo-transcript.md](demo-video/remotion-workspace/scripts/apexfan-demo-transcript.md)
- Timeline sync: [demo-video/remotion-workspace/scripts/apexfan-demo-timeline.json](demo-video/remotion-workspace/scripts/apexfan-demo-timeline.json)

The video uses action-led motion, cursor focus, zoom regions, backend screenshots, MongoDB Atlas evidence, and encoded-frame QA checks.

---

## Design Decisions

| Decision | Rationale |
| --- | --- |
| Public no-auth demo | Judges can verify the app without account setup or hidden state. |
| Demo mode at `/?demo=true` | Starts the intended walkthrough quickly and lowers evaluation friction. |
| MongoDB as source of truth | Venue, commerce, group, memory, and audit records stay inspectable outside the LLM. |
| Retrieval trace in the UI | Users can see what data grounded a response without opening logs. |
| Synthetic fan profile | Shows personalization while avoiding private user data collection. |
| Deterministic fallback | The demo remains reviewable if credentials are missing or a service is cold. |
| Status endpoints | Judges can verify live behavior with direct API calls. |

---

## Responsible AI and Data Use

- The demo uses synthetic fan preference memory.
- No private user secrets or personal user data are required for judging.
- Retrieval traces are read-only and disclose the data used to ground answers.
- Venue trust checks compare ambiguous venue names against official host records.
- Gemini is instructed to answer from supplied operational context rather than inventing unsupported facts.

---

## Deployment

Firebase and Cloud Run deployment commands are defined in [package.json](package.json).

```bash
npm run deploy:api:with-vertex
npm run deploy:hosting
```

Combined deployment:

```bash
npm run deploy
```

Production targets:

- Firebase project: `apexfan-mongodb-2026`
- Hosting URL: [https://apexfan-mongodb-2026.web.app](https://apexfan-mongodb-2026.web.app)
- Demo URL: [https://apexfan-mongodb-2026.web.app/?demo=true](https://apexfan-mongodb-2026.web.app/?demo=true)
- Cloud Run API service: `apex-fan-mongodb`
- Region: `us-central1`

See [FIREBASE_DEPLOYMENT.md](FIREBASE_DEPLOYMENT.md) for the full deployment workflow.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Vanilla HTML, CSS, JavaScript |
| API | Node.js, Express |
| AI | Gemini via `@google/genai`, Vertex AI mode supported |
| Database | MongoDB Atlas, MongoDB Node.js driver |
| Geospatial | GeoJSON points, `2dsphere` indexes |
| Hosting | Firebase Hosting |
| Server runtime | Google Cloud Run |
| Demo video | Remotion, Gemini 3.1 Flash TTS, ffmpeg |
| Verification | MongoDB scripts, status endpoints, API checks |

---

## Project Files

| File | Purpose |
| --- | --- |
| [server.js](server.js) | Express API, Gemini integration, MongoDB operations, fallback data |
| [public/app.js](public/app.js) | Frontend behavior, chat, status checks, demo flow |
| [public/index.html](public/index.html) | App shell |
| [public/style.css](public/style.css) | Visual system |
| [scripts/mongodb-verify.js](scripts/mongodb-verify.js) | MongoDB Atlas verification |
| [scripts/mongodb-api-check.js](scripts/mongodb-api-check.js) | API verification |
| [MONGODB_SETUP.md](MONGODB_SETUP.md) | Atlas setup and CLI guidance |
| [JUDGE_CHECKLIST.md](JUDGE_CHECKLIST.md) | Judge-facing evidence checklist |
| [DEMO_SCRIPT.md](DEMO_SCRIPT.md) | Walkthrough script |
| [demo-video/README.md](demo-video/README.md) | Demo video production notes |

---

## License

MIT License. See [LICENSE](LICENSE).

---

Built for the Google Cloud Rapid Agent Hackathon MongoDB track.
