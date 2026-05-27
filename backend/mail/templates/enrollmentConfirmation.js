const enrollmentConfirmationEmail = (studentName, courseName, courseThumb) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <style>
        body { margin: 0; padding: 0; background: #0f1117; font-family: Arial, sans-serif; color: #e2e8f0; }
        .wrapper { max-width: 600px; margin: 40px auto; background: #161d29; border-radius: 12px; overflow: hidden; }
        .header { background: #ffd60a; padding: 32px; text-align: center; }
        .header h1 { margin: 0; color: #161d29; font-size: 28px; font-weight: 800; letter-spacing: 1px; }
        .body { padding: 32px; }
        .body h2 { color: #ffd60a; font-size: 20px; margin-top: 0; }
        .thumb { width: 100%; border-radius: 8px; margin: 20px 0; }
        .highlight { background: #1e2a3a; border-left: 4px solid #ffd60a; padding: 16px; border-radius: 4px; margin: 24px 0; }
        .cta { display: block; text-align: center; background: #ffd60a; color: #161d29; font-weight: 700;
               padding: 14px 32px; border-radius: 8px; text-decoration: none; margin: 24px auto; width: fit-content; }
        .footer { background: #0f1117; text-align: center; padding: 20px; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="header"><h1>StudyNotion</h1></div>
        <div class="body">
          <h2>You're enrolled! 🎉</h2>
          <p>Hi <strong>${studentName}</strong>,</p>
          <p>Congratulations! You have successfully enrolled in:</p>
          <div class="highlight">
            <strong style="font-size:18px; color:#ffd60a;">${courseName}</strong>
          </div>
          ${courseThumb ? `<img src="${courseThumb}" alt="Course Thumbnail" class="thumb" />` : ""}
          <p>You can start learning right away. Click below to go to your course:</p>
          <a href="${process.env.FRONTEND_URL}/dashboard/enrolled-courses" class="cta">
            Start Learning →
          </a>
          <p style="color:#94a3b8; font-size:13px;">
            If you have any questions, reply to this email and we'll be happy to help.
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
  
  module.exports = enrollmentConfirmationEmail