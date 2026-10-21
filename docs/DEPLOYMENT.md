# MyGlucoGuide Deployment Guide

## Recommended host: Vercel

The repository is a React + TypeScript + Vite single-page application. Vercel can build it directly from GitHub without a custom server.

### 1. Import the repository

1. Sign in to Vercel and choose **Add New → Project**.
2. Import `Sohaibk111/MyGlucoGuide`.
3. Keep the production branch set to `main`.
4. Confirm these project settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: use the package manager Vercel detects. Add and commit a lockfile from a working development environment for reproducible installs.

The repository includes a `vercel.json` SPA rewrite so direct section paths can fall back to the app entry point.

### 2. Environment variables

Add these only when the real values are available:

- `VITE_WHATSAPP_NUMBER`: required for WhatsApp CTA launch. Use the real business number in international digits-only format, 8–15 digits, without `+` or spaces. Do not use an example or placeholder number.
- `VITE_META_PIXEL_ID`: optional. Leave unset unless Meta tracking is intended and privacy/consent requirements have been reviewed.

Do not add private API keys to variables prefixed with `VITE_`; Vite exposes those values to browser code. Do not put email-provider credentials in the frontend. The current contact form opens a prefilled email draft and does not send email from a backend.

The `.env.example` also mentions `GEMINI_API_KEY` and `APP_URL` for a Google AI Studio runtime. Verify whether those are needed for the chosen deployment before configuring them; do not paste private values into public files.

### 2a. Current launch choices

- Contact method: keep the existing email-draft flow. The site opens a prefilled draft; the visitor must review it and press Send in their email application.
- Meta Pixel: disabled. Keep `VITE_META_PIXEL_ID` empty/unset.
- WhatsApp number: the owner has supplied the real business number. Configure that value as `VITE_WHATSAPP_NUMBER` in the hosting provider's project environment settings for **Production** and **Preview** as needed, then trigger a fresh deployment. Do not commit the real number into application source or `.env.example`.
- Production domain: not confirmed. Use the temporary host URL for initial QA; do not invent canonical URLs.

The repository integration reads and validates `VITE_WHATSAPP_NUMBER` at build time. GitHub repository access does not provide the connected hosting provider's environment settings, so the variable still has to be entered in the host dashboard.

### 3. Domain and HTTPS

1. Deploy to the temporary Vercel URL first.
2. Test the temporary URL before connecting a custom domain.
3. Add the purchased domain in Vercel and follow the DNS records Vercel provides.
4. Wait for domain verification and HTTPS provisioning.
5. Only after the final production domain is confirmed, add canonical URLs, absolute social-image URLs, and a production sitemap.

No production domain is currently confirmed in this repository.

### 4. Production smoke-test checklist

- Open each section from the header and footer.
- Refresh the Home page and each direct section path.
- Test browser Back/Forward.
- Open the WhatsApp modal with no number configured; the launch button should be disabled.
- After configuring the real number, verify that the generated WhatsApp link opens the intended business account.
- Submit an invalid contact form and verify inline errors.
- Submit a valid contact form and confirm that it opens an email draft; manually press Send to actually send it.
- Check mobile navigation, keyboard focus, and horizontal overflow on phone/tablet/desktop sizes.
- Inspect browser console and Network panel for errors and missing assets.
- Confirm Meta Pixel is absent when no ID is configured and verify event delivery only if a real pixel is enabled.
- Revisit medical references, privacy copy, and product-specific CGM claims before public launch.
- After domain setup, validate metadata, structured data, robots.txt, and sitemap, then configure Google Search Console.

## Current limitations

The GitHub Actions type-check and production build passed on commit `b7e70d38bc3bf3446e44abc257e48c65b3fbdeb9` (run [39577280513](https://github.com/Sohaibk111/MyGlucoGuide/actions/runs/39577280513)). Browser-based QA and production smoke tests have not been run. GitHub repository access worked, but cloning from the local container failed because external DNS/network access was unavailable. No production deployment or confirmed production URL was found during this audit.
