# Digital Twin MCP Server - Vercel Deployment Guide

## ✅ Pre-Deployment Checklist

- [x] Build test completed successfully
- [x] Git repository connected to GitHub
- [x] All code committed and pushed
- [x] Environment variables documented

## 🚀 Deployment Steps

### Step 1: Access Vercel Dashboard

1. Go to [https://vercel.com](https://vercel.com)
2. Sign in with GitHub (or create an account)
3. Authorize Vercel to access your repositories

### Step 2: Import GitHub Repository

1. Click **"Add New..."** → **"Project"**
2. Select **"Import Git Repository"**
3. Find and select: `elijah-alonzo/digital-twin`
4. Click **"Import"**

### Step 3: Configure Project Settings

Vercel should auto-detect Next.js settings:

- **Framework Preset**: Next.js ✅ (auto-detected)
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build` ✅
- **Output Directory**: `.next` ✅
- **Install Command**: `npm install` ✅

**⚠️ IMPORTANT: Don't click Deploy yet!**

### Step 4: Add Environment Variables

Click **"Environment Variables"** and add these three variables:

#### 1. UPSTASH_VECTOR_REST_URL
```
Value: <Your Upstash Vector URL from .env.local>
Environments: ✅ Production ✅ Preview ✅ Development
```

#### 2. UPSTASH_VECTOR_REST_TOKEN
```
Value: <Your Upstash Vector Token from .env.local>
Environments: ✅ Production ✅ Preview ✅ Development
```

#### 3. GROQ_API_KEY
```
Value: <Your Groq API Key from .env.local>
Environments: ✅ Production ✅ Preview ✅ Development
```

### Step 5: Deploy

1. After adding all environment variables, click **"Deploy"**
2. Wait 2-3 minutes for the build to complete
3. You'll get a live URL like: `https://digital-twin-xxx.vercel.app`

### Step 6: Test Your Deployment

#### Test MCP Endpoint

```bash
curl -X POST https://YOUR-PROJECT-NAME.vercel.app/api/mcp \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'
```

#### Test in Browser

Visit: `https://YOUR-PROJECT-NAME.vercel.app`

You should see your Next.js application homepage.

## 📱 Update Client Configurations

### Claude Desktop Configuration

Update your Claude Desktop settings to use the production URL:

**File**: `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS)  
**File**: `%APPDATA%\Claude\claude_desktop_config.json` (Windows)

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

### VS Code MCP Configuration

Create or update `.vscode/mcp.json`:

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

## 🔄 Continuous Deployment

Vercel automatically redeploys when you push to GitHub:

```bash
# Make changes to your code
# Test locally first
npm run dev

# Commit and push
git add .
git commit -m "Update digital twin data"
git push origin main

# Vercel automatically deploys! ✨
```

## ✅ Verification Checklist

- [ ] Vercel deployment shows "Deployment completed successfully"
- [ ] Live URL accessible in browser
- [ ] `/api/mcp` endpoint returns valid JSON-RPC responses
- [ ] All three environment variables configured
- [ ] Claude Desktop connects to production URL
- [ ] VS Code GitHub Copilot can access MCP server
- [ ] Response times under 5 seconds

## 🎉 Success!

Your Digital Twin MCP Server is now live and accessible 24/7 for interview preparation from anywhere!

## 📊 Your GitHub Repository

**Repository**: https://github.com/elijah-alonzo/digital-twin

## 🔧 Troubleshooting

### Build Fails
- Check Vercel build logs for errors
- Verify all dependencies in `package.json`
- Test build locally: `npm run build`

### Environment Variables Not Working
- Verify all three variables are set
- Check for typos in variable names
- Redeploy after adding/updating variables

### MCP Endpoint Not Responding
- Check Vercel function logs
- Verify API route is at `/api/mcp`
- Test with curl command above

### Claude Desktop Can't Connect
- Verify production URL is correct
- Restart Claude Desktop after config change
- Check Claude Desktop logs for errors
