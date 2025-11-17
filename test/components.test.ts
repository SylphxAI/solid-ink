import { describe, it, expect } from 'vitest';
import { Box } from '../src/components/Box.js';
import { Text } from '../src/components/Text.js';
import { Spinner } from '../src/components/Spinner.js';
import { Newline } from '../src/components/Newline.js';
import { Spacer } from '../src/components/Spacer.js';
import { Static } from '../src/components/Static.js';
import { Transform } from '../src/components/Transform.js';

describe('Components', () => {
  describe('Box', () => {
    it('exports Box component', () => {
      expect(Box).toBeDefined();
      expect(typeof Box).toBe('function');
    });
  });

  describe('Text', () => {
    it('exports Text component', () => {
      expect(Text).toBeDefined();
      expect(typeof Text).toBe('function');
    });
  });

  describe('Spinner', () => {
    it('exports Spinner component', () => {
      expect(Spinner).toBeDefined();
      expect(typeof Spinner).toBe('function');
    });
  });

  describe('Newline', () => {
    it('exports Newline component', () => {
      expect(Newline).toBeDefined();
      expect(typeof Newline).toBe('function');
    });
  });

  describe('Spacer', () => {
    it('exports Spacer component', () => {
      expect(Spacer).toBeDefined();
      expect(typeof Spacer).toBe('function');
    });
  });

  describe('Static', () => {
    it('exports Static component', () => {
      expect(Static).toBeDefined();
      expect(typeof Static).toBe('function');
    });
  });

  describe('Transform', () => {
    it('exports Transform component', () => {
      expect(Transform).toBeDefined();
      expect(typeof Transform).toBe('function');
    });
  });
});
