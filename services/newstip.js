const nodeMailer = require("nodemailer");
const customErrors = require("../helpers/customErrors");

const { getCurrentDate, getCurrentTime } = require("../helpers/date-utils");

const {
  DATE_TIME_FORMAT: { MMM_DD, HOUR_MONTH_12_SMALL },
} = require("../helpers/constants");

const {
  ADMIN_ERROR_MSG,
  SPACE_STR,
  NEWSTIP: {
    NEWSTIP_SENT_SUCCESSFULLY,
    SUBJECT,
    TITLE,
    SUBMITTED,
    FROM_USERNAME,
    FROM_EMAIL,
    AT,
    DETAILS_OF_THE_NEWSTIP,
    NAME,
    EMAIL_ADDRESS,
  },
} = require("../helpers/constants");

const getMailOptions = (details, name, email) => {
  // const userName = name ? name : FROM_USERNAME;
  // const fromEmail = `${userName} <${FROM_EMAIL}>`;
  // Below Commented fromEmail is for local testing, in cased of no mails due to quaratine outlook rules
  //const fromEmail = FROM_EMAIL;
  const fromEmail = `${FROM_USERNAME} <${FROM_EMAIL}>`;
  const displayName = name ? name : "";
  const displayEmail = email ? email : "";

  const currentDate = getCurrentDate(MMM_DD);
  const currentTime = getCurrentTime(HOUR_MONTH_12_SMALL);

  return {
    from: fromEmail,
    to: process.env.TO_EMAIL,
    subject: SUBJECT,
    // text: details,
    html:
      "<div style='height:45px; width:100%; text-align: center; vertical-align:middle; font-size:30px; background-color:black; color:white;'>GRID</div>" +
      "<p style='font-weight:700; font-size:22px; font-family:Roboto'>" +
      TITLE +
      "</p><p style='font-weight:400; font-size:15px; font-family:Arial'>" +
      "<br>" +
      SUBMITTED +
      "<br>" +
      currentDate +
      SPACE_STR +
      AT +
      SPACE_STR +
      currentTime +
      "<br></br><b>" +
      DETAILS_OF_THE_NEWSTIP +
      "</b><br>" +
      details +
      "<br><br><b>" +
      NAME +
      "</b><br>" +
      displayName +
      "<br></br><b>" +
      EMAIL_ADDRESS +
      "</b><br>" +
      displayEmail +
      "</p>",
  };
};

const getTransporter = () => {
  return nodeMailer.createTransport({
    host: process.env.AWS_SES_SMTP_HOST,
    port: process.env.AWS_SES_SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.AWS_SES_SMTP_USER,
      pass: process.env.AWS_SES_SMTP_PASS,
    },
    /* tls needed in case of unauthorized failure */
    /* tls: {
        rejectUnauthorized: false
     } */
  });
};

const sendMailTrasnsporter = (transporter, mailOptions) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(
        "NEWSTIP_API_ERROR: sendMailTrasnsporter: Failed to send email - ",
        error
      );
      throw customErrors.summitError(503, ADMIN_ERROR_MSG);
    }
    console.log("Message %s sent: %s", info.messageId, info.response);
  });
};

const sendEmail = (details, name, email) => {
  let transporter = getTransporter();
  let mailOptions = getMailOptions(details, name, email);

  sendMailTrasnsporter(transporter, mailOptions);
};

exports.postNewstip = async (details, name, email) => {
  try {
    sendEmail(details, name, email);
    return NEWSTIP_SENT_SUCCESSFULLY;
  } catch (error) {
    console.log(
      "NEWSTIP_API_ERROR: postNewstip: Failed to send email - ",
      error
    );
    throw customErrors.summitError(503, ADMIN_ERROR_MSG);
  }
};
