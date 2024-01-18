import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sql } from "@vercel/postgres";
import * as z from "zod";

const statusCreateSchema = z.object({
  time: z.string(),
  flexibility: z.string(),
  relativeFlexibility: z.coerce.string(),
  duration: z.string(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 403 });
    }

    const { user } = session;
    const json = await req.json();
    const body = statusCreateSchema.parse(json);

    await sql`DELETE FROM status WHERE User_id=${user.id}`;
    const { rows } = await sql`INSERT INTO status (User_id, Time_value, Flexibility, Rel_Flexability, Duration) VALUES (${user.id}, ${body.time}, ${body.flexibility}, ${body.relativeFlexibility}, ${body.duration})`;

    return new Response(JSON.stringify(rows));
  } catch (error) {
    console.log(`Errors: ${error}`);
    return new Response(null, { status: 500 });
  }
}
