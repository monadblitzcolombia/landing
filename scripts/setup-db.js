#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Database setup script
 * Opens Supabase SQL Editor with instructions
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseUrl) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL not found in .env.local");
  process.exit(1);
}

const projectRef = supabaseUrl.replace("https://", "").split(".")[0];
const sqlEditorUrl = `https://supabase.com/dashboard/project/${projectRef}/sql/new`;

console.log("\n🚀 MonadBlitz Database Setup\n");
console.log("📋 Instructions:");
console.log("  1. Your browser will open the Supabase SQL Editor");
console.log("  2. Copy the contents of supabase-schema.sql");
console.log("  3. Paste it into the SQL Editor");
console.log('  4. Click "Run" or press Cmd+Enter\n');

// Read SQL file and copy to clipboard if possible
const sqlPath = path.join(__dirname, "..", "supabase-schema.sql");
const sql = fs.readFileSync(sqlPath, "utf8");

try {
  // Try to copy SQL to clipboard (macOS)
  const { platform } = process;
  if (platform === "darwin") {
    execSync(`echo "${sql.replace(/"/g, '\\"')}" | pbcopy`);
    console.log("✅ SQL copied to clipboard!\n");
  } else {
    console.log("💡 SQL file location: supabase-schema.sql\n");
  }
} catch (_error) {
  console.log("💡 SQL file location: supabase-schema.sql\n");
}

console.log("🌐 Opening Supabase SQL Editor...\n");

// Open browser
try {
  const command =
    process.platform === "darwin" ? "open" : process.platform === "win32" ? "start" : "xdg-open";
  execSync(`${command} ${sqlEditorUrl}`);
  console.log("✅ Browser opened!");
  console.log("\nIf the browser did not open, visit:");
  console.log(`   ${sqlEditorUrl}\n`);
} catch (_error) {
  console.log(`Please open this URL manually:\n   ${sqlEditorUrl}\n`);
}

console.log("After running the SQL, you can start the dev server with:");
console.log("   npm run dev\n");
