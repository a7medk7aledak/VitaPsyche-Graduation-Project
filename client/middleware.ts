// Ensures any request to / will redirect to /en/ or /ar/ based on browser language or defaultLocale.
// Filters out paths you don’t want middleware to affect (like /api, /favicon.ico, etc.).

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - _next, _vercel internals
  // - static files (e.g. favicon.ico)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
