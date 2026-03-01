# Deployment Guide

This document outlines steps to deploy Second Brain to a production environment such as Vercel, Netlify, or any Node.js-compatible host.

## 1. Build & Environment

1. Make sure your `package.json` defines appropriate build scripts (the default `next build`).
2. Set environment variables in your host's configuration:
   - `MONGODB_URI` (pointing to a production MongoDB cluster)
   - `NEXTAUTH_SECRET` (secure random string)
   - `NEXTAUTH_URL` (public URL of your deployment)
   - `GROQ_API_KEY` (obtained from Groq)

## 2. Static Files

Any assets in `public/` will be served automatically. No further action is required.

## 3. Database Connection

Use a reliable MongoDB provider (Atlas, MongoDB Atlas, or managed service). The connection string should include credentials and any required options.

Connection caching logic in `src/lib/mongodb.ts` prevents too many connections when running in serverless environments.

## 4. Optional: Custom Domain

Point your DNS to the hosting provider following their DNS instructions. Update `NEXTAUTH_URL` accordingly.

## 5. Monitoring

Consider adding application monitoring or error reporting (Sentry, LogRocket) by instrumenting client components and API routes.

## 6. Scaling AI Usage

The AI component uses Groq SDK. Monitor your usage and upgrade your plan if you exceed free-tier limits. You may replace the provider or add caching for responses if needed.

## 7. Continuous Deployment

Link your GitHub repository to the hosting provider for automatic builds on push to main branch. Ensure environment variables are set in the CI settings.
