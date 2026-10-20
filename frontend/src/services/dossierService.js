/**
 * Dossier Service
 * Handles fetching the lightweight manifest and lazy-loading individual experiment dossiers.
 */

let cachedManifest = null;
const cachedDossiers = new Map();

/**
 * Fetch the 16-experiment Journey manifest
 * @returns {Promise<Array<object>>}
 */
export async function getManifest() {
  if (cachedManifest) {
    return cachedManifest;
  }
  try {
    const res = await fetch('/data/manifest.json');
    if (!res.ok) throw new Error(`Failed to load manifest: ${res.status}`);
    const data = await res.json();
    cachedManifest = data;
    return data;
  } catch (err) {
    console.error('Error fetching manifest:', err);
    return [];
  }
}

/**
 * Fetch a specific experiment dossier by ID ("01" - "16")
 * @param {string} expId 
 * @returns {Promise<object|null>}
 */
export async function getDossier(expId) {
  if (cachedDossiers.has(expId)) {
    return cachedDossiers.get(expId);
  }
  try {
    const res = await fetch(`/data/dossiers/exp${expId}.json`);
    if (!res.ok) throw new Error(`Failed to load dossier exp${expId}: ${res.status}`);
    const data = await res.json();
    cachedDossiers.set(expId, data);
    return data;
  } catch (err) {
    console.error(`Error fetching dossier ${expId}:`, err);
    return null;
  }
}
