const baseUrl = (process.env.APEXFAN_API_URL || 'http://localhost:3000').replace(/\/$/, '');

async function readJson(path) {
  const response = await fetch(`${baseUrl}${path}`);
  if (!response.ok) {
    throw new Error(`${path} returned HTTP ${response.status}`);
  }
  return response.json();
}

async function main() {
  const [status, liveMongo] = await Promise.all([
    readJson('/api/status'),
    readJson('/api/live-mongodb')
  ]);

  console.log(JSON.stringify({
    status: 'PASS',
    apiBaseUrl: baseUrl,
    database: status.database,
    liveApiEvidence: status.liveApiEvidence,
    liveMongo
  }, null, 2));
}

main().catch(err => {
  console.error(JSON.stringify({
    status: 'ERROR',
    apiBaseUrl: baseUrl,
    message: err.message,
    hint: 'Start the app with npm start, or set APEXFAN_API_URL to the deployed Firebase Hosting URL.'
  }, null, 2));
  process.exit(1);
});
