'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { IntentId } from '@/content/ecosystem';

const STORAGE_KEY = 'qf-home-intent';
const INTENT_QUERY = 'intent';
const VALID_INTENTS: readonly IntentId[] = [
  'time',
  'money',
  'order',
  'calm',
  'efficiency',
];

interface HomeIntentContextValue {
  activeIntent: IntentId | null;
  setActiveIntent: (intent: IntentId | null) => void;
  isFiltering: boolean;
}

const HomeIntentContext = createContext<HomeIntentContextValue | null>(null);

export function parseIntentParam(raw: string | null | undefined): IntentId | null {
  if (!raw) {
    return null;
  }
  return VALID_INTENTS.includes(raw as IntentId) ? (raw as IntentId) : null;
}

function readStoredIntent(): IntentId | null {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    return parseIntentParam(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

function writeStoredIntent(intent: IntentId | null) {
  try {
    if (intent) {
      sessionStorage.setItem(STORAGE_KEY, intent);
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    /* storage unavailable */
  }
}

export function HomeIntentProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeIntent, setActiveIntentState] = useState<IntentId | null>(() => {
    // Lazy initialization - read from URL first, then storage
    const fromUrl = parseIntentParam(searchParams.get(INTENT_QUERY));
    if (fromUrl) return fromUrl;
    return readStoredIntent();
  });
  const [ready] = useState(() => {
    // Lazy init: we're ready if there's initial data
    if (typeof window === 'undefined') return false;
    return parseIntentParam(searchParams.get(INTENT_QUERY)) || readStoredIntent() ? true : false;
  });

  const replaceIntentQuery = useCallback(
    (intent: IntentId | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (intent) {
        params.set(INTENT_QUERY, intent);
      } else {
        params.delete(INTENT_QUERY);
      }
      const query = params.toString();
      const next = query ? `${pathname}?${query}` : pathname;
      const current = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
      if (next !== current) {
        router.replace(next, { scroll: false });
      }
    },
    [pathname, router, searchParams]
  );

  // Sync storage/URL on mount (no setState - ready comes from lazy init)
  useEffect(() => {
    const fromUrl = parseIntentParam(searchParams.get(INTENT_QUERY));
    const fromStore = readStoredIntent();
    const initial = fromUrl ?? fromStore;
    
    // Write to storage and URL if needed
    writeStoredIntent(initial);
    if (initial && !fromUrl) {
      replaceIntentQuery(initial);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount hydrate only
  }, []);

  const setActiveIntent = useCallback(
    (intent: IntentId | null) => {
      setActiveIntentState(intent);
      writeStoredIntent(intent);
      replaceIntentQuery(intent);
    },
    [replaceIntentQuery]
  );

  const value = useMemo(
    () => ({
      activeIntent: ready ? activeIntent : parseIntentParam(searchParams.get(INTENT_QUERY)),
      setActiveIntent,
      isFiltering:
        (ready ? activeIntent : parseIntentParam(searchParams.get(INTENT_QUERY))) !== null,
    }),
    [activeIntent, setActiveIntent, ready, searchParams]
  );

  return <HomeIntentContext.Provider value={value}>{children}</HomeIntentContext.Provider>;
}

const defaultIntentValue: HomeIntentContextValue = {
  activeIntent: null,
  setActiveIntent: () => {},
  isFiltering: false,
};

export function useHomeIntent(): HomeIntentContextValue {
  const ctx = useContext(HomeIntentContext);
  return ctx ?? defaultIntentValue;
}

export function matchesHomeIntent(
  intents: readonly IntentId[],
  activeIntent: IntentId | null
): boolean {
  if (!activeIntent) {
    return true;
  }
  return intents.includes(activeIntent);
}
