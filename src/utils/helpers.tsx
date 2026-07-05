import type { ReactNode } from 'react';

declare global {
  var process: {
    env?: {
      NODE_ENV?: string;
    };
  } | undefined;
  interface Window {
    VITEST_WORKER_ID?: string;
  }
}

// Check if running in Vitest test environment
export const isTestEnv =
  (typeof process !== 'undefined' && process.env?.NODE_ENV === 'test') ||
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE === 'test') ||
  (typeof window !== 'undefined' && window.VITEST_WORKER_ID !== undefined);

// Helper to format part of speech values
export function formatPOS(pos: string): string {
  if (pos === 'noun') return 'n.';
  if (pos === 'verb') return 'v.';
  if (pos === 'adjective') return 'adj.';
  if (pos === 'adverb') return 'adv.';
  return pos;
}

// Helper to format difficulty to Aim milestones
export const getAimLabel = (difficulty: 'easy' | 'medium' | 'hard'): string => {
  if (difficulty === 'easy') return 'Aim 450+';
  if (difficulty === 'medium') return 'Aim 650+';
  return 'Aim 800+';
};

// Obfuscate target word inside text with a hidden separator to block simple automation scraping/crawling
export const obfuscateText = (text: string, searchWord: string, searchQuery: string): ReactNode => {
  if (!text || !searchWord || !searchQuery) return text;
  const escaped = searchWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) => {
        if (part.toLowerCase() === searchWord.toLowerCase()) {
          if (part.length > 1) {
            const mid = Math.floor(part.length / 2);
            return (
              <span key={index}>
                <span>{part.substring(0, mid)}</span>
                <span style={{ display: 'none' }}> </span>
                <span>{part.substring(mid)}</span>
              </span>
            );
          }
        }
        return part;
      })}
    </>
  );
};

export interface AccentTheme {
  bg: string;
  hoverBg: string;
  text: string;
  border: string;
  borderHover: string;
  lightBg: string;
  lightBorder: string;
  focusBorder: string;
}

export const getThemeAccent = (color: 'blue' | 'purple' | 'emerald' | 'amber'): AccentTheme => {
  const themes = {
    blue: {
      bg: 'bg-blue-600',
      hoverBg: 'hover:bg-blue-700',
      text: 'text-blue-455 text-blue-400',
      border: 'border-blue-500',
      borderHover: 'hover:border-blue-500/50',
      lightBg: 'bg-blue-500/10',
      lightBorder: 'border-blue-500/30',
      focusBorder: 'focus:border-blue-500'
    },
    purple: {
      bg: 'bg-purple-600',
      hoverBg: 'hover:bg-purple-700',
      text: 'text-purple-455 text-purple-400',
      border: 'border-purple-500',
      borderHover: 'hover:border-purple-500/50',
      lightBg: 'bg-purple-500/10',
      lightBorder: 'border-purple-500/30',
      focusBorder: 'focus:border-purple-500'
    },
    emerald: {
      bg: 'bg-emerald-600',
      hoverBg: 'hover:bg-emerald-700',
      text: 'text-emerald-455 text-emerald-400',
      border: 'border-emerald-500',
      borderHover: 'hover:border-emerald-500/50',
      lightBg: 'bg-emerald-500/10',
      lightBorder: 'border-emerald-500/30',
      focusBorder: 'focus:border-emerald-500'
    },
    amber: {
      bg: 'bg-amber-600',
      hoverBg: 'hover:bg-amber-700',
      text: 'text-amber-455 text-amber-400',
      border: 'border-amber-500',
      borderHover: 'hover:border-amber-500/50',
      lightBg: 'bg-amber-500/10',
      lightBorder: 'border-amber-500/30',
      focusBorder: 'focus:border-amber-500'
    }
  };
  return themes[color] || themes.blue;
};
