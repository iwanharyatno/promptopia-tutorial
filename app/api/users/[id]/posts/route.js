import Prompt from "@/models/prompt";
import { connectToDb } from "@/utils/database";

export async function GET(req, { params }) {
  try {
    await connectToDb();
    const posts = await Prompt.find({
      creator: params.id
    }).populate('creator');

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({
      message: 'Error: unexpected error has occurred',
    }), { status: 500 });
  }
}