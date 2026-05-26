# 🟢 ApexFan: World Cup 2026 Smart Concierge & Fan Coordinator

> **Vibrant, Geolocated Sports Concierge & Local Commerce Guide powered by Gemini, Google Cloud Agent Builder, and the MongoDB MCP Server.**

---

## 📖 Project Overview
**ApexFan** is a premium, state-of-the-art autonomous agent designed to solve the massive logistics, travel coordination, and local business surge challenges expected during the **2026 FIFA World Cup**. 

By acting as a conversational concierge, ApexFan helps international and domestic fans navigate cities, coordinate schedules and shared budgets with friends, and discover local brick-and-mortar retail malls, restaurants, and fan zones close to match venues.

### 🌟 Premium Features
* 🗺️ **Geospatial Proximity Matcher**: Instantly map and filter retail malls, local businesses, and restaurants close to World Cup stadiums using fast geospatial indexes.
* 👥 **Friend & Group Sync**: Plan shared itineraries, coordinate calendar slots, and manage collective dining or booking budgets.
* 📅 **Dynamic Itinerary Agent**: Conversational, multi-step agent planning that adapts to game times, traffic surges, and user preferences.
* 🧾 **Agent Action Audit Trail**: Logs concierge actions so judges can inspect the operational record behind group itinerary updates.
* 📈 **Matchday Surge Signals**: Surfaces capacity and VIP-readiness for nearby restaurants, malls, and fan zones across all 16 host venues.
* 💎 **State-of-the-Art Aesthetic**: A dark-mode glassmorphic interface styled with premium deep-greens and emerald-gold sports gradients, featuring micro-animations that breathe life into the match timelines.

### MongoDB Capability Count

Judges can verify five MongoDB-backed capabilities in the running demo:

1. `2dsphere` geospatial retail proximity lookup
2. Aggregation pipeline for group budget utilization
3. CRUD itinerary updates with `$push` and `$inc`
4. Agent action audit trail in `agent_actions`
5. Change Stream-ready group sync simulation for live itinerary activity

The UI exposes these through live tool-call chips, `/api/status`, and `/api/playbook`.

### Live MongoDB Evidence

Judges can call `/api/live-mongodb` during evaluation. With `MONGODB_URI` configured, the endpoint reads live Atlas collection counts and index metadata through the MongoDB driver. Without credentials, it reports the exact environment setup needed and falls back to the local demo dataset.

---

## 📐 Architecture Details

```
   ┌────────────────────────────────────────────────────────┐
   │                  Interactive Frontend                  │
   │      (Vibrant Dark Glassmorphic Dashboard, Maps)       │
   └───────────────────────────┬────────────────────────────┘
                               │ JSON API
                               ▼
   ┌────────────────────────────────────────────────────────┐
   │               Google Cloud Agent Runtime               │
   │               (Agent Builder / ADK SDK)                │
   └─────────────┬────────────────────────────┬─────────────┘
                 │                            │
                 ▼                            ▼
   ┌───────────────────────────┐┌───────────────────────────┐
   │      Gemini Engine        ││    MongoDB MCP Server     │
   │  (Advanced Reasoning,     ││  (Geospatial 2dsphere,   │
   │   Conversational brain)   ││   Profiles, Bookings DB)  │
   └───────────────────────────┘└───────────────────────────┘
```

* **Frontend**: Vanilla HTML/JS with customized HSL green color variables and interactive glassmorphic CSS layers.
* **Brain**: Gemini models deployed via Google Cloud Agent Builder.
* **Geospatial & Storage Core**: MongoDB Atlas with geospatial `2dsphere` indexes to query location telemetry (Stadiums, restaurants, transit hubs, and retail malls).

---

## 🛠️ Step-by-Step Scaffolding Setup

### Prerequisites
1. **Node.js** (v18 or higher)
2. **MongoDB Atlas Account** (Free tier M0 is fully sufficient)
3. **Google Cloud Project** with Vertex AI / Agent Builder APIs enabled

### 1. Database Configuration
Enable geospatial coordinates on MongoDB by running the following indexing command on your `locations` collection:
```javascript
db.locations.createIndex({ "coordinates": "2dsphere" })
```

### 2. Scaffold Installation
To set up and run the local development server:
```bash
npm install
npm run dev
```

### 3. Environment Variables
Create a `.env` file in the project root:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
GEMINI_API_KEY=your_google_cloud_gemini_api_key
PORT=3000
```

You can start from `.env.example`.

---

## ⚖️ Open Source & Compliance
ApexFan is fully open-source and distributed under the **MIT License**. The project is strictly compliant with the official hackathon guidelines, utilizing Google Cloud Agent Builder and MongoDB MCP, while remaining completely free of competitor AI dependencies.

## Judge Materials

- `JUDGE_CHECKLIST.md` maps judging criteria to concrete demo evidence.
- `DEMO_SCRIPT.md` provides a 3-minute walkthrough flow.
- `LICENSE` contains the MIT license text for repository scanning.
- `MONGODB_SETUP.md` documents MongoDB CLI, Atlas CLI, and API verification commands.

## Firebase Hosting Target

- Firebase project: `apexfan-mongodb-2026`
- Hosting URL: `https://apexfan-mongodb-2026.web.app`
- Judge auto-demo URL: `https://apexfan-mongodb-2026.web.app/?demo=true`
- Cloud Run API service: `apex-fan-mongodb`
- Deployment guide: `FIREBASE_DEPLOYMENT.md`
