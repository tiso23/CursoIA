import type { IceSuggestion } from '../types';
import { normalizeIceScore } from '../../../shared/utils/iceScore';

type GeminiCandidate = {
  content?: {
    parts?: Array<{ text?: string }>;
  };
};

type GeminiResponse = {
  candidates?: GeminiCandidate[];
};

type SuggestIceScoreParams = {
  title: string;
  description: string;
  signal?: AbortSignal;
};

const DEFAULT_MODEL = 'gemini-2.5-flash';
const REQUEST_TIMEOUT_MS = 10000;

function suggestIceScoreLocally(title: string, description: string): IceSuggestion {
  const text = `${title} ${description}`.toLowerCase();
  const hasHighImpactWords = ['cliente', 'error', 'bug', 'bloqueo', 'urgente', 'mvp'].some((word) =>
    text.includes(word),
  );
  const hasUncertaintyWords = ['investigar', 'explorar', 'duda', 'desconocido', 'probar'].some(
    (word) => text.includes(word),
  );
  const hasComplexWords = ['integrar', 'migrar', 'arquitectura', 'api', 'sincronizar'].some((word) =>
    text.includes(word),
  );

  return {
    iceScore: normalizeIceScore({
      impact: hasHighImpactWords ? 8 : 6,
      confidence: hasUncertaintyWords ? 5 : 7,
      ease: hasComplexWords ? 4 : 7,
    }),
    reason: 'Sugerencia local de demo. Configura VITE_GEMINI_API_KEY para usar IA real.',
  };
}

function parseSuggestion(rawText: string): IceSuggestion {
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error('Invalid suggestion response');
  }

  const parsed = JSON.parse(jsonMatch[0]) as {
    impact?: unknown;
    confidence?: unknown;
    ease?: unknown;
    reason?: unknown;
  };

  if (
    typeof parsed.impact !== 'number' ||
    typeof parsed.confidence !== 'number' ||
    typeof parsed.ease !== 'number'
  ) {
    throw new Error('Invalid suggestion response');
  }

  return {
    iceScore: normalizeIceScore({
      impact: parsed.impact,
      confidence: parsed.confidence,
      ease: parsed.ease,
    }),
    reason:
      typeof parsed.reason === 'string' && parsed.reason.trim().length > 0
        ? parsed.reason.trim()
        : 'Sugerencia generada automaticamente.',
  };
}

export async function suggestIceScore({
  title,
  description,
  signal,
}: SuggestIceScoreParams): Promise<IceSuggestion> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const model = import.meta.env.VITE_GEMINI_MODEL || DEFAULT_MODEL;

  if (!apiKey) {
    return suggestIceScoreLocally(title, description);
  }

  const timeoutController = new AbortController();
  const timeoutId = window.setTimeout(() => timeoutController.abort(), REQUEST_TIMEOUT_MS);
  const handleAbort = () => timeoutController.abort();

  if (signal) {
    signal.addEventListener('abort', handleAbort, { once: true });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        signal: timeoutController.signal,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: [
                    'Devuelve solo JSON valido con impact, confidence, ease y reason.',
                    'Los tres valores numericos deben estar entre 1 y 10.',
                    `Titulo: ${title}`,
                    `Descripcion: ${description || 'Sin descripcion'}`,
                  ].join('\n'),
                },
              ],
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Suggestion request failed');
    }

    const data = (await response.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error('Empty suggestion response');
    }

    return parseSuggestion(text);
  } finally {
    window.clearTimeout(timeoutId);
    signal?.removeEventListener('abort', handleAbort);
  }
}
