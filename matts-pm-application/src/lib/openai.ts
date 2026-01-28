import OpenAI from "openai";

export function getOpenAiClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY.");
  }
  return new OpenAI({ apiKey });
}

export function getOpenAiModel() {
  return process.env.OPENAI_MODEL || "gpt-4o-mini";
}
