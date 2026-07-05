export const validateUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const normalizeUrl = (url: string): string => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};

export interface PageMetadata {
  title: string;
  description: string;
  favicon?: string;
}

export const fetchPageMetadata = async (url: string): Promise<PageMetadata> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');

    let title =
      doc
        .querySelector('meta[property="og:title"]')
        ?.getAttribute('content') ||
      doc.querySelector('title')?.textContent ||
      '';

    let description =
      doc
        .querySelector('meta[property="og:description"]')
        ?.getAttribute('content') ||
      doc
        .querySelector('meta[name="description"]')
        ?.getAttribute('content') ||
      '';

    const favicon = extractFavicon(url, doc);

    return {
      title: title.trim().slice(0, 200),
      description: description.trim().slice(0, 500),
      favicon,
    };
  } catch (error) {
    return {
      title: '',
      description: '',
    };
  }
};

const extractFavicon = (baseUrl: string, doc: Document): string | undefined => {
  try {
    const iconLink =
      doc.querySelector('link[rel="icon"]') ||
      doc.querySelector('link[rel="shortcut icon"]');

    if (iconLink) {
      const href = iconLink.getAttribute('href');
      if (href) {
        if (href.startsWith('data:')) return href;
        if (href.startsWith('http')) return href;
        const base = new URL(baseUrl);
        return new URL(href, base).toString();
      }
    }

    // Try default favicon location
    const url = new URL(baseUrl);
    return `${url.protocol}//${url.hostname}/favicon.ico`;
  } catch {
    return undefined;
  }
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const getColorVariant = (index: number): string => {
  const colors = [
    '#3B82F6', // blue
    '#EF4444', // red
    '#10B981', // green
    '#F59E0B', // amber
    '#8B5CF6', // purple
    '#EC4899', // pink
    '#06B6D4', // cyan
    '#14B8A6', // teal
  ];
  return colors[index % colors.length];
};

export const truncateString = (str: string, length: number): string => {
  return str.length > length ? `${str.substring(0, length)}...` : str;
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleDateString();
};
