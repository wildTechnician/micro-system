import Cookies from 'js-cookie';

import type { CookieAttributes, CookiesStatic } from 'js-cookie';

export const useCookies = (cookieOptions?: CookieAttributes) => {
  Cookies.withAttributes(cookieOptions || {});

  return {
    get: (name: string) => Cookies.get(name),
    getAll: () => Cookies.get(),
    set: (...args: Parameters<CookiesStatic['set']>) => Cookies.set(...args),
    remove: (...args: Parameters<CookiesStatic['remove']>) => Cookies.remove(...args),
    removeAll: (options?: CookieAttributes) => {
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        Cookies.remove(cookieName, options || cookieOptions || {});
      });
    },
  };
};
