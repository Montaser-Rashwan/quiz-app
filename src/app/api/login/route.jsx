

export const studentLogins = global.studentLogins ?? [];

if (!global.studentLogins) {
  global.studentLogins = [];
}

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(
        JSON.stringify({ error: 'Invalid email.' }),
        { status: 400 }
      );
    }

    const exists = global.studentLogins.find(e => e.email === email);
    if (!exists) {
      global.studentLogins.push({
        email,
        firstLogin: new Date().toISOString(),
      });
    }

    return new Response(
      JSON.stringify({ success: true, total: global.studentLogins.length }),
      { status: 200 }
    );
  } catch (err) {
    console.error('API Error:', err);
    return new Response(
      JSON.stringify({ error: 'Server error' }),
      { status: 500 }
    );
  }
}