import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const model = openai("gpt-4o-mini");

const systemPrompt = `You are a helpful fitness and health assistant.
You help users with workout plans, nutrition advice, progress tracking, and general health questions.
Keep responses concise, friendly, and actionable.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(request: Request) {
  try {
    const { messages } = (await request.json()) as { messages: ChatMessage[] };

    const modelMessages = messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }));

    const result = streamText({
      model,
      system: systemPrompt,
      messages: modelMessages,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
