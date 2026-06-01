# ApexFan Demo Video Judge Guide

Video: `renders/video/apexfan-hackathon-demo-v3-final.mp4`
Duration: 2:22
YouTube upload runbook: `../YOUTUBE_UPLOAD.md`
Track: Google Cloud Rapid Agent Hackathon - MongoDB

This file is written from a judge's perspective: what should be easy to verify, what technical depth is shown, and why the demo is more than a polished mockup.

## Executive Summary

ApexFan is a World Cup 2026 group concierge that uses MongoDB Atlas as the operational memory and evidence layer for venue planning, nearby commerce, fan preferences, group decisions, retrieval traces, and audit records.

The V3 tight cut uses an action-led product-demo style: a visible cursor moves through the product, click ripples mark user actions, and zoom-in focus regions make the important UI areas readable while narration explains the technical terms. Compared with V2, the padded voiceover gaps were removed and scene starts are visible immediately.

The video should convince a judge of five things:

1. **Simplicity** - A user can understand the product in the first 30 seconds: ask a venue-aware question, get a useful matchday plan, and inspect the evidence.
2. **Technical depth** - MongoDB is not incidental storage. The demo shows collections, documents, geospatial indexes, retrieval traces, status checks, and API-backed evidence.
3. **Real demonstration** - The video uses live frontend screenshots and MongoDB Atlas screenshots, not only slideware or simulated UI.
4. **Representational quality** - The story is concrete: fans coordinate across venues, nearby restaurants, malls, budgets, preferences, and group decisions.
5. **Adoptability** - The pattern can transfer to other high-traffic events: concerts, Olympics, conferences, retail pop-ups, and city-scale tourism.

## Judge Viewing Rubric

| Criterion | What a judge is looking for | Where the video proves it |
| --- | --- | --- |
| Clarity | The problem, user, and workflow are understandable without extra setup. | 0:00-0:39 introduces the group-planning problem and shows the user asking the app. |
| Real data | The app uses a real backend and judge-verifiable data surfaces. | 0:39-1:30 shows retrieval evidence, user status checks, and MongoDB Atlas collections. |
| MongoDB fit | MongoDB is used for more than a generic database. | Retrieval trace, fan memory, group decisions, audit records, and `2dsphere` indexes are shown across 0:39-2:02. |
| Agent evidence | AI recommendations are inspectable and grounded in data. | 0:39-0:56 shows the read-only retrieval evidence panel. |
| Technical credibility | The architecture has callable endpoints, visible backend proof, and operational checks. | 0:56-1:30 and 2:02-2:22 show user status checks, Atlas evidence, and endpoint verification. |
| User value | The product solves a real planning problem for groups attending World Cup events. | 0:00-0:39 and 1:46-2:02 show group context, preferences, votes, and budget-aware planning. |
| Presentation quality | The video is paced, narrated, and polished enough for rapid judging. | Full 2:22 video uses scene-synced narration, cursor actions, zoom focus, screenshots, motion, and concise labels. |
| Adoptability | The solution can generalize beyond the hackathon scenario. | 2:02-2:22 frames ApexFan as a reusable pattern for event-scale agents. |

## Scene-by-Scene Judge Notes

### 0:00-0:21 - World Cup Group Planning Hook

The opening slows down the story: six friends leave SoFi Stadium, need food, disagree on budget, and need a useful next step. Animated route lines, venue markers, and group-planning bubbles make the problem concrete before the technical proof starts.

Judge takeaway: ApexFan has a specific user, a specific event context, and a practical coordination problem.

### 0:21-0:39 - Ask the App Like a Fan

The user takes visible action: the cursor clicks into the product, types a venue-aware question, sends it, and the video zooms into the relevant UI area.

Judge takeaway: The demo is usable by a non-technical evaluator and does not require reading source code first.

### 0:39-0:56 - Retrieval Evidence

The video highlights read-only retrieval evidence: MongoDB collection names, operations, document counts, and evidence used by the agent. The cursor and zoom treatment call attention to the evidence trail instead of leaving it as tiny static UI.

Judge takeaway: The AI answer is not a black box. It has explainable data grounding, which is important for trust and repeatable evaluation.

### 0:56-1:12 - User Status Checks

The status panel verifies the database connection, geospatial indexes, Gemini mode, group sync, audit trail, live MongoDB evidence, retrieval traces, fan memory, and venue trust checks.

Judge takeaway: Capability claims are represented as testable system checks.

### 1:12-1:30 - MongoDB Atlas Backend Proof

The backend view shows Atlas directly and overlays the product data model: stadiums, nearby commerce, itineraries, fan profiles, group decisions, and agent actions.

Judge takeaway: ApexFan is not just frontend polish; it has a real data platform behind the demo.

### 1:30-1:46 - Geospatial Intelligence

MongoDB `2dsphere` indexes connect stadiums to restaurants and retail by location. The video uses an animated node-and-line overlay to explain why recommendations can account for distance, surge, capacity, rating, and proximity.

Judge takeaway: MongoDB provides a core product capability: geospatial venue intelligence.

### 1:46-2:02 - Group Memory and Votes

The fan profiles and group decisions collections demonstrate safe memory: demo-safe preferences, accessibility needs, budget style, voting state, and preferred venues. Animated decision chips show how the group plan stays current.

Judge takeaway: The system supports continuity across sessions and group collaboration without requiring private personal data.

### 2:02-2:22 - Judge-Ready Verification Close

The closing shows endpoint cards for `/demo=true`, `/api/status`, `/api/live-mongodb`, and `/api/retrieval-trace`, making the verification path explicit.

Judge takeaway: The project is polished, practical, and ready for judge verification.

## What Makes This Strong for Judges

- **Fast comprehension** - The product value is clear before the first minute.
- **Visible backend proof** - MongoDB Atlas screenshots make the data layer concrete.
- **Inspectability** - Retrieval traces and status checks reduce judge trust friction.
- **MongoDB-native capabilities** - The demo shows document modeling, geospatial indexes, collection-backed memory, audit trails, and live data checks.
- **Practical scenario** - World Cup group logistics are easy to understand and high-scale enough to justify an agentic system.
- **Clean evaluation path** - Judges can watch the video, open the hosted demo, run `/?demo=true`, and inspect API evidence.

## Risks a Judge Might Notice

| Risk | Mitigation in the video or project |
| --- | --- |
| "Is this just a frontend mockup?" | The video includes MongoDB Atlas screenshots and collection/index evidence. |
| "Is Gemini hallucinating recommendations?" | The retrieval panel shows data sources, operations, and evidence used. |
| "Is MongoDB central enough?" | Geospatial indexes, flexible documents, fan memory, group decisions, audit records, and status endpoints are all MongoDB-backed. |
| "Can I verify it quickly?" | The repo includes `JUDGE_CHECKLIST.md`, `DEMO_SCRIPT.md`, `/?demo=true`, and status endpoints. |
| "Is the scope too broad?" | The video focuses on one concrete workflow: venue-aware group planning around World Cup matchdays. |

## Best Judge Path After Watching

1. Open `https://apexfan-mongodb-2026.web.app/?demo=true`.
2. Run the guided demo or ask a venue-aware planning question.
3. Open `User Status Checks`.
4. Inspect retrieval evidence in the UI.
5. Verify the same claims through:
   - `/api/status`
   - `/api/live-mongodb`
   - `/api/retrieval-trace?query=show%20nearby%20food%20and%20budget`
   - `/api/playbook`
   - `/api/trust-check?venue=Cowboys%20Stadium`

## Suggested Judge Scorecard

| Dimension | Suggested score | Rationale |
| --- | ---: | --- |
| Simplicity | 9/10 | Clear user story, direct workflow, no login required for demo. |
| Technical depth | 9/10 | Shows Atlas, collections, geospatial indexes, retrieval traces, APIs, and Gemini integration. |
| Representation | 8/10 | Strong World Cup scenario with bilingual and group-planning framing. |
| Detail | 9/10 | Includes screenshots, transcript, timeline, backend evidence, and endpoint verification. |
| Adoptability | 8/10 | Pattern can generalize to large events, travel, venue operations, and local commerce. |
| Real demo evidence | 9/10 | Hosted app, MongoDB evidence, status endpoints, and Atlas screenshots are all judge-visible. |

Overall judge impression: ApexFan should read as a practical, inspectable, MongoDB-centered agent demo with enough polish for a sub-3-minute video and enough technical proof for serious review.
