// API Client for AI Lab FastAPI Backend
// Connects to GET /health and POST /predict

export const API_BASE_URL = 'http://127.0.0.1:8000';

/**
 * Check backend health and model status
 * @returns {Promise<{ ok: boolean, model?: string, error?: string }>}
 */
export async function checkHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const res = await fetch(`${API_BASE_URL}/health`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }
    const data = await res.json();
    return { ok: data.status === 'ok', model: data.model || 'cnn_mnist' };
  } catch (err) {
    return { ok: false, error: err.name === 'AbortError' ? 'Timeout' : 'Unreachable' };
  }
}

/**
 * Submit canvas image blob for digit prediction
 * @param {Blob} imageBlob 
 * @returns {Promise<{ digit: number, confidence: number, probabilities: Record<string, number> }>}
 */
export async function predictDigit(imageBlob) {
  if (!imageBlob) {
    throw new Error('No image blob provided.');
  }

  const formData = new FormData();
  formData.append('file', imageBlob, 'canvas_digit.png');

  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Server returned error: HTTP ${res.status}`);
  }

  return await res.json();
}
