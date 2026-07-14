// Thin wrapper around Plausible's custom-event API.
// The script + queue stub live in index.html; this just types and guards the call.
type EventProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (
      event: string,
      options?: { props?: EventProps; callback?: () => void }
    ) => void;
  }
}

/** Fire a Plausible custom event (no-op if the script hasn't loaded / is blocked). */
export function track(event: string, props?: EventProps): void {
  if (typeof window === "undefined") return;
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    /* analytics must never break the UI */
  }
}
