import Prompt from "@/models/prompt";
import { connectToDb } from "@/utils/database";

export async function GET(req, { params }) {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate('creator');

    if (!prompt) return new Response(JSON.stringify({
      message: 'Prompt not found'
    }), { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({
      message: 'Error: unexpected error has occurred',
    }), { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  const { prompt, tag } = await req.json();

  try {
    await connectToDb();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) return new Response(JSON.stringify({
      message: 'Prompt not found'
    }), { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({
      message: 'Error: unexpected error has occurred',
    }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDb();

    await Prompt.findByIdAndDelete(params.id);

    return new Response(JSON.stringify({
      message: 'Deleted successfully'
    }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({
      message: 'Error: unexpected error has occurred',
    }), { status: 500 });
  }
}