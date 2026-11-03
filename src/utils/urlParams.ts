import { ApologyData, DEFAULT_APOLOGY, ColorPalette } from '../types.ts';

export function parseApologyFromUrl(): ApologyData {
  if (typeof window === 'undefined') return DEFAULT_APOLOGY;

  try {
    const hash = window.location.hash.replace(/^#/, '');
    const search = window.location.search.replace(/^\?/, '');
    const params = new URLSearchParams(hash || search);

    if (params.has('data')) {
      const decoded = decodeURIComponent(atob(params.get('data')!));
      const parsed = JSON.parse(decoded);
      return { ...DEFAULT_APOLOGY, ...parsed };
    }

    if (params.has('to')) {
      return {
        recipient: params.get('to') || DEFAULT_APOLOGY.recipient,
        sender: params.get('from') || DEFAULT_APOLOGY.sender,
        whatHappened: params.get('happened') || DEFAULT_APOLOGY.whatHappened,
        impactAndResponsibility: params.get('impact') || DEFAULT_APOLOGY.impactAndResponsibility,
        whatDifferent: params.get('diff') || DEFAULT_APOLOGY.whatDifferent,
        sharedMemory: params.get('memory') || DEFAULT_APOLOGY.sharedMemory,
        closingLine: params.get('close') || DEFAULT_APOLOGY.closingLine,
        contactType: (params.get('ctype') as ApologyData['contactType']) || DEFAULT_APOLOGY.contactType,
        contactValue: params.get('cval') || DEFAULT_APOLOGY.contactValue,
        palette: (params.get('pal') as ColorPalette) || DEFAULT_APOLOGY.palette,
      };
    }
  } catch (err) {
    console.warn('Could not parse URL state, defaulting to standard note', err);
  }

  return DEFAULT_APOLOGY;
}

export function generateShareUrl(data: ApologyData): string {
  try {
    const jsonStr = JSON.stringify(data);
    const encoded = btoa(encodeURIComponent(jsonStr));
    const url = new URL(window.location.href);
    url.search = '';
    url.hash = `data=${encoded}`;
    return url.toString();
  } catch {
    const params = new URLSearchParams({
      to: data.recipient,
      from: data.sender,
      happened: data.whatHappened,
      impact: data.impactAndResponsibility,
      diff: data.whatDifferent,
      memory: data.sharedMemory,
      close: data.closingLine,
      ctype: data.contactType,
      cval: data.contactValue,
      pal: data.palette,
    });
    return `${window.location.origin}${window.location.pathname}#${params.toString()}`;
  }
}
