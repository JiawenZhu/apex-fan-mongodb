# ApexFan Judge Checklist

Track: MongoDB

Live demo: https://apexfan-mongodb-2026.web.app/?demo=true
Source repo: https://github.com/JiawenZhu/apex-fan-mongodb

## Submission gate status

- MIT `LICENSE` file exists and GitHub detects the license metadata.
- Hosted Firebase demo is preloaded and does not require authentication.
- Source repo is currently private by design; switch it public before the June 11, 2026 submission deadline.
- Demo video: [Watch the 3-minute walkthrough on YouTube](https://www.youtube.com/watch?v=SnqhCoHUuro)

## 3-minute verification path

1. Run `npm install && npm start`.
2. Open `http://localhost:3000`.
3. Click `Run Auto-Tour`, or open `https://apexfan-mongodb-2026.web.app/?demo=true`.
4. Open `Judge Status Checks`.
5. Verify live responses from `/api/status` and query samples from `/api/playbook`.

## Judging criteria evidence

### Technological implementation

- `server.js` seeds all 16 World Cup 2026 host venues.
- `server.js` creates `2dsphere` indexes for stadiums and nearby-commerce records.
- `/api/malls?stadiumId=sofi` and the venue selector demonstrate proximity search behavior.
- `/api/add-activity` demonstrates itinerary CRUD with `$push` and `$inc`.
- `/api/status` reports Gemini, MongoDB, group sync, audit trail, and capability count status.
- `/api/live-mongodb` shows real MongoDB Atlas counts and indexes when `MONGODB_URI` is configured, or explicit setup requirements when it is not.

### Design and UX

- The first screen is the usable concierge dashboard, not a marketing page.
- Tool-call chips make database and agent operations visible during chat.
- The proximity panel shows surge level, capacity status, VIP readiness, distance, and rating.
- Auto-tour removes judge friction by running the intended demo flow with one click.

### Potential impact

- Group planning, shared budget tracking, surge-aware dining, and VIP readiness target real World Cup travel pain.
- Local commerce discovery gives nearby businesses a way to absorb matchday demand.
- Action audit trail supports responsible operation when the agent updates group plans.

### Quality of idea

- ApexFan differentiates from FanZone 2026 by focusing on group coordination, shared budget, local commerce, and surge-aware retail.
- The demo is intentionally small but concrete so judges can inspect every claim quickly.

## Competitor gap addressed

FanZone 2026 is strong on live judge evidence and MongoDB capability count. ApexFan now mirrors those judge-friendly surfaces while leading with a distinct group coordination and nearby commerce angle.
