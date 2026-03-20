import { describe, it, expect } from 'vitest';
import { cn, generateSlug, extractIdFromSlug } from '../lib/utils';

describe('Utility Functions', () => {
  describe('cn()', () => {
    it('should merge tailwind classes properly', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
      expect(cn('px-2 py-1', { 'bg-blue-500': true })).toBe('px-2 py-1 bg-blue-500');
    });

    it('should resolve conflicting tailwind classes', () => {
      expect(cn('px-2 p-4')).toBe('p-4'); // padding override
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500'); // background override
    });
  });

  describe('generateSlug()', () => {
    it('should format a valid slug with a title and an ID', () => {
      const id = '550e8400-e29b-41d4-a716-446655440000';
      const title = 'The Great Gatsby';

      const slug = generateSlug(title, id);

      expect(slug).toBe('the-great-gatsby-440000');
    });

    it('should handle special characters and numbers in title', () => {
      const id = '123e4567-e89b-12d3-a456-426614174000';
      const title = 'Harry Potter & The Sorcerer\'s Stone! (1997)';

      const slug = generateSlug(title, id);

      expect(slug).toBe('harry-potter-the-sorcerer-s-stone-1997-174000');
    });

    it('should remove leading and trailing hyphens', () => {
      const id = 'uuid-suffix-123456';
      const title = '---Book Title---';

      const slug = generateSlug(title, id);

      expect(slug).toBe('book-title-123456');
    });
  });

  describe('extractIdFromSlug()', () => {
    it('should correctly extract the 6-character ID suffix from a slug', () => {
      const slug = 'the-great-gatsby-440000';

      const id = extractIdFromSlug(slug);

      expect(id).toBe('440000');
    });

    it('should extract the last segment even if title has numbers', () => {
      const slug = '1984-george-orwell-123456';

      const id = extractIdFromSlug(slug);

      expect(id).toBe('123456');
    });

    it('should return the slug itself if there are no hyphens', () => {
      const slug = '123456';

      const id = extractIdFromSlug(slug);

      expect(id).toBe('123456');
    });
  });
});
