// server/services/emailService.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendBookingConfirmationEmail = async (booking) => {
  if (!booking?.email) return;

  const mailOptions = {
    from: `"SmartBite" <${process.env.EMAIL_USER}>`,
    to: booking.email,
    subject: "Your table is booked at SmartBite 🍽️",
    html: `
      <h2>Hi ${booking.name},</h2>
      <p>Your table has been <b>confirmed</b> at <b>SmartBite</b>.</p>
      <p>
        <b>Date:</b> ${booking.date}<br/>
        <b>Time:</b> ${booking.time}<br/>
        <b>Guests:</b> ${booking.guests}<br/>
        <b>Amount:</b> ₹${booking.amount}<br/>
        <b>Payment Status:</b> ${booking.paymentStatus}
      </p>
      <p>We can't wait to serve you! 😋</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Booking confirmation email sent to", booking.email);
  } catch (err) {
    console.error("❌ Email sending failed:", err.message);
  }
};

module.exports = { sendBookingConfirmationEmail };
