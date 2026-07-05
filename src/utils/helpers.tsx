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
