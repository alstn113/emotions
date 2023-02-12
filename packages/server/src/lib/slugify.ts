import { customAlphabet } from 'nanoid';

export const slugify = (text: string): string => {
  return (
    text
      // Remove all non-word chars
      .replace(/[^0-9a-zA-Zㄱ-힣\s]/g, '')
      // Replace all whitespace with a single dash
      .trim()
      // Replace all whitespace with a single dash
      .replace(/\s+/g, '-')
      // Replace multiple dashes with a single dash
      .replace(/--+/g, '-')
  );
};

export const generateId = customAlphabet(
  '0123456789abcdefghijklmnopqrstuvwxyz',
  8,
);
