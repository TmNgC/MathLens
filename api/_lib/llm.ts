/**
 * Shared OpenAI-compatible LLM client for the serverless functions.
 *
 * Env vars:
 *   LLM_API_KEY  (required — otherwise endpoints return 501)
 *   LLM_BASE_URL (default https://api.openai.com/v1 — works with any
 *                 OpenAI-compatible endpoint: GLM, Groq, Together, ...)
 *   LLM_MODEL    (default gpt-4o-mini)
 */

export interface LLMConfig {
  baseUrl: string
  apiKey: string
  model: string
}

export function llmConfig(): LLMConfig | null {
  const apiKey = process.env.LLM_API_KEY
  if (!apiKey) return null
  return {
    apiKey,
    baseUrl: (process.env.LLM_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, ''),
    model: process.env.LLM_MODEL || 'gpt-4o-mini',
  }
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

/** chat completion → parsed JSON object (handles ```json fences defensively) */
export async function chatJSON(
  cfg: LLMConfig,
  messages: ChatMessage[],
  opts: { temperature?: number; maxTokens?: number } = {},
): Promise<Record<string, unknown>> {
  const res = await fetch(`${cfg.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cfg.apiKey}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      messages,
      temperature: opts.temperature ?? 0.8,
      max_tokens: opts.maxTokens ?? 4000,
      response_format: { type: 'json_object' },
    }),
  })
  if (!res.ok) {
    throw new Error(`LLM HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`)
  }
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const text = data.choices?.[0]?.message?.content ?? ''
  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    // some endpoints ignore response_format and wrap JSON in fences
    const m = text.match(/\{[\s\S]*\}/)
    if (m) return JSON.parse(m[0]) as Record<string, unknown>
    throw new Error('LLM did not return JSON')
  }
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  })
}
