const nodemailer = require('nodemailer');

const createTransporter = () => {
  console.log('📧 Creating transporter with:', {
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    user: process.env.EMAIL_USER,
    passLength: process.env.EMAIL_PASS?.length || 0,
  });

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    debug: true,
    logger: true,
  });
};

const sendContactEmail = async (contactData) => {
  const { name, email, message } = contactData;
  
  const transporter = createTransporter();
  
  // Email to you
  const mailOptionsToYou = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `New Contact Form Message from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #6366f1; margin-bottom: 20px;">New Contact Form Submission</h2>
        <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${name}</p>
          <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 0;"><strong>Message:</strong></p>
          <p style="margin: 10px 0; padding: 15px; background: white; border-left: 4px solid #6366f1; border-radius: 4px;">${message}</p>
        </div>
        <p style="color: #666; font-size: 14px; margin-top: 20px;">
          This message was sent from your portfolio contact form.
        </p>
      </div>
    `,
  };
  
  // Confirmation email to the sender
  const mailOptionsToSender = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Thank you for contacting me - Janani K',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #6366f1; margin-bottom: 20px;">Thank you for reaching out!</h2>
        <p style="margin-bottom: 20px;">Hi ${name},</p>
        <p style="margin-bottom: 20px;">
          Thank you for contacting me through my portfolio. I've received your message and will get back to you as soon as possible.
        </p>
        <div style="background: #f8f9ff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="margin: 0;"><strong>Your message:</strong></p>
          <p style="margin: 10px 0; padding: 15px; background: white; border-left: 4px solid #6366f1; border-radius: 4px;">${message}</p>
        </div>
        <p style="margin-bottom: 20px;">Best regards,</p>
        <p style="margin: 0;"><strong>Janani K</strong></p>
        <p style="margin: 5px 0; color: #666;">AI/ML Developer & Full Stack Engineer</p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 14px;">
            <a href="https://github.com/JANANIKALEESWARAN" style="color: #6366f1; text-decoration: none;">GitHub</a> | 
            <a href="https://www.linkedin.com/in/janani-k-682693291/" style="color: #6366f1; text-decoration: none;">LinkedIn</a> | 
            <a href="mailto:janani6002@gmail.com" style="color: #6366f1; text-decoration: none;">Email</a>
          </p>
        </div>
      </div>
    `,
  };
  
  try {
    console.log('📤 Sending email to:', process.env.EMAIL_TO);
    
    // Verify transporter first
    await transporter.verify();
    console.log('✅ Transporter verified');
    
    // Send email to you
    const info1 = await transporter.sendMail(mailOptionsToYou);
    console.log('✅ Email sent to portfolio owner:', info1.messageId);
    
    // Send confirmation email to sender
    const info2 = await transporter.sendMail(mailOptionsToSender);
    console.log('✅ Confirmation email sent to sender:', info2.messageId);
    
    return { success: true };
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('Stack:', error.stack);
    return { success: false, error: error.message };
  }
};

module.exports = { sendContactEmail };
