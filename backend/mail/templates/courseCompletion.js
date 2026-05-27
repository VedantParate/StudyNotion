const courseCompletionEmail = (studentName, courseName) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { margin: 0; padding: 0; background: #0f1117; font-family: Arial, sans-serif; color: #e2e8f0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #161d29; border-radius: 12px; overflow: hidden; }
        .header { background: #ffd60a; padding: 32px; text-align: center; }
        .header h1 { margin: 0; color: #161d29; font-size: 28px; font-weight: 800; }
        .body { padding: 32px; text-align: center; }
        .badge { font-size: 72px; margin: 16px 0; }
        .body h2 { color: #ffd60a; font-size: 22px; }
        .highlight { background: #1e2a3a; border-left: 4px solid #ffd60a; padding: 16px;
                     border-radius: 4px; margin: 24px 0; text-align: left; }
        .cta { display: block; text-align: center; background: #ffd60a; color: #161d29; font-weight: 700;
               padding: 14px 32px; border-radius: 8px; text-decoration: none; margin: 24px auto; width: fit-content; }
        .footer { background: #0f1117; text-align: center; padding: 20px; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header"><h1>StudyNotion</h1></div>
        <div class="body">
          <div class="badge">🏆</div>
          <h2>Course Completed!</h2>
          <p>Hi <strong>${studentName}</strong>, you did it!</p>
          <div class="highlight">
            <p style="margin:0;">You have successfully completed:</p>
            <p style="margin:8px 0 0; font-size:18px; color:#ffd60a; font-weight:700;">${courseName}</p>
          </div>
          <p>Your certificate is now available to download from your enrolled courses page.</p>
          <a href="${process.env.FRONTEND_URL}/dashboard/enrolled-courses" class="cta">
            Download Certificate →
          </a>
          <p style="color:#94a3b8; font-size:13px; margin-top:24px;">
            Keep learning and growing with StudyNotion!
          </p>
        </div>
        <div class="footer">
          © ${new Date().getFullYear()} StudyNotion. All rights reserved.
        </div>
      </div>
    </body>
    </html>
    `
  }
  
  module.exports = courseCompletionEmail