#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Apply database schema to Supabase
 * This script executes the SQL schema directly
 */

const https = require("https");
const fs = require("fs");
const path = require("path");

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Error: Missing Supabase credentials in .env.local");
  process.exit(1);
}

// Extract project ref from URL
const projectRef = supabaseUrl.replace("https://", "").split(".")[0];

async function applySchema() {
  console.log("🚀 Applying database schema to Supabase...\n");

  try {
    // Read SQL file
    const sqlPath = path.join(__dirname, "..", "supabase-schema.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("📄 SQL file loaded");
    console.log("🔗 Project:", projectRef);
    console.log("📊 Executing SQL...\n");

    // Use Supabase REST API to execute SQL
    const _url = `${supabaseUrl}/rest/v1/rpc/exec`;

    const postData = JSON.stringify({ query: sql });

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseServiceKey,
        Authorization: `Bearer ${supabaseServiceKey}`,
        "Content-Length": Buffer.byteLength(postData),
      },
    };

    // Try via REST API
    const urlObj = new URL(supabaseUrl);
    const req = https.request(
      {
        hostname: urlObj.hostname,
        path: "/rest/v1/rpc/exec",
        method: "POST",
        headers: options.headers,
      },
      (res) => {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log("✅ Schema applied successfully!\n");
            console.log("🎉 Migration complete!");
            console.log("\nYou can now test the application:");
            console.log("  • npm run dev");
            console.log("  • Visit /apply/mentor");
            console.log("  • Visit /apply/judge");
            console.log("  • Visit /admin/applications\n");
          } else {
            console.log("⚠️  REST API execution not available");
            console.log("\nPlease use one of these methods:\n");
            console.log("Method 1: Supabase Dashboard");
            console.log("  1. Open https://supabase.com/dashboard/project/" + projectRef);
            console.log("  2. Go to SQL Editor");
            console.log("  3. Paste contents of supabase-schema.sql");
            console.log("  4. Run it\n");
            console.log("Method 2: Supabase CLI");
            console.log("  npx supabase db execute -f supabase-schema.sql\n");
          }
        });
      }
    );

    req.on("error", (error) => {
      console.error("❌ Error:", error.message);
      console.log("\n📋 Please apply the schema manually:");
      console.log("\n1. Open https://supabase.com/dashboard/project/" + projectRef + "/sql/new");
      console.log("2. Copy the contents of supabase-schema.sql");
      console.log("3. Paste and run it\n");
    });

    req.write(postData);
    req.end();
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.log("\n📋 Please apply the schema manually using the Supabase dashboard");
    process.exit(1);
  }
}

applySchema();
