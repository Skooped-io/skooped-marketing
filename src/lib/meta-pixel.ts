// Thin wrapper around the Meta pixel's fbq API.
// The base snippet lives in index.html (dataset "Skooped Web", 1029184846690567);
// this just types and guards the call so a blocked pixel can never break the UI.
type PixelProps = Record<string, string | number | boolean>;

/** Meta's per-event options. eventID lets a refresh (or a later server event) dedupe. */
type PixelOptions = { eventID?: string };

declare global {
  interface Window {
    fbq?: (
      command: string,
      event: string,
      params?: PixelProps,
      options?: PixelOptions
    ) => void;
  }
}

/** Fire a standard Meta pixel event (no-op if the script is blocked or absent). */
export function pixel(event: string, params?: PixelProps, options?: PixelOptions): void {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("track", event, params, options);
  } catch {
    /* measurement must never break the UI */
  }
}
