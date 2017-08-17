const webpush = require('web-push');

// VAPID keys should only be generated only once.
// Open node.js command prompt, change directory to current folder
// Run: node generateVapid.js
const vapidKeys = webpush.generateVAPIDKeys();
console.log("public key: " + vapidKeys.publicKey);   
console.log("private key: " + vapidKeys.privateKey);

