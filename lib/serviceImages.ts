// Local assets avoid third-party image availability and tracking dependencies.
export const SERVICE_IMAGES: Record<string, string> = Object.fromEntries(
  ['pool', 'hvac', 'pest', 'plumbing', 'lighting', 'landscape', 'hardscape']
    .map(key => [key, `/images/services/${key}.webp`])
);
