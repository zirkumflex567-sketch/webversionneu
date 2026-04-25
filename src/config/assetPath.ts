export function assetPath(path: string): string {
  let basePath = "";
  if (typeof window !== "undefined") {
    // Derive base path from loaded Next.js assets, e.g. "/combat/_next/static/..."
    const nextScript = document.querySelector('script[src*="/_next/"]') as HTMLScriptElement | null;
    const src = nextScript?.getAttribute("src") ?? "";
    const idx = src.indexOf("/_next/");
    if (idx > 0) {
      basePath = src.slice(0, idx);
    }
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
