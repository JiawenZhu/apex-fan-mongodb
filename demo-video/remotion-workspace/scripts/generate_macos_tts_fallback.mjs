#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const timelinePath = path.resolve("scripts/apexfan-demo-timeline.json");
const outDir = path.resolve("public/audio/gemini-31-flash-tts");
await fs.mkdir(outDir, { recursive: true });

const timeline = JSON.parse(await fs.readFile(timelinePath, "utf8"));
const scenes = timeline.video_timeline_sync;
const concatRows = [];

for (const scene of scenes) {
  const base = `scene-${String(scene.scene_index).padStart(2, "0")}`;
  const aiffPath = path.join(outDir, `${base}.aiff`);
  const mp3Path = path.join(outDir, `${base}-${scene.estimated_duration_seconds}s.mp3`);
  run("say", ["-v", "Samantha", "-o", aiffPath, scene.audio_tts_script]);
  const rawDuration = Number(run("ffprobe", [
    "-v",
    "error",
    "-show_entries",
    "format=duration",
    "-of",
    "default=nw=1:nk=1",
    aiffPath,
  ], true).trim());
  const target = Math.max(0.6, Number(scene.estimated_duration_seconds) - 0.18);
  const filters = [];
  if (rawDuration > target) {
    filters.push(...atempoFilters(rawDuration / target));
  }
  filters.push(`apad=pad_dur=${scene.estimated_duration_seconds}`);
  run("ffmpeg", [
    "-y",
    "-i",
    aiffPath,
    "-af",
    filters.join(","),
    "-t",
    String(scene.estimated_duration_seconds),
    "-codec:a",
    "libmp3lame",
    "-q:a",
    "2",
    mp3Path,
  ]);
  concatRows.push(`file '${path.basename(mp3Path).replaceAll("'", "'\\''")}'`);
  console.log(`generated ${mp3Path}`);
}

const concatList = path.join(outDir, "concat-list.txt");
await fs.writeFile(concatList, `${concatRows.join("\n")}\n`);

const combinedMp3 = path.join(outDir, "combined-gemini-31-flash-tts-exact.mp3");
const combinedWav = path.join(outDir, "combined-gemini-31-flash-tts.wav");
run("ffmpeg", ["-y", "-f", "concat", "-safe", "0", "-i", concatList, "-c:a", "pcm_s16le", combinedWav]);
run("ffmpeg", [
  "-y",
  "-i",
  combinedWav,
  "-t",
  String(scenes.reduce((sum, scene) => sum + Number(scene.estimated_duration_seconds), 0)),
  "-codec:a",
  "libmp3lame",
  "-q:a",
  "2",
  combinedMp3,
]);

await fs.writeFile(path.join(outDir, "manifest.json"), JSON.stringify({
  model: "macOS say fallback",
  voiceName: "Samantha",
  reason: "Gemini 3.1 Flash TTS API key was unavailable or expired during generation.",
  combinedMp3Path: combinedMp3,
  combinedWavPath: combinedWav,
  scenes: scenes.map((scene) => ({
    scene_index: scene.scene_index,
    durationSeconds: scene.estimated_duration_seconds,
    text: scene.audio_tts_script,
  })),
}, null, 2));

console.log(`combined ${combinedMp3}`);

function atempoFilters(factor) {
  const filters = [];
  let remaining = factor;
  while (remaining > 2) {
    filters.push("atempo=2");
    remaining /= 2;
  }
  filters.push(`atempo=${remaining.toFixed(6)}`);
  return filters;
}

function run(command, args, capture = false) {
  const result = spawnSync(command, args, {
    encoding: "utf8",
    stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
  });
  if (result.status !== 0) {
    throw new Error(`${command} failed: ${result.stderr || result.status}`);
  }
  return result.stdout || "";
}
