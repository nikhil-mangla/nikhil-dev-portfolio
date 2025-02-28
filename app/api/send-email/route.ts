import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();
    
    // Validate inputs
    if (!name || !email || !message) {
      return Response.json({ 
        error: 'Name, email, and message are required' 
      }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev', // Use Resend's default sender
      to: ['nikhilmangla2305@gmail.com'],
      replyTo: email, // Add reply-to so you can easily respond
      subject: `New Contact Form Message from ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #6366f1;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <p style="color: #888; font-size: 12px; margin-top: 30px;">This message was sent from your website contact form.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend API error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ 
      success: true,
      message: 'Email sent successfully!',
      data
    });

  } catch (error) {
    console.error('Server error:', error);
    return Response.json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}