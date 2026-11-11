const WINDOW_MS = 10_000

/**
 * After a deploy, a cached page, JS chunk or `.data` response can be from a different build than
 * the code running it. One full document load brings HTML and loader data from the same build, so
 * the error boundary reloads once per URL. A repeat within the window is a real bug: show it.
 */
export function reloadOnce(key: string, now = Date.now()): boolean {
  try {
    const storageKey = `reload-once:${key}`
    const last = Number(window.sessionStorage.getItem(storageKey))
    if (last && now - last < WINDOW_MS) return false
    window.sessionStorage.setItem(storageKey, String(now))
    return true
  } catch {
    // No storage means no loop guard, so never reload.
    return false
  }
}
