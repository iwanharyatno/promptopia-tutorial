import User from "@/models/user";
import { connectToDb } from "@/utils/database";

export async function GET(req, { params }) {
  try {
    await connectToDb();
    const user = await User.findById(params.id);

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({
      message: 'Error: unexpected error has occurred',
    }), { status: 500 });
  }
}