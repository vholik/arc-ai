import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = openai("gpt-4o");

const systemPrompt = `You are a helpful fitness and health assistant.
You help users with workout plans, nutrition advice, progress tracking, and general health questions.
Keep responses concise, friendly, and actionable.`;



export async function POST(req: Request) {
    const { messages }: { messages: UIMessage[] } = await req.json();


    const result = streamText({
      model,
      system: systemPrompt,
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'none',
      }}
    );

}
