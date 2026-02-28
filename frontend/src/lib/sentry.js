import * as Sentry from "@sentry/react";

export const initSentry = () => {
  try {
    const dsn = import.meta.env.VITE_SENTRY_DSN;
    if (dsn) {
      Sentry.init({
        dsn,
        integrations: [
          Sentry.browserTracingIntegration(),
        ],
        tracesSampleRate: 1.0,
        environment: import.meta.env.MODE,
      });
    }
  } catch (e) {
    console.warn("Sentry init error:", e);
  }
};
