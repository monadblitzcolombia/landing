#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Initialize database by directly executing SQL
 * Uses PostgreSQL client to connect to Supabase
 */

const { Client } = require("pg");
const fs = require("fs");
const path = require("path");

require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (!supabaseUrl) {
  console.error("❌ Error: Missing NEXT_PUBLIC_SUPABASE_URL in .env.local");
  process.exit(1);
}

// Extract project ref from URL
const projectRef = supabaseUrl.replace("https://", "").split(".")[0];

console.log("🚀 Initializing MonadBlitz Database\n");

// Construct PostgreSQL connection string
// For Supabase, we need the database password
// The connection string format is: postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

// Try to get password from environment
const dbPassword = process.env.SUPABASE_DB_PASSWORD || process.env.DB_PASSWORD;

if (!dbPassword) {
  console.log("⚠️  Database password not found in environment");
  console.log("\nTo run this automatically, add to .env.local:");
  console.log("  SUPABASE_DB_PASSWORD=your_database_password\n");
  console.log("You can find your database password in:");
  console.log(`  https://supabase.com/dashboard/project/${projectRef}/settings/database\n`);
  console.log("Or run the SQL manually:");
  console.log("  npm run db:setup\n");
  process.exit(1);
}

// Try connection pooler first (more reliable for external connections)
const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://postgres.${projectRef}:${dbPassword}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`;

async function initDatabase() {
  const client = new Client({ connectionString });

  try {
    console.log("🔌 Connecting to PostgreSQL...");
    await client.connect();
    console.log("✅ Connected!\n");

    // Read SQL file
    const sqlPath = path.join(__dirname, "..", "supabase-schema.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("📄 Executing schema SQL...");
    await client.query(sql);
    console.log("✅ Schema applied successfully!\n");

    // Verify table was created
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name = 'applications'
    `);

    if (result.rows.length > 0) {
      console.log('✅ Table "applications" created successfully!');
      console.log("✅ Database initialization complete!\n");
      console.log("🎉 You can now run:");
      console.log("   npm run dev\n");
      console.log("And test:");
      console.log("   • /apply/mentor");
      console.log("   • /apply/judge");
      console.log("   • /admin/applications\n");
    } else {
      console.log("⚠️  Table creation may have failed");
    }
  } catch (error) {
    console.error("\n❌ Error:", error.message);

    if (error.message.includes("password authentication failed")) {
      console.log("\n💡 The database password is incorrect.");
      console.log("Get the correct password from:");
      console.log(`   https://supabase.com/dashboard/project/${projectRef}/settings/database\n`);
    } else if (error.message.includes('relation "applications" already exists')) {
      console.log("\n✅ Table already exists! Database is ready.\n");
      console.log("You can now run:");
      console.log("   npm run dev\n");
    } else {
      console.log("\nFalling back to manual setup:");
      console.log("   npm run db:setup\n");
    }
  } finally {
    await client.end();
  }
}

initDatabase();
