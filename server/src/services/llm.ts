import { env } from './env';
import { splitToWordishTokens } from '../util/tokens';

export type StreamOpts = {
  system: string;
  user: string;
  onToken: (t: string) => void;
  onDone?: () => void;
  maxTokens?: number;
  temperature?: number;
};

export async function streamAnswer(opts: StreamOpts): Promise<void> {
  const { system, user, onToken, onDone } = opts;

  if (!env.OPENAI_API_KEY) {
    await mockStream(system, user, onToken, onDone);
    return;
  }

  // Provider-backed streaming (OpenAI-compatible)
  // Note: Kept minimal; swap to official SDK later if desired.
  const controller = new AbortController();
  const url = 'https://api.openai.com/v1/chat/completions';
  const body = {
    model: env.MODEL_NAME,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    stream: true,
    max_tokens: opts.maxTokens ?? 256,
    temperature: opts.temperature ?? 0.7,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
    signal: controller.signal,
  });

  if (!res.ok || !res.body) {
    const text = await safeText(res);
    throw new Error(`LLM request failed: ${res.status} ${text}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let carry = '';
  let done = false;
  try {
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (readerDone) break;
      const chunk = decoder.decode(value, { stream: true });
      // Parse server-sent events format: lines starting with 'data: '
      for (const line of chunk.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === '[DONE]') {
          // Flush any remaining carry as tokens
          if (carry) {
            const toks = splitToWordishTokens(carry);
            toks.forEach(onToken);
            carry = '';
          }
          done = true;
          break;
        }
        try {
          const json = JSON.parse(payload);
          const deltas = json.choices?.[0]?.delta?.content ?? '';
          if (typeof deltas === 'string' && deltas.length > 0) {
              carry += deltas;
              // If we have at least one space, flush complete words
              if (carry.includes(' ')) {
                const lastSpace = carry.lastIndexOf(' ');
                const complete = carry.slice(0, lastSpace + 1);
                const remain = carry.slice(lastSpace + 1);
                const toks = splitToWordishTokens(complete);
                toks.forEach(onToken);
                carry = remain;
              }
          }
        } catch {
          // ignore malformed lines
        }
      }
    }
  } catch (err) {
    controller.abort();
    throw err;
  } finally {
    // Final flush just in case
    if (carry) {
      const toks = splitToWordishTokens(carry);
      toks.forEach(onToken);
      carry = '';
    }
    onDone && onDone();
  }
}

async function mockStream(system: string, user: string, onToken: (t: string) => void, onDone?: () => void) {
  const text = mockAnswer(system, user);
  const tokens = tokenizeWords(text);
  for (let i = 0; i < tokens.length; i++) {
    await delay(60);
    onToken(tokens[i] + (i < tokens.length - 1 ? ' ' : ''));
  }
  onDone && onDone();
}

function mockAnswer(system: string, user: string): string {
  const summary = user.trim().slice(0, 120);
  return `Here is a quick thought: focus on central control, king safety, and improving your worst-placed piece. Related: ${summary}`;
}

function tokenizeWords(text: string): string[] {
  return text.split(/\s+/).filter(Boolean);
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return '';
  }
}


