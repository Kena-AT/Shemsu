import ReactGA from "react-ga4";

export const initGA = () => {
  try {
    const measurementId = import.meta.env.VITE_GA_ID;
    if (measurementId) {
      ReactGA.initialize(measurementId);
    }
  } catch (e) {
    console.warn("GA4 init error:", e);
  }
};

export const trackPageView = (path) => {
  try {
    ReactGA.send({ hitType: "pageview", page: path || window.location.pathname });
  } catch (e) {
    console.debug("GA4 tracking error:", e);
  }
};

export const trackEvent = (category, action, label, value) => {
  try {
    ReactGA.event({
      category,
      action,
      label,
      value
    });
  } catch (e) {
    console.debug("GA4 event error:", e);
  }
};
