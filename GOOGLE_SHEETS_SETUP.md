# Google Sheets Integration Setup

This registration form is designed to integrate with Google Apps Script to save submissions to Google Sheets.

## Setup Instructions

### 1. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Game Industry Event Registration"
3. In the first row, add these column headers:
   - A1: `Timestamp`
   - B1: `Full Name (ชื่อ-นามสกุล)`
   - C1: `Organization (สังกัด)`
   - D1: `Role (บทบาท)`
   - E1: `Other Role (อื่นๆ)`
   - F1: `Email (อีเมล)`
   - G1: `Secondary Contact (ติดต่ออื่นๆ)`

### 2. Create Google Apps Script

1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add timestamp and form data to sheet
    sheet.appendRow([
      new Date(),
      data.fullName,
      data.organization,
      data.role,
      data.otherRole,
      data.email,
      data.secondaryContact
    ]);
    
    // Send confirmation email via Resend (optional)
    // You can integrate Resend API here for email confirmations
    
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (💾 icon)
4. Click **Deploy** > **New deployment**
5. Click the gear icon ⚙️ next to "Select type"
6. Select **Web app**
7. Configure:
   - Description: "Registration Form Handler"
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy**
9. Copy the **Web app URL** (it looks like: `https://script.google.com/macros/s/...../exec`)

### 3. Update the React App

In `/src/app/App.tsx`, find this line (around line 39):

```typescript
const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
```

Replace it with your actual Web app URL:

```typescript
const scriptURL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

Then uncomment these lines (around lines 45-48):

```typescript
// Uncomment for production:
// await fetch(scriptURL, {
//   method: 'POST',
//   body: JSON.stringify(formData),
// });
```

To:

```typescript
await fetch(scriptURL, {
  method: 'POST',
  body: JSON.stringify(formData),
});
```

### 4. Test the Integration

1. Submit a test registration through the form
2. Check your Google Sheet - a new row should appear with the data
3. Check the browser console for any errors

## Resend Email Integration (Optional)

To send confirmation emails using Resend:

1. Sign up at [Resend.com](https://resend.com)
2. Get your API key
3. Modify the Google Apps Script to include:

```javascript
function sendConfirmationEmail(email, fullName) {
  const RESEND_API_KEY = 'YOUR_RESEND_API_KEY';
  
  const payload = {
    from: 'People\'s Culture <noreply@yourdomain.com>',
    to: email,
    subject: 'ยืนยันการลงทะเบียน - เวทีเสวนาอุตสาหกรรมเกมไทย',
    html: `
      <h2>สวัสดีคุณ ${fullName}</h2>
      <p>ขอบคุณที่ลงทะเบียนเข้าร่วมงาน!</p>
      <p><strong>รายละเอียดงาน:</strong></p>
      <ul>
        <li>วันที่: วันเสาร์ที่ 18 กรกฎาคม 2569</li>
        <li>เวลา: 13.00 - 17.00 น.</li>
        <li>สถานที่: Glowfish สาทร</li>
      </ul>
      <p>เราหวังว่าจะได้พบคุณในงาน!</p>
    `
  };
  
  const options = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + RESEND_API_KEY,
      'Content-Type': 'application/json'
    },
    payload: JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch('https://api.resend.com/emails', options);
}
```

Then call this function in your `doPost` handler after adding the row to the sheet:

```javascript
// Send confirmation email
sendConfirmationEmail(data.email, data.fullName);
```

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure your Apps Script is deployed with "Anyone" access.

### Data Not Saving
1. Check the Apps Script logs: **Executions** tab in Apps Script editor
2. Verify the sheet name and column structure match
3. Test with Postman or curl first before the web form

### Email Not Sending
1. Verify your Resend API key is correct
2. Check that the "from" domain is verified in Resend
3. Look at the Apps Script execution logs for error messages

## Security Notes

- The Google Apps Script URL is public but only accepts POST requests
- Consider adding rate limiting or validation in Apps Script
- For production, implement proper email verification
- Store API keys securely (use Apps Script Properties Service for sensitive data)

## Support

For issues or questions, please contact the technical team or refer to:
- [Google Apps Script Documentation](https://developers.google.com/apps-script)
- [Resend Documentation](https://resend.com/docs)
