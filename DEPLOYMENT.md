# Vercel Deployment Guide

Deploying the SRP Introspector Playground and Documentation to Vercel takes less than 5 minutes.

## Step 1: Clone and Setup
```bash
git clone https://github.com/egaslemos-gif/Runtime-Oriented-Product-Engineering.git
cd Runtime-Oriented-Product-Engineering
```

## Step 2: Push to GitHub
If you haven't already, push this fork to your own GitHub account.

## Step 3: Deploy on Vercel
1. Log in to your [Vercel Dashboard](https://vercel.com).
2. Click **Add New...** > **Project**.
3. Import your GitHub repository.
4. **Framework Preset:** Next.js (Vercel will auto-detect the `apps/web` directory if you configure the Root Directory, but currently the repo can be run from root if `package.json` forwards to `apps/web`, or simply set the Root Directory to `apps/web`).
5. **Build Command:** `pnpm run build`
6. **Install Command:** `pnpm install`
7. Click **Deploy**.

## Result
Within 2 minutes, your Context Firewall visualizer and Entry Vector landing page will be live on a `*.vercel.app` domain, ready for community validation.
