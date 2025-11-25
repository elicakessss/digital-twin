# Contact Form Setup Guide

Your contact form is now functional! Follow these steps to complete the setup:

## Step 1: Get Your Web3Forms API Key (Free)

1. Go to **https://web3forms.com**
2. Click **"Get Started Free"**
3. Enter your email: `elijahalonzo.me@gmail.com`
4. Click **"Create Access Key"**
5. Check your email for the access key (it's a long string like `a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6`)

## Step 2: Add Your Access Key

1. Open `app/page.tsx`
2. Find line with: `<input type="hidden" name="access_key" value="YOUR_WEB3FORMS_KEY" />`
3. Replace `YOUR_WEB3FORMS_KEY` with your actual key

**Example:**
```tsx
<input type="hidden" name="access_key" value="a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6" />
```

## Step 3: Test the Form

1. Visit your site (localhost:3001 or your production URL)
2. Scroll to the contact section
3. Fill out the form and click "Send Message"
4. You should receive an email at `elijahalonzo.me@gmail.com`

## How It Works

- ✅ **No backend needed** - Works entirely client-side
- ✅ **Spam protection** - Built-in spam filtering
- ✅ **Free tier** - 250 submissions per month
- ✅ **Email notifications** - You get emails directly to your inbox
- ✅ **Form validation** - Required fields are enforced
- ✅ **Loading states** - Shows "Sending..." while submitting
- ✅ **Success/Error messages** - User gets feedback

## Features Added

1. **Form submission handling** - Actually sends emails now!
2. **Loading state** - Shows spinner while sending
3. **Success message** - Confirms when email is sent
4. **Error handling** - Shows error if something goes wrong
5. **Form reset** - Clears form after successful submission
6. **Disabled state** - Prevents double submissions

## Security & Privacy

- No personal data is stored by Web3Forms
- Emails are sent directly to your inbox
- CAPTCHA can be added if you get spam (optional)
- Works with HTTPS in production

## Customization Options

You can customize the email subject by changing:
```tsx
<input type="hidden" name="subject" value="New Contact Form Submission from Portfolio" />
```

## Troubleshooting

**Form not sending?**
- Make sure you replaced `YOUR_WEB3FORMS_KEY` with your actual key
- Check browser console for errors
- Verify your email in Web3Forms dashboard

**Not receiving emails?**
- Check spam folder
- Verify email address in Web3Forms dashboard
- Make sure access key is active

**Getting spam?**
- Enable CAPTCHA in Web3Forms dashboard (free)
- Add honeypot field for additional spam protection

## Need Help?

- Web3Forms docs: https://docs.web3forms.com
- Support: support@web3forms.com
