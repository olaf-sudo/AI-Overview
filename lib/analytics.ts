type Payload = Record<string, string | number | boolean>;

/**
 * Aanbevolen events uit de handoff. Nu alleen een dunne laag rond
 * `window.dataLayer`, zodat er later een echte analytics-tool onder kan.
 */
export type AnalyticsEvent = "plan_cta_clicked" | "speed_toggled" | "expert_cta_clicked";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  // TODO: koppel hier de echte analytics (bijv. GA4, Plausible of PostHog).
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...payload });
}
