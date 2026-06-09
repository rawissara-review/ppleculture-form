export const config = { runtime: 'edge' };

const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbyPccAoD15DogfXH9WrABUiEiAEOLXpU2BJS4YWSinpK91_tewH05HrQthen3qXwjBPqw/exec';

export default async function handler(req: Request) {
  // GET — return real-time seat availability from Google Sheet
  if (req.method === 'GET') {
    try {
      const res = await fetch(SCRIPT_URL);
      const data = await res.json();
      return Response.json(data);
    } catch (err) {
      return Response.json({ status: 'error', message: String(err) }, { status: 500 });
    }
  }

  // POST — forward registration data to Google Sheet
  if (req.method === 'POST') {
    try {
      const body = await req.json();
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      return Response.json(data);
    } catch (err) {
      return Response.json({ status: 'error', message: String(err) }, { status: 500 });
    }
  }

  return Response.json({ error: 'Method not allowed' }, { status: 405 });
}
