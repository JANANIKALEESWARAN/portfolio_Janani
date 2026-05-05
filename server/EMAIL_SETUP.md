# Email Setup Guide for Contact Form

## 📧 Gmail Configuration (Recommended)

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account: https://myaccount.google.com/
2. Click on "Security"
3. Enable 2-Step Verification if not already enabled

### Step 2: Generate App Password
1. Go to Google Account Security page
2. Click on "App passwords" (under 2-Step Verification)
3. Select:
   - App: "Mail"
   - Device: "Other (Custom name)" → Enter "Portfolio Contact"
4. Click "Generate"
5. Copy the 16-character password (this is your EMAIL_PASS)

### Step 3: Update Environment Variables
In your `.env` file, replace:
```
EMAIL_PASS=your-app-password
```
with:
```
EMAIL_PASS=the-16-character-password-you-copied
```

## 🔧 Configuration Options

### Using Gmail (Recommended)
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=janani6002@gmail.com
EMAIL_PASS=your-gmail-app-password
EMAIL_FROM=janani6002@gmail.com
EMAIL_TO=janani6002@gmail.com
```

### Using Other Email Services
You can also use other SMTP providers like Outlook, Yahoo, etc. Just update:
- `EMAIL_HOST` (e.g., smtp-mail.outlook.com)
- `EMAIL_PORT` (usually 587 for TLS)
- `EMAIL_USER` (your email)
- `EMAIL_PASS` (your password or app password)

## 🚀 Testing the Contact Form

1. Start your server: `npm start`
2. Open your portfolio in browser
3. Fill out the contact form with:
   - Name: Test User
   - Email: your-email@example.com
   - Message: This is a test message
4. Click "Send Message"

## 📬 What Happens When Someone Submits

1. **Database**: Message is saved to MongoDB Atlas
2. **Your Email**: You receive a notification with the message details
3. **Auto-Reply**: Sender receives a confirmation email

## 🔍 Troubleshooting

### Email Not Sending
- Check your Gmail App Password is correct
- Ensure 2-Step Verification is enabled
- Verify email credentials in `.env` file

### Server Errors
- Check server logs for error messages
- Ensure all environment variables are set
- Verify MongoDB Atlas connection

### Port Conflicts
- Change PORT in `.env` if needed (currently 5002)
- Update client API URL accordingly

## 📱 Email Templates

The system sends two emails:

1. **To You**: Contains sender details and message
2. **To Sender**: Professional confirmation with their message

Both emails are beautifully formatted with your branding and contact information.
