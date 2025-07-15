require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const fetch = require('node-fetch'); // Import node-fetch for making HTTP requests

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'https://tahlil29-my-portfolio-frontend.onrender.com' // For local dev
    // For production on Railway, replace with your frontend URL:
    // origin: 'https://your-portfolio-frontend-xxxxx.railway.app'
}));

// Nodemailer transporter setup (Optional: Keep this if you still want email notifications)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// API endpoint for sending messages
app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // --- Step 1: Send Data to Google Apps Script (for Sheet storage) ---
        const googleAppsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL; // Get URL from environment variable

        if (!googleAppsScriptUrl) {
            console.error('GOOGLE_APPS_SCRIPT_URL not set in environment variables!');
            return res.status(500).json({ message: 'Server configuration error.' });
        }

        const sheetResponse = await fetch(googleAppsScriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }), // Send the form data
        });

        const sheetResult = await sheetResponse.json();

        if (!sheetResponse.ok || !sheetResult.success) {
            console.error('Failed to send data to Google Sheet:', sheetResult.message || 'Unknown error');
            // Decide if you want to stop here or continue to email if sheet fails
            // For now, we'll log and still try to send email if configured
        } else {
            console.log('Data successfully sent to Google Sheet!');
        }

        // --- Step 2: Send Email Notification (Optional) ---
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.RECEIVING_EMAIL) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: process.env.RECEIVING_EMAIL,
                subject: `New Contact Form Message from ${name} (Portfolio)`,
                html: `
                    <p>You have received a new message from your portfolio contact form.</p>
                    <h3>Contact Details:</h3>
                    <ul>
                        <li><strong>Name:</strong> ${name}</li>
                        <li><strong>Email:</strong> ${email}</li>
                    </ul>
                    <h3>Message:</h3>
                    <p>${message}</p>
                    <hr>
                    <p>This message was sent from your portfolio website.</p>
                `
            };
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully!');
        } else {
            console.warn('Email sending skipped: Email environment variables not fully configured.');
        }

        res.status(200).json({ message: 'Message sent successfully! (and saved to sheet)' });

    } catch (error) {
        console.error('Error processing message:', error);
        res.status(500).json({ message: 'An internal server error occurred.', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});