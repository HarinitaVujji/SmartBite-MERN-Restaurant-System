// server/services/smsService.js
// Use real SMS provider (Twilio, Fast2SMS, etc.)

const sendBookingSMS = async (booking) => {
  try {
    // TODO: integrate Twilio / other SMS API here
    // Example: twilioClient.messages.create(...)
    console.log(`(FAKE SMS) Sent SMS to user for booking ${booking._id}`);
  } catch (err) {
    console.error("SMS sending failed:", err.message);
  }
};

module.exports = { sendBookingSMS };
