#!/usr/bin/env node

// Telegram Polling Script for Local Development
// This script continuously polls Telegram for new messages and forwards them to your webhook

const POLL_INTERVAL = 2000; // Poll every 2 seconds
const API_URL = 'http://localhost:3000/api/telegram/poll';

console.log('🤖 Starting Telegram polling...');
console.log('📡 Checking for new messages every 2 seconds');
console.log('Press Ctrl+C to stop\n');

let pollCount = 0;

async function poll() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    pollCount++;

    if (data.success && data.processed > 0) {
      console.log(`✅ [${new Date().toLocaleTimeString()}] Processed ${data.processed} message(s)`);
    } else if (pollCount % 10 === 0) {
      // Show "still running" message every 20 seconds
      console.log(`⏳ [${new Date().toLocaleTimeString()}] Polling... (no new messages)`);
    }

  } catch (error) {
    console.error(`❌ [${new Date().toLocaleTimeString()}] Polling error:`, error.message);
  }
}

// Initial poll
poll();

// Set up interval
setInterval(poll, POLL_INTERVAL);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Stopping Telegram polling...');
  process.exit(0);
});
