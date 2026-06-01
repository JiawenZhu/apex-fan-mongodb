# ApexFan Hackathon Demo Video

Professional 3-5 minute demo package for the Google Cloud Rapid Agent Hackathon MongoDB track.

## Final Render

- Video: `renders/video/apexfan-hackathon-demo-v3-final.mp4`
- Gemini 3.1 Flash TTS audio: `renders/audio/apexfan-gemini-31-flash-tts-tight-v3.mp3`
- Duration: 2:22
- Format: 1920x1080 H.264 MP4 with AAC audio
- YouTube upload runbook: `../YOUTUBE_UPLOAD.md`
- Style: action-led product demo with cursor movement, click ripples, zoom-in focus regions, and animated evidence overlays.
- Timing: tight-cut pacing with padded voiceover gaps removed and scene starts visible immediately.

The older 3:56 render is preserved at `renders/video/apexfan-hackathon-demo.mp4`, the V2 2:58 render is preserved at `renders/video/apexfan-hackathon-demo-v2.mp4`, and the first V3 tight cut is preserved at `renders/video/apexfan-hackathon-demo-v3-tight.mp4` for comparison.

## Source Package

- Remotion workspace: `remotion-workspace/`
- Composition: `remotion-workspace/src/Composition.tsx`
- Transcript: `remotion-workspace/scripts/apexfan-demo-transcript.md`
- Timeline sync JSON: `remotion-workspace/scripts/apexfan-demo-timeline.json`
- Frontend screenshots: `assets/screenshots/frontend/`
- MongoDB Atlas screenshots: `assets/screenshots/backend/`

## Regenerate Narration

Use the project-specific Secret Manager key. Replace `PROJECT_ID` for other projects.

```bash
cd /Users/jiawenzhu/Developer/hackathon/apex-fan-mongodb/demo-video/remotion-workspace

PROJECT_ID="apexfan-mongodb-2026"
GEMINI_API_KEY="$(CLOUDSDK_AUTH_IMPERSONATE_SERVICE_ACCOUNT= \
  gcloud secrets versions access latest \
  --secret=GEMINI_API_KEY \
  --project="${PROJECT_ID}")" \
node /Users/jiawenzhu/.codex/skills/gemini-31-flash-tts/scripts/generate_gemini31_tts.mjs \
  --timeline scripts/apexfan-demo-timeline.json \
  --out public/audio/gemini-31-flash-tts \
  --voice Orus \
  --slot-safety 0.18 \
  --prompt-prefix "Read this exact hackathon demo narration. Use a clear professional startup demo voice, natural pace, confident technical delivery, American accent, and crisp pronunciation. Keep timing concise, do not add extra words."
```

## Regenerate Video

```bash
cd /Users/jiawenzhu/Developer/hackathon/apex-fan-mongodb/demo-video/remotion-workspace
npm run lint
npx remotion render ApexFanHackathonDemo renders/video/apexfan-hackathon-demo-v3-final.mp4 --concurrency=2
```

## Verify

```bash
ffprobe -v error -show_entries format=duration,size:stream=index,codec_type,codec_name,duration -of json \
  renders/video/apexfan-hackathon-demo-v3-final.mp4
```
