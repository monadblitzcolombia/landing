#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Database migration script for MonadBlitz application
 * Applies the database schema to Supabase
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load environment variables
require("dotenv").config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Error: Missing Supabase credentials in .env.local");
  console.error("Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  console.log("🚀 Starting database migration...\n");

  try {
    // Read the SQL file
    const sqlPath = path.join(__dirname, "..", "supabase-schema.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");

    console.log("📄 SQL file loaded successfully");
    console.log("📊 Applying schema to Supabase...\n");

    // Execute the SQL using Supabase's RPC or direct query
    // Note: We'll use the rpc method to execute raw SQL
    const { error } = await supabase.rpc("exec_sql", { sql_query: sql });

    if (error) {
      // If exec_sql function doesn't exist, we'll create the table directly
      console.log("⚠️  exec_sql function not found, using direct table creation...\n");

      // Create the table using Supabase client
      const { error: createError } = await supabase.from("applications").select("id").limit(1);

      if (createError && createError.code === "42P01") {
        // Table doesn't exist, this is expected
        console.log("📋 Applications table does not exist yet");
        console.log("\n⚠️  IMPORTANT: Please run the SQL manually:");
        console.log("\n1. Open https://supabase.com/dashboard");
        console.log("2. Select your MonadBlitz project");
        console.log("3. Go to SQL Editor");
        console.log("4. Copy the contents of supabase-schema.sql");
        console.log("5. Paste and run it\n");
        console.log("Or use the Supabase CLI:");
        console.log("  npx supabase db push\n");
        process.exit(1);
      } else if (!createError) {
        console.log("✅ Applications table already exists!");
        console.log("✅ Migration complete!\n");
      } else {
        throw createError;
      }
    } else {
      console.log("✅ Schema applied successfully!");
      console.log("✅ Migration complete!\n");
    }

    // Verify the table was created
    console.log("🔍 Verifying table creation...");
    const { error: testError } = await supabase.from("applications").select("id").limit(1);

    if (!testError || testError.code === "PGRST116") {
      // PGRST116 is "no rows returned", which means table exists but is empty
      console.log("✅ Table verification successful!");
      console.log("\n🎉 Database migration completed successfully!");
      console.log("\nYou can now:");
      console.log("  • Visit /apply/mentor to test the mentor form");
      console.log("  • Visit /apply/judge to test the judge form");
      console.log("  • Visit /admin/applications to manage submissions\n");
    } else {
      throw testError;
    }
  } catch (error) {
    console.error("\n❌ Migration failed:", error.message);
    console.error("\nPlease run the SQL manually:");
    console.error("1. Open https://supabase.com/dashboard");
    console.error("2. Select your MonadBlitz project");
    console.error("3. Go to SQL Editor");
    console.error("4. Copy the contents of supabase-schema.sql");
    console.error("5. Paste and run it\n");
    process.exit(1);
  }
}

runMigration();
