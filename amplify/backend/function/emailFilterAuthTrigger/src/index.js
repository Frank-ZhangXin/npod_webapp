var aws = require("aws-sdk");

var ses = new aws.SES();

exports.handler = (event, context, callback) => {
  // Configure the email domain that will be allowed to automatically verify
  var approvedDomain = "approveddomain.com";
  // Log the event information for debugging purposes.
  console.log("Received event:", JSON.stringify(event, null, 2));

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;
  // Identify why was this function invoked
  if (event.request.userAttributes["cognito:user_status"] === "CONFIRMED") {
    event.response.emailSubject = "nPOD Email Verification Link";

    if (event.triggerSource === "CustomMessage_VerifyUserAttribute") {
      var verifyUrl =
        "https://portal.jdrfnpod.org/verify?attribute=email&verify_code=" +
        event.request.codeParameter +
        "&action=verifyattribute";
      event.response.emailMessage =
        "Please click following link to verify your email: " +
        `<a href="${verifyUrl}">${verifyUrl}</a>` +
        "<br>" +
        "If you don't recognize this email, please discard it and report to nPOD admin." +
        "<br>" +
        "Sent at " +
        dateTime +
        " UTC";
    }

    if (event.triggerSource === "CustomMessage_ForgotPassword") {
      var verifyUrl =
        "https://portal.jdrfnpod.org/verify?attribute=password&verify_code=" +
        event.request.codeParameter +
        "&action=forgotpassword";
      event.response.emailMessage =
        "Please click following link to verify your email: " +
        `<a href="${verifyUrl}">${verifyUrl}</a>` +
        "<br>" +
        "If you don't recognize this email, please discard it and report to nPOD admin." +
        "<br>" +
        "Sent at " +
        dateTime +
        " UTC";
    }

    // Return to Amazon Cognito
    context.done(null, event);
  } else {
    console.log("Blocking user and send out notice.");
    var to = [event.request.userAttributes.email];
    var subject = "Your Sign-up on nPOD is received";
    var body =
      "Hi " +
      event.userName +
      ", your sign-up on nPOD has been received and waiting for approval." +
      "\r\n" +
      "You have agreed and understand nPOD website terms and conditions." +
      "\r\n" +
      "Please check: https://portal.jdrfnpod.org/useragreement for details.";
    var body2 = "\r\n" + "Sent at " + dateTime + " UTC";
    //var toAdmin = "npod.aws@gmail.com";
    var toAdmin = ["npod@pathology.ufl.edu", "npod.aws@gmail.com"];
    var subjectAdmin = "New User Sign-up on nPOD";
    var bodyAdmin =
      "New user just signed up." +
      "\r\n" +
      "User information" +
      "\r\n\t" +
      "Email: " +
      event.request.userAttributes.email +
      "\r\n\t" +
      "Username: " +
      event.userName +
      "\r\n\t" +
      "First Name: " +
      event.request.userAttributes["custom:firstname"] +
      "\r\n\t" +
      "Last Name: " +
      event.request.userAttributes["custom:lastname"] +
      "\r\n\t" +
      "Institution: " +
      event.request.userAttributes["custom:institution"] +
      "\r\n\t" +
      "Approved Project: " +
      event.request.userAttributes["custom:project"] +
      "\r\n" +
      "Sent at " +
      dateTime +
      " UTC";
    if (event.request.userAttributes.email) {
      sendEmail(to, subject, body + " " + body2, function (status) {
        console.log(status);
        console.log("New user notification was sent.");
      });
      sendEmail(toAdmin, subjectAdmin, bodyAdmin, function (status) {
        console.log(status);
        console.log("Admin notification was sent.");
        var error = new Error("Pending for approval");
        // Return to Amazon Cognito
        //context.done(error, event);
        callback(error, event);
      });
    } else {
      // Nothing to do, the user's email ID is unknown
      callback(null, event);
    }

    //   var error = new Error("Pending for approval");
    //   // Return to Amazon Cognito
    //   context.done(error, event);
  }
};

function sendEmail(to, subject, body, completedCallback) {
  var eParams = {
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
      },
    },

    // Replace source_email with your SES validated email address
    Source: "service@jdrfnpod.org",
  };

  var email = ses.sendEmail(eParams, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("===EMAIL SENT===");
    }
    completedCallback("Email sent");
  });
  console.log("EMAIL CODE END");
}
