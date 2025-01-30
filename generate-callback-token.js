const crypto = require('crypto');

// Generate a random 32-byte hex string to use as the callback token
const callbackToken = crypto.randomBytes(32).toString('hex');

console.log('Your Xendit Callback Token:', callbackToken);
console.log('\nAdd this token to your .env file as XENDIT_CALLBACK_TOKEN');
console.log('And use the same token in your Xendit Dashboard Webhook settings');