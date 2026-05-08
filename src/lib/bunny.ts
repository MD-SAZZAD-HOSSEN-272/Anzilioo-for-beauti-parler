const defaultCdnHost = "https://anzilioo-demo.b-cdn.net";

export function bunnyUrl(pathname: string) {
  const host = process.env.NEXT_PUBLIC_BUNNY_CDN_HOST || defaultCdnHost;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${host}${path}`;
}

