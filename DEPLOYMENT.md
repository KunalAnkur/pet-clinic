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

1. Go to Project Settings → Database
2. Use the connection string under "Connection string" → "URI"
3. Add `?sslmode=require` if not already included:
   ```
   postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?sslmode=require
   ```

## Database Connection String Formats

### Local PostgreSQL
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/pet_clinic"
DB_SSL="false"
```

### Supabase
```env
DATABASE_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require"
DB_SSL="true"
```

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

### 1. ENETUNREACH Error (Network Unreachable)

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
2. Go to Settings → Database
3. Copy the connection string (URI format)
4. In Vercel/Railway/Render, add:
   ```env
   DATABASE_URL="postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?sslmode=require"
   ```
5. Deploy your app
6. Run `npm run db:sync` and `npm run db:seed` (you can do this via SSH or a one-time script)

## Troubleshooting

If you're still having issues:

1. **Check deployment logs** for detailed error messages
2. **Test connection locally** using the same `DATABASE_URL`
3. **Use database provider's dashboard** to verify the database is running
4. **Check firewall/network settings** in your database provider
