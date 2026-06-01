# YouTube Upload Runbook

ApexFan's hackathon submission needs a YouTube URL, not only a repository-hosted MP4. Use this runbook to publish the final demo video and then update the README/Judge docs with the YouTube link.

## Published Video

- YouTube demo video: [https://www.youtube.com/watch?v=SnqhCoHUuro](https://www.youtube.com/watch?v=SnqhCoHUuro)
- Status: uploaded and linked in the project README, judge checklist, demo-video README, and judge video guide.
- Local final render: `demo-video/renders/video/apexfan-hackathon-demo-v3-final.mp4`

## Target Channel

- YouTube user ID: `-1NezdkAYM_3qK-5mh_cnA`
- YouTube channel ID: `UC-1NezdkAYM_3qK-5mh_cnA`
- Final ApexFan video file: `demo-video/renders/video/apexfan-hackathon-demo-v3-final.mp4`
- Duration: `2:22`

## Recommended Hackathon Path For Future Videos: Manual Upload

Manual upload through YouTube Studio is the safest immediate path for Devpost because it can publish the video as **Unlisted** without waiting for YouTube Data API project audit.

1. Open [YouTube Studio upload](https://studio.youtube.com/).
2. Click **Create** -> **Upload videos**.
3. Select:

   ```text
   /Users/jiawenzhu/Developer/hackathon/apex-fan-mongodb/demo-video/renders/video/apexfan-hackathon-demo-v3-final.mp4
   ```

4. Use this title:

   ```text
   ApexFan - World Cup 2026 Sports Concierge | Google Cloud Rapid Agent Hackathon
   ```

5. Use this description:

   ```text
   ApexFan is a World Cup 2026 sports concierge built for the Google Cloud Rapid Agent Hackathon MongoDB track.

   The demo shows:
   - Gemini-powered matchday planning
   - MongoDB Atlas venue, commerce, itinerary, group decision, and audit data
   - 2dsphere geospatial indexes for nearby restaurants and retail
   - Read-only retrieval traces that prove what data grounded the agent answer
   - User Status Checks for live API and MongoDB evidence

   Live demo:
   https://apexfan-mongodb-2026.web.app/?demo=true

   Source repository:
   https://github.com/JiawenZhu/apex-fan-mongodb
   ```

6. Audience: choose **No, it's not made for kids**.
7. Checks: wait for YouTube copyright/processing checks to complete.
8. Visibility: choose **Unlisted** for Devpost unless the submission requires public.
9. Copy the YouTube URL.
10. Update:
    - `README.md`
    - `demo-video/README.md`
    - `demo-video/JUDGE_VIDEO_GUIDE.md`
    - `JUDGE_CHECKLIST.md`
    - `SUBMISSION_READINESS.md`
11. Commit and push the README/docs update.

## Why Manual Upload Is Preferred First

The YouTube Data API supports video uploads through `videos.insert`, but official docs note that uploads from unverified API projects created after July 28, 2020 are restricted to private viewing mode until the API project passes audit. That makes API upload risky for a hackathon submission that needs a reviewable YouTube link.

## API Upload Path

Use this only after the Google Cloud OAuth project is ready and YouTube upload visibility constraints are understood.

### Requirements

- YouTube Data API v3 enabled in Google Cloud.
- OAuth 2.0 client credentials for an installed app or web app.
- OAuth scope:

  ```text
  https://www.googleapis.com/auth/youtube.upload
  ```

- Store OAuth files outside Git:

  ```text
  .secrets/youtube-client-secret.json
  .secrets/youtube-oauth-token.json
  ```

### API Notes

- Upload endpoint: `POST https://www.googleapis.com/upload/youtube/v3/videos`
- Use resumable upload for reliability.
- Include `snippet` and `status` parts.
- `videos.insert` has a high quota cost, so do not use repeated test uploads.
- For public or unlisted API uploads from new projects, plan for YouTube API Services verification/audit.

### Metadata Template

```json
{
  "snippet": {
    "title": "ApexFan - World Cup 2026 Sports Concierge | Google Cloud Rapid Agent Hackathon",
    "description": "ApexFan demo for the Google Cloud Rapid Agent Hackathon MongoDB track. Live demo: https://apexfan-mongodb-2026.web.app/?demo=true",
    "categoryId": "28",
    "tags": ["Google Cloud", "MongoDB", "Gemini", "Hackathon", "World Cup 2026", "ApexFan"]
  },
  "status": {
    "privacyStatus": "unlisted",
    "selfDeclaredMadeForKids": false
  }
}
```

## After Upload For Future Videos

Once the URL is available, replace the placeholder in docs with the actual YouTube URL:

```text
YouTube demo video: https://www.youtube.com/watch?v=VIDEO_ID
```

Then commit and push:

```bash
git add README.md demo-video/README.md demo-video/JUDGE_VIDEO_GUIDE.md JUDGE_CHECKLIST.md ../SUBMISSION_READINESS.md
git commit -m "docs: add YouTube demo video link"
git push origin main
```
