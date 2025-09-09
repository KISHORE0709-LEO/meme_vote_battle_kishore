# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up/Login to your account
3. Click "New Project"
4. Choose your organization
5. Fill in project details:
   - Name: `meme-arena` (or any name you prefer)
   - Database Password: Generate a strong password
   - Region: Choose closest to your location
6. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

## 3. Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## 4. Configure Authentication

1. In Supabase dashboard, go to Authentication > Settings
2. Under "Site URL", add: `http://localhost:5173`
3. Under "Redirect URLs", add: `http://localhost:5173`
4. Save the configuration

## 5. Test the Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:5173/login`
3. Try registering a new account
4. Check your Supabase dashboard > Authentication > Users to see if the user was created

## 6. Optional: Email Configuration

For production, you'll want to configure email settings:

1. Go to Authentication > Settings > SMTP Settings
2. Configure your email provider (Gmail, SendGrid, etc.)
3. This enables email verification and password reset functionality

## Troubleshooting

- **"Invalid API key"**: Double-check your VITE_SUPABASE_ANON_KEY
- **"Failed to fetch"**: Verify your VITE_SUPABASE_URL is correct
- **CORS errors**: Make sure you've added your domain to the allowed origins in Supabase settings

## Security Notes

- Never commit your actual Supabase keys to version control
- Use environment variables for all sensitive data
- In production, update your Site URL and Redirect URLs to your actual domain