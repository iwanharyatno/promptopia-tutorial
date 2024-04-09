import Prompt from "@/models/prompt";
import { connectToDb } from "@/utils/database";

export async function POST(req) {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDb();

    const newPrompt = new Prompt({
      creator: userId,
      tag, prompt
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      message: 'Error: Unexpected error occurred',
    }), { status: 500 });
  }
}

export async function GET(req) {
  const query = req.nextUrl.searchParams.get('q') || '';
  console.log(query);
  try {
    await connectToDb();
    const posts = await Prompt
      .find({
        $or: [
          {
            tag: {
              $regex: query,
              $options: 'i'
            }
          },
          {
            prompt: {
              $regex: query,
              $options: 'i'
            }
          },
          {
            'creator.username': {
              $regex: query,
              $options: 'i'
            }
          }
        ]
      }).populate('creator');

    console.log('posts count', posts.length);

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({
      message: 'Error: unexpected error has occurred',
    }), { status: 500 });
  }
}