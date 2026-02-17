import requestIp from "request-ip";
import geoip from "geoip-lite";

export function getSubscriberLocale(req) {
  const ip = requestIp.getClientIp(req);
  const geo = ip ? geoip.lookup(ip) : null;
  const country = geo?.country || null;

  // Rule: France => French, everywhere else => English
  if (country === "FR") {
    return { country: "FR", locale: "fr" };
  }

  // Fallback to browser language if GeoIP fails
  const acceptLanguage = String(
    req.headers["accept-language"] || "",
  ).toLowerCase();
  if (!country && acceptLanguage.startsWith("fr")) {
    return { country: null, locale: "fr" };
  }

  return { country, locale: "en" };
}
