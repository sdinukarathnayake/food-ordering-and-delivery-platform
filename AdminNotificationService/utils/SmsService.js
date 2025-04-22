const twilio = require('twilio');
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendSms = async (to, body) => {
    try {
        await client.messages.create({
            body,
            from: twilioPhoneNumber,
            to
        });
        console.log("SMS sent successfully");
    } catch (err) {
        console.error("Failed to send SMS:", err.message);
    }
};

module.exports = {sendSms};
