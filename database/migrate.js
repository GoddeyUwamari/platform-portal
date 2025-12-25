/**
 * Database Migration Runner
 * Runs PostgreSQL migration scripts
 *
 * Usage: node database/migrate.js
 *
 * Environment Variables:
 * - DB_HOST: Database host (default: localhost)
 * - DB_PORT: Database port (default: 5432)
 * - DB_NAME: Database name (default: platform_portal)
 * - DB_USER: Database user (default: postgres)
 * - DB_PASSWORD: Database password
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigrations() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'platform_portal',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database');

    const migrationFile = path.join(__dirname, 'migrations', '001_create_platform_tables.sql');
    console.log(`📄 Reading migration file: ${migrationFile}`);

    const sql = fs.readFileSync(migrationFile, 'utf8');

    console.log('🚀 Running migration...');
    await client.query(sql);

    console.log('✅ Migration completed successfully');
    console.log('');
    console.log('📊 Created tables:');
    console.log('   - services');
    console.log('   - deployments');
    console.log('   - infrastructure_resources');
    console.log('   - teams');
    console.log('');
    console.log('🔒 Row-Level Security (RLS) enabled on all tables');
    console.log('📈 Indexes created for optimal query performance');
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
    throw error;
  } finally {
    await client.end();
    console.log('');
    console.log('🔌 Database connection closed');
  }
}

// Run migrations
runMigrations().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
