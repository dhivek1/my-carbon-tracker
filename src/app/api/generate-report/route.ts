import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { entries } = await req.json();

  const prompt = `
You are a sustainability assistant. Based on the following carbon emission activities, generate a short summary and eco-friendly advice:

${entries.map((e: any, i: number) => `${i + 1}. ${e.activity} - ${e.amount} kg CO₂`).join("\n")}

Respond with a paragraph (max 150 words).
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 200,
  });

  return NextResponse.json({ report: completion.choices[0].message.content });
}
