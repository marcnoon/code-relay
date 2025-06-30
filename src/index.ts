// File: code-relay/src/index.ts

import * as fs from 'fs';
import * as path from 'path';

const TOKENS_FILE = path.resolve(__dirname, '../.relay-tokens.json');
const HISTORY_DIR = path.resolve(__dirname, '../.relay-history');

interface TokenMap {
  [token: string]: string; // token -> code snippet
}

function loadTokens(): TokenMap {
  if (!fs.existsSync(TOKENS_FILE)) {
    console.error('No token map found.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(TOKENS_FILE, 'utf-8'));
}

function ensureHistoryDir() {
  if (!fs.existsSync(HISTORY_DIR)) {
    fs.mkdirSync(HISTORY_DIR);
  }
}

function saveHistory(token: string, content: string) {
  ensureHistoryDir();
  fs.writeFileSync(path.join(HISTORY_DIR, `${token}.bak.ts`), content);
}

function applyToken(token: string) {
  const tokens = loadTokens();
  if (!tokens[token]) {
    console.error(`Token not found: ${token}`);
    process.exit(1);
  }

  const targetFile = path.resolve(process.cwd(), 'relay-output.ts');

  let previous = '';
  if (fs.existsSync(targetFile)) {
    previous = fs.readFileSync(targetFile, 'utf-8');
    saveHistory(token, previous);
  }

  fs.writeFileSync(targetFile, tokens[token]);
  console.log(`✅ Token '${token}' applied to relay-output.ts`);
}

function undoToken(token: string) {
  const historyFile = path.join(HISTORY_DIR, `${token}.bak.ts`);
  if (!fs.existsSync(historyFile)) {
    console.error(`No history found for token: ${token}`);
    process.exit(1);
  }
  const content = fs.readFileSync(historyFile, 'utf-8');
  fs.writeFileSync(path.resolve(process.cwd(), 'relay-output.ts'), content);
  console.log(`↩️ Undo applied for token '${token}'`);
}

function listHistory() {
  if (!fs.existsSync(HISTORY_DIR)) {
    console.log('No history found.');
    return;
  }
  const files = fs.readdirSync(HISTORY_DIR);
  files.forEach((f) => console.log(`🕘 ${f.replace('.bak.ts', '')}`));
}

const [, , command, token] = process.argv;

switch (command) {
  case 'apply':
    if (!token) throw new Error('Missing token to apply');
    applyToken(token);
    break;
  case 'undo':
    if (!token) throw new Error('Missing token to undo');
    undoToken(token);
    break;
  case 'history':
    listHistory();
    break;
  default:
    console.log(`Usage:
  apply <token>   Apply code by token
  undo <token>    Undo applied token
  history         Show applied token history`);
}
