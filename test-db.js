const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Read .env.local manually since we are running a standalone script
const envPath = path.resolve(process.cwd(), '.env.local');
let uri = '';

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/MONGODB_URI=(.*)/);
    if (match && match[1]) {
        uri = match[1].trim();
        // Remove quotes if present
        if ((uri.startsWith('"') && uri.endsWith('"')) || (uri.startsWith("'") && uri.endsWith("'"))) {
            uri = uri.slice(1, -1);
        }
    }
}

if (!uri) {
    console.error("❌ Could not find MONGODB_URI in .env.local");
    process.exit(1);
}

console.log("Found Connection String:", uri.replace(/:([^@]+)@/, ':****@')); // Hide password

async function testConnection() {
    console.log("⏳ Attempting to connect to MongoDB...");
    try {
        await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("✅ SUCCESS! Connected to MongoDB.");

        // List databases to verify permissions
        const admin = new mongoose.mongo.Admin(mongoose.connection.db);
        const result = await admin.listDatabases();
        console.log("Available Databases:", result.databases.map(d => d.name).join(', '));

        console.log("✅ Credentials and Firewall are correct (for this machine).");
    } catch (error) {
        console.error("❌ CONNECTION FAILED:");
        console.error(error.message);
        console.log("\nPossible Causes:");
        console.log("1. IP Address blocked (Go to Atlas > Network Access > Allow 0.0.0.0/0)");
        console.log("2. Wrong Password in .env.local");
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

testConnection();
