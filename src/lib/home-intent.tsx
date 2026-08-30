'use client';

import { createContext, useContext } from 'react';
import type { IntentId } from '@/content/ecosystem';

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

const defaultIntentValue: HomeIntentContextValue = {
  activeIntent: null,
  setActiveIntent: () => {},
  isFiltering: false,
};

export function useHomeIntent(): HomeIntentContextValue {
  const ctx = useContext(HomeIntentContext);
  return ctx ?? defaultIntentValue;
}
