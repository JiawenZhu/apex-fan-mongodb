# Hackathon Guidelines: MongoDB Track Target

This document contains a specialized summary of hackathon rules tailored to the **apex-fan-mongodb** sports concierge & retail discovery agent, targeting the **$10,000 MongoDB track**.

---

## 🎯 Target Track Parameters
* **Primary Track**: MongoDB Track ($10K bucket: 1st: $5K, 2nd: $3K, 3rd: $2K).
* **Core Criteria**: High quality interaction with the **MongoDB MCP server**, showcasing geospatial querying, document flexible schema logic, and robust database operations combined with Gemini 3 / Google Agent Builder.

---

## 🛠️ Essential Compliance Checklist for `apex-fan-mongodb`

### 1. Technology Requirements
* **Orchestrator**: Must run within the Google Cloud Agent Builder ecosystem (Visual Studio Console or programmatic ADK / Agent Runtime / Cloud Run).
* **Database**: MongoDB must serve as the primary database solution. Use of directly competing database APIs (e.g., Firebase Firestore, Amazon DynamoDB, etc.) is strictly forbidden for platform storage functions.
* **Coding Assistants**: ONLY **Google AntiGravity** is permitted. No competitor coding extensions (Claude, Cursor, GitHub Copilot) are allowed in the repository or runtime pipeline.

### 2. Geospatial Scope (MongoDB Specialization)
* The agent must leverage MongoDB's geospatial indices (`2dsphere`) to perform:
  * Geospatial proximity searches for brick-and-mortar retail malls relative to World Cup stadiums (e.g., finding malls within 5 miles of MetLife Stadium).
  * Restaurant and logistics recommendation hubs based on real-time fan locations.
  * Travel route coordination scheduling.

### 3. Open Source Repository Deliverables
* Must include a detecting **OSI-approved open-source license** file (e.g., MIT, Apache 2.0) at the top of the repository page (in the "About" section).
* Repo must remain public and contain fully documented setup instructions.

---

## 📝 Submission Deliverables Checklist
- [ ] **Hosted Demo URL**: Accessible without credentials, showcasing pre-loaded sample data (stadium geospatial plots, retail malls, itineraries) for end-to-end fan trip planning.
- [ ] **Demo Video**: Max 3 minutes in length, narrated in English (or with English subtitles), showcasing the responsive front-end dashboard maps and conversational itinerary planner.
- [ ] **Source Code Repo URL**: Public link with standard OSI-approved license.
- [ ] **Architecture Text Summary**: Highlight how the MongoDB MCP server powers geospatial searches and user state profiles under Google Cloud Agent Builder.

---

## 💡 Developer Guidelines from FAQ
* **Scale vs. Reasoning**: Scale of data is not evaluated. We will focus on designing a **small, hyper-realistic geospatial mock dataset** (e.g. stadium locations, local retail malls, e-commerce menus) to showcase Gemini's multi-step geographical reasoning.
* **Local ADK Alternative**: If GCP billing card verification becomes an issue, we can run this code-first with the Agent Development Kit (ADK) in a local Python environment using Gemini APIs (via Google AI Studio) and deploy to Streamlit Cloud or Render. This is fully accepted.
