const ABSOLUTE_URL_RE = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//;

export function withBase(path?: string) {
  if (!path) return "";
  if (ABSOLUTE_URL_RE.test(path)) return path;

  const base = import.meta.env.BASE_URL || "/";
  return `${base}${path.replace(/^\/+/, "")}`;
}

export function isLocalImage(path?: string) {
  if (!path) return false;
  if (ABSOLUTE_URL_RE.test(path)) return true;

  return (
    path.startsWith("/images/") ||
    path.startsWith("/images/resume/") ||
    /\.(png|jpe?g|webp|gif|avif|svg)$/i.test(path)
  );
}
