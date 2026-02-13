import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields required' },
        { status: 400 }
      );
    }

    // TODO: Später Captcha hinzufügen (Google reCAPTCHA v3)
    // TODO: Email versenden via SendGrid/Resend/Mailgun

    // Für jetzt: Log to console (später Email senden)
    console.log('📧 Contact Form Submission:', {
      name,
      email,
      message,
      timestamp: new Date().toISOString()
    });

    // SUCCESS (später: nach Email-Versand)
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
