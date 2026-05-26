const { spawn } = require('child_process');
const dotenv = require('dotenv');

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error('MONGODB_URI is not configured. Add it to .env before opening mongosh.');
  process.exit(2);
}

const child = spawn('mongosh', [uri], {
  stdio: 'inherit'
});

child.on('exit', code => process.exit(code || 0));
