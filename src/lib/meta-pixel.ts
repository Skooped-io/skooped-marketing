// Thin wrapper around the Meta pixel's fbq API.
// The base snippet lives in index.html (dataset "Skooped Web", 1029184846690567);
// this just types and guards the call so a blocked pixel can never break the UI.
type PixelProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    fbq?: (
      command: string,
      event: string,
      params?: PixelProps
    ) => void;
  }
}

/** Fire a standard Meta pixel event (no-op if the script is blocked or absent). */
export function pixel(event: string, params?: PixelProps): void {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", event, params);
  } catch {
    /* measurement must never break the UI */
  }
}
