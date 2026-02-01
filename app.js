function doGet() {
  return ContentService
    .createTextOutput("Service request endpoint is live.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .openById("YOUR_SHEET_ID")
      .getSheetByName("Requests");

    const data = [
      new Date(),
      e.parameter.name || "",
      e.parameter.phone || "",
      e.parameter.email || "",
      e.parameter.service || "",
      e.parameter.vehicle || "",
      e.parameter.notes || ""
    ];

    sheet.appendRow(data);

    MailApp.sendEmail({
      to: "business@email.com",
      subject: "New Service Request",
      htmlBody: `
        <h3>New Window Tint Service Request</h3>
        <p><b>Name:</b> ${e.parameter.name}</p>
        <p><b>Phone:</b> ${e.parameter.phone}</p>
        <p><b>Email:</b> ${e.parameter.email}</p>
        <p><b>Service:</b> ${e.parameter.service}</p>
        <p><b>Vehicle:</b> ${e.parameter.vehicle}</p>
        <p><b>Notes:</b> ${e.parameter.notes}</p>
      `
    });

    MailApp.sendEmail({
      to: e.parameter.email,
      subject: "We Received Your Request",
      htmlBody: `
        <p>Hi ${e.parameter.name},</p>
        <p>Thanks for reaching out to <b>Precision Window Tint</b>.</p>
        <p>We’ve received your request and will call you shortly.</p>
        <p><b>Requested Service:</b> ${e.parameter.service}</p>
        <p>— Precision Window Tint</p>
      `
    });

    return ContentService
      .createTextOutput("OK")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    return ContentService
      .createTextOutput("ERROR")
      .setMimeType(ContentService.MimeType.TEXT);
  }
}
