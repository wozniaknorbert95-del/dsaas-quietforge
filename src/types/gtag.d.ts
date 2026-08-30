export {};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: 'config' | 'consent' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, string | number | boolean | undefined>
    ) => void;
  }
}
