//This file defines your supported languages and default language for the whole app. It's essential for middleware, navigation, and request config.

import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // 🗣️ Supported locales in your app
  locales: ["en", "ar"],

  // 🌐 Default fallback locale
  defaultLocale: "en",
  localeDetection: true,
});
