const multiparty = require('multiparty');
const fs = require('fs');

exports.handler = function(event, context, callback) {
  if (event.httpMethod !== 'POST') {
    return callback(null, {
      statusCode: 405,
      body: 'Method Not Allowed',
    });
  }

  const form = new multiparty.Form();

  form.parse(event, function(err, fields, files) {
    if (err) {
      return callback(err);
    }

    const { name, email, phone, childTicketsFree, childTicketsPaid, adultTickets, studentTickets, paymentMethod, candidateMembers } = fields;
    const paymentScreenshot = files.paymentScreenshot[0];

    // Process and store the form data as needed
    console.log('Form Data:', {
      name: name[0],
      email: email[0],
      phone: phone[0],
      childTicketsFree: childTicketsFree[0],
      childTicketsPaid: childTicketsPaid[0],
      adultTickets: adultTickets[0],
      studentTickets: studentTickets[0],
      paymentMethod: paymentMethod[0],
      candidateMembers: candidateMembers[0],
      paymentScreenshot
    });

    // Example: Save the screenshot file to the server
    const uploadDir = '/tmp/uploads';
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }
    const filePath = `${uploadDir}/${paymentScreenshot.originalFilename}`;
    fs.copyFileSync(paymentScreenshot.path, filePath);

    return callback(null, {
      statusCode: 200,
      body: 'Form submitted successfully!',
    });
  });
};
