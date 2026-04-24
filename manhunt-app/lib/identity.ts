const identityStorageKey = "manhunt.identity";

export type StoredIdentity = {
  key: string;
};

function createIdentityKey() {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && "randomUUID" in cryptoApi) {
    return cryptoApi.randomUUID();
  }

  return `mh-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
}

export function readStoredIdentity(): StoredIdentity | null {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }

  const rawValue = window.localStorage.getItem(identityStorageKey);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue) as StoredIdentity;
    if (typeof parsed.key === "string" && parsed.key.length > 0) {
      return parsed;
    }
  } catch {
    window.localStorage.removeItem(identityStorageKey);
  }

  return null;
}

export function getOrCreateStoredIdentity() {
  const existingIdentity = readStoredIdentity();
  if (existingIdentity) {
    return existingIdentity;
  }

  const identity = { key: createIdentityKey() };

  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(identityStorageKey, JSON.stringify(identity));
  }

  return identity;
}