const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();

const uri = process.env.MONGODB_URI;
const shouldWriteAudit = process.argv.includes('--write-audit');

if (!uri) {
  console.error('MONGODB_URI is not configured. Add it to .env or create the MONGODB_URI Cloud Secret before deploying.');
  process.exit(2);
}

async function main() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000
  });

  await client.connect();
  const db = client.db('apexfan');

  await db.command({ ping: 1 });
  await db.collection('stadiums').createIndex({ coordinates: '2dsphere' });
  await db.collection('malls').createIndex({ coordinates: '2dsphere' });

  if (shouldWriteAudit) {
    await db.collection('agent_actions').insertOne({
      actor: 'ApexFan CLI',
      action: 'mongodb_cli_verify',
      detail: 'Verified MongoDB Atlas connectivity, counts, and 2dsphere indexes from local CLI.',
      time: new Date().toISOString(),
      metadata: { source: 'scripts/mongodb-verify.js' }
    });
  }

  const [stadiumCount, mallCount, itineraryCount, actionCount, stadiumIndexes, mallIndexes] = await Promise.all([
    db.collection('stadiums').countDocuments(),
    db.collection('malls').countDocuments(),
    db.collection('itineraries').countDocuments(),
    db.collection('agent_actions').countDocuments(),
    db.collection('stadiums').indexes(),
    db.collection('malls').indexes()
  ]);

  console.log(JSON.stringify({
    status: 'PASS',
    database: db.databaseName,
    counts: {
      stadiums: stadiumCount,
      nearbyCommerceRecords: mallCount,
      itineraryGroups: itineraryCount,
      agentActions: actionCount
    },
    indexes: {
      stadiums: stadiumIndexes.map(index => ({ name: index.name, key: index.key })),
      malls: mallIndexes.map(index => ({ name: index.name, key: index.key }))
    },
    auditWrite: shouldWriteAudit ? 'inserted' : 'skipped'
  }, null, 2));

  await client.close();
}

main().catch(err => {
  console.error(JSON.stringify({
    status: 'ERROR',
    message: err.message
  }, null, 2));
  process.exit(1);
});
