
export async function GET() {
  const logins = globalThis.studentLogins || [];
  return new Response(
    JSON.stringify({ logins }),
    { status: 200 }
  );
}