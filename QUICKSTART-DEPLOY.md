# Digital Twin MCP Server - Quick Deployment Guide

## 🎯 Ready to Deploy!

Your Digital Twin MCP Server is ready for deployment to Vercel. Everything has been tested and configured.

## ✅ Pre-Deployment Status

- ✅ **Build Test**: Passed - Project compiles successfully
- ✅ **Git Repository**: Connected to https://github.com/elijah-alonzo/digital-twin
- ✅ **Environment Variables**: Documented and ready
- ✅ **Configuration Files**: Created (vercel.json, .vscode/mcp.json, claude_desktop_config.json)

## 🚀 Deploy Now in 5 Minutes

### Step 1: Go to Vercel (1 min)
1. Visit: **https://vercel.com**
2. Sign in with your GitHub account
3. Authorize Vercel to access your repositories

### Step 2: Import Your Repository (1 min)
1. Click **"Add New..."** → **"Project"**
2. Find: **"elijah-alonzo/digital-twin"**
3. Click **"Import"**

### Step 3: Add Environment Variables (2 min)
Before clicking Deploy, add these **three** environment variables:

**Click the "Environment Variables" section and add:**

1. **UPSTASH_VECTOR_REST_URL**
   ```
   <Your Upstash Vector URL from .env.local>
   ```

2. **UPSTASH_VECTOR_REST_TOKEN**
   ```
   <Your Upstash Vector Token from .env.local>
   ```

3. **GROQ_API_KEY**
   ```
   <Your Groq API Key from .env.local>
   ```

**Important**: Select all three environments for each variable:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 4: Deploy! (1 min)
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. Copy your live URL (e.g., `https://digital-twin-xxx.vercel.app`)

## 📝 After Deployment

### Test Your MCP Server

Replace `YOUR-URL` with your actual Vercel URL:

```bash
curl -X POST https://YOUR-URL.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

### Update Claude Desktop

**Windows**: Edit `%APPDATA%\Claude\claude_desktop_config.json`  
**macOS**: Edit `~/Library/Application Support/Claude/claude_desktop_config.json`

Replace `YOUR-PROJECT-NAME` with your actual Vercel project name:

```json
{
  "mcpServers": {
    "digital-twin-production": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://YOUR-PROJECT-NAME.vercel.app/api/mcp"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

Then **restart Claude Desktop**.

### Update VS Code

Edit `.vscode/mcp.json` in your project and replace `YOUR-PROJECT-NAME`:

```json
{
  "servers": {
    "digital-twin-production": {
      "type": "http",
      "url": "https://YOUR-PROJECT-NAME.vercel.app/api/mcp",
      "timeout": 30000,
      "description": "Production Digital Twin RAG MCP Server"
    }
  }
}
```

## 🔄 Making Updates

Future updates are automatic:

```bash
# Make changes
npm run dev  # test locally

# Push to GitHub
git add .
git commit -m "Update digital twin profile"
git push origin main

# Vercel automatically redeploys! ✨
```

## 📚 Detailed Documentation

For troubleshooting and detailed instructions, see:
- **DEPLOYMENT.md** - Complete deployment guide
- **README.md** - Project overview

## 🎉 You're Done!

Once deployed, your Digital Twin MCP Server will be:
- ✅ Available 24/7 from anywhere
- ✅ Automatically updated when you push to GitHub
- ✅ Secured with HTTPS
- ✅ Globally distributed via Vercel's CDN

**Need Help?**
- Check Vercel deployment logs for any errors
- Verify all three environment variables are set
- Test the `/api/mcp` endpoint with curl

---

**Your Repository**: https://github.com/elijah-alonzo/digital-twin
