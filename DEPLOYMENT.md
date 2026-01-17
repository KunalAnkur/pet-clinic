# Deployment Guide

This guide covers deploying the Pet Clinic application with PostgreSQL database.

## Environment Variables for Deployment

You need to set the following environment variables in your deployment platform:

### Required

```env
DATABASE_URL="postgresql://username:password@host:5432/database_name"
```

### Optional

```env
# Set to "false" only if your database doesn't support SSL (not recommended for cloud databases)
DB_SSL="true"
```

## Platform-Specific Configuration

### Vercel

1. Go to your project settings → Environment Variables
2. Add `DATABASE_URL` with your PostgreSQL connection string
3. For cloud databases, ensure SSL is enabled (set `DB_SSL="true"` if needed)

**Vercel Environment Variables:**
- Add to: Production, Preview, and Development environments
- Make sure the database allows connections from Vercel's IPs

### Railway

1. Add PostgreSQL service in Railway
2. Railway automatically provides `DATABASE_URL`
3. Ensure the database service is linked to your app service

### Render

1. Create a PostgreSQL database in Render
2. Copy the "Internal Database URL" or "External Database URL"
3. Add as `DATABASE_URL` in your web service environment variables

### Supabase

**IMPORTANT:** Use the **Connection Pooler** URL (port 6543), NOT the direct connection (port 5432) for serverless deployments!

1. Go to Project Settings → Database
2. Scroll to "Connection string" section
3. **Select "Connection pooling" tab** (NOT "Direct connection")
4. Choose "Session mode" or "Transaction mode"
5. Copy the URI - it should look like:
   ```
   postgresql://postgres.xxxxx:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
   ```
   **Note:** The pooler URL uses `pooler.supabase.com` and port `6543`, NOT `db.xxxxx.supabase.co:5432`

**Why use the pooler?**
- ✅ Works reliably in serverless environments (Vercel, etc.)
- ✅ Handles connection pooling automatically
- ✅ Better for Next.js API routes
- ✅ Direct connection (`db.xxxxx.supabase.co:5432`) often fails with `ENOTFOUND` in serverless

## Database Connection String Formats

### Local PostgreSQL
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/pet_clinic"
DB_SSL="false"
```

### Supabase (Connection Pooler - RECOMMENDED)
```env
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require"
DB_SSL="true"
```

**⚠️ DO NOT USE:** Direct connection URL (`db.xxxxx.supabase.co:5432`) - it will fail with `ENOTFOUND` in serverless deployments.

**How to find the pooler URL:**
1. Go to Supabase Dashboard → Project Settings → Database
2. Scroll to "Connection string" section
3. Click "Connection pooling" tab
4. Select "Session mode" or "Transaction mode"
5. Copy the URI (should have `pooler.supabase.com` and port `6543`)

### Railway
```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST].railway.app:5432/railway"
DB_SSL="true"
```

### Render
```env
DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:5432/[DATABASE]?sslmode=require"
DB_SSL="true"
```

## Common Issues

### 1. ENOTFOUND Error - "getaddrinfo ENOTFOUND db.xxxxx.supabase.co"

**Problem:** The hostname `db.xxxxx.supabase.co` cannot be resolved. This happens when using Supabase's **direct connection** URL in serverless deployments.

**Solutions:**
- ✅ **USE CONNECTION POOLER URL** - This is the most common fix!
  - Go to Supabase Dashboard → Settings → Database
  - Click "Connection pooling" tab (NOT "Direct connection")
  - Copy the pooler URL (should have `pooler.supabase.com` and port `6543`)
  - Update your `DATABASE_URL` environment variable

**Wrong (Direct Connection - Causes ENOTFOUND):**
```
postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

**Correct (Connection Pooler - Works in Serverless):**
```
postgresql://postgres.xxxxx:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

### 2. ENETUNREACH Error (Network Unreachable)

**Problem:** Deployment can't reach the database server.

**Solutions:**
- ✅ Ensure `DATABASE_URL` is set correctly in deployment environment variables
- ✅ For cloud databases, use SSL connection (`DB_SSL="true"`)
- ✅ Check if database allows connections from deployment platform IPs
- ✅ Use IPv4 address instead of IPv6 if your database hostname resolves to IPv6
- ✅ For Supabase: Use the connection pooler URL (port 6543) instead of direct connection (port 5432)

### 2. SSL/TLS Connection Issues

**Problem:** Database requires SSL but connection string doesn't specify it.

**Solutions:**
- ✅ Add `?sslmode=require` to your `DATABASE_URL`
- ✅ Or set `DB_SSL="true"` environment variable
- ✅ Most cloud databases (Supabase, Railway, Render) require SSL

### 3. IPv6 vs IPv4 Issues

**Problem:** IPv6 address in connection string but deployment can't access it.

**Solutions:**
- ✅ Use IPv4 address or hostname instead
- ✅ Use connection pooler (if available) which usually works better
- ✅ Check if your database provider has an IPv4-only endpoint

### 4. Connection Timeout

**Problem:** Database takes too long to respond.

**Solutions:**
- ✅ Check if database is running and accessible
- ✅ Verify firewall rules allow connections
- ✅ Use connection pooler (if available) for better reliability

## Database Initialization

After deployment, you need to initialize the database:

1. **Sync the schema:**
   ```bash
   npm run db:sync
   ```

2. **Seed initial data:**
   ```bash
   npm run db:seed
   ```

**For production:** Use migrations instead of `db:sync`. The current setup uses `sync` which is fine for small projects but not recommended for production with existing data.

## Checking Connection

After deployment, check the logs to see if the database connection is successful:

```
✅ Database connection established successfully.
```

If you see errors, check:
1. Environment variables are set correctly
2. Database is accessible from deployment IP
3. SSL is configured if required
4. Database credentials are correct

## Security Notes

- ⚠️ **Never commit `.env` files** - they're in `.gitignore`
- ⚠️ **Use environment variables** in your deployment platform, not hardcoded values
- ⚠️ **Use SSL** for all cloud databases
- ⚠️ **Rotate credentials** regularly
- ⚠️ **Use connection pooling** for better performance and reliability

## Example: Supabase Setup

1. Create a new Supabase project
2. Go to **Settings → Database**
3. Scroll to **"Connection string"** section
4. **IMPORTANT:** Click the **"Connection pooling"** tab (NOT "Direct connection")
5. Select **"Session mode"** or **"Transaction mode"**
6. Copy the URI connection string - it should look like:
   ```
   postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
   ```
   **Key indicators it's the pooler URL:**
   - Hostname contains `pooler.supabase.com` (NOT `db.xxxxx.supabase.co`)
   - Port is `6543` (NOT `5432`)
   - Username format: `postgres.xxxxx` (with dot, NOT `postgres`)

7. In your deployment platform (Vercel/Railway/Render), add as `DATABASE_URL`:
   ```env
   DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?sslmode=require"
   ```

8. Deploy your app

9. After deployment, initialize the database:
   - You can run `npm run db:sync` and `npm run db:seed` locally pointing to the production DB
   - Or use Supabase SQL editor to run the schema and seed data
   - Or create a one-time deployment script

**⚠️ Common Mistake:** Using the direct connection URL (`db.xxxxx.supabase.co:5432`) will result in `ENOTFOUND` errors in serverless deployments. Always use the pooler URL!

## Troubleshooting

If you're still having issues:

1. **Check deployment logs** for detailed error messages
2. **Test connection locally** using the same `DATABASE_URL`
3. **Use database provider's dashboard** to verify the database is running
4. **Check firewall/network settings** in your database provider
