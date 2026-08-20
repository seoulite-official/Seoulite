/** Build a public URL for a stored cover, publication, or article image. */
export function mediaUrl(key?: string | null, folder?: string): string | null {
  if (!key) return null;
  if (key.startsWith("http://") || key.startsWith("https://") || key.startsWith("/")) {
    return key;
  }
  if (folder) {
    return `/uploads/${folder}/${key}`;
  }
  return `/uploads/${key}`;
}

export function coverUrl(key?: string | null): string | null {
  if (!key) return null;
  if (key.startsWith("http://") || key.startsWith("https://") || key.startsWith("/")) {
    return key;
  }
  if (key.startsWith("issues/")) {
    return `/${key}`;
  }
  return `/uploads/covers/${key}`;
}

export function publicationUrl(key?: string | null): string | null {
  if (!key) return null;
  if (key.startsWith("http://") || key.startsWith("https://") || key.startsWith("/")) {
    return key;
  }
  return `/uploads/publications/${key}`;
}

export function articleImageUrl(key?: string | null): string | null {
  if (!key) return null;
  if (key.startsWith("http://") || key.startsWith("https://") || key.startsWith("/")) {
    return key;
  }
  return `/${key}`;
}

export function formatDisplayDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
