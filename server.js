require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import cors

const app = express();
const port = process.env.PORT || 3000; // Use port from environment or 3000

// Middleware
app.use(express.json()); // For parsing JSON request bodies
app.use(cors({
    origin: 'http://localhost:5500' // Allow requests from your local development server (e.g., Live Server)
    // For production on Railway, you might set this to your front-end URL
    // e.g., origin: 'https://your-portfolio-frontend.railway.app'
    // Or if you want to allow all origins (less secure for production but fine for testing)
    // origin: '*'
}));

// Nodemailer transporter setup
// Use your actual email service (e.g., Gmail, Outlook, SendGrid)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Or 'outlook', 'smtp.yourdomain.com' etc.
    auth: {
        user: process.env.EMAIL_USER, // Your sending email address
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

// API endpoint for sending messages
app.post('/send-message', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: process.env.RECEIVING_EMAIL, // Receiver address
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

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully!');
        res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send message.', error: error.message });
    }
});

// Optional: Serve static files from your frontend if both are in the same repo
// For this setup, we assume frontend is separate.
// If you want to serve frontend and backend from the same Railway app:
// app.use(express.static('public')); // Assuming your frontend is in a 'public' folder

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Access backend at: http://localhost:${port}`);
});