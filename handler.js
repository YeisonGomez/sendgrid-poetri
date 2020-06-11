'use strict';

const sgMail = require('@sendgrid/mail');

module.exports.sendgridEmail = async context => {

  const { SET_API_KEY, FROM_MAIL } = process.env;
  const {
    to = 'feedback@poetri.co',
    subject = 'Ready to use function!',
    text = 'and easy to do anywhere, even with Node.js'
  } = context.body;

  sgMail.setApiKey(SET_API_KEY);

  try {

    await sgMail.send({ to, from: FROM_MAIL, subject, text, html: text });

    return {
      statusCode: 202,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(
        {
          message: {
            status: 'Message sent',
            statusCode: 202,
          }
        }
      ),
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify(
        {
          message: {
            status: 'message not sent',
            error: error.message,
          }
        }
      ),
    }
  }


};
