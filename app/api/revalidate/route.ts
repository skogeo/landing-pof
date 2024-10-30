import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  // Simple token validation (replace with actual validation logic)
  const validToken = "your-valid-token"; // Replace with your actual token or validation logic

  if (!token || token !== validToken) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Parse the request body
  const body = await req.json();
  console.log(body);

  try {
    await revalidatePath(`/${body.entry.locale}/blog/${body.entry.id}`);
  } catch (err) {
    return new NextResponse('Error revalidating.', { status: 500 });
  }
}
