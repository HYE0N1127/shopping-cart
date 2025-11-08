export class LocalStorage {
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  get(key, fallback) {
    const stored = window.localStorage.getItem(key);

    try {
      return JSON.parse(stored) ?? fallback;
    } catch {
      return fallback;
    }
  }
}
