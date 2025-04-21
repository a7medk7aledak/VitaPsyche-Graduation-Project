//This file gives you a localized version of navigation helpers like Link, redirect, and usePathname that are aware of your locale.

// This will let you use <Link /> in a locale-aware way. For example:
// <Link href="/about">About</Link>
// Will resolve to:
//     /en/about if the current locale is English
//     /ar/about if the current locale is Arabic

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// 🌍 These wrappers automatically handle the locale part of the URL
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
