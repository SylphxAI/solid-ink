import { describe, it, expect } from 'vitest';

// Import component modules to test exports
import * as BoxModule from '../src/components/Box.js';
import * as TextModule from '../src/components/Text.js';
import * as SpinnerModule from '../src/components/Spinner.js';
import * as NewlineModule from '../src/components/Newline.js';
import * as SpacerModule from '../src/components/Spacer.js';
import * as StaticModule from '../src/components/Static.js';
import * as TransformModule from '../src/components/Transform.js';

describe('Components', () => {
  describe('Box', () => {
    it('exports Box component', () => {
      expect(BoxModule.Box).toBeDefined();
      expect(typeof BoxModule.Box).toBe('function');
    });
  });

  describe('Text', () => {
    it('exports Text component', () => {
      expect(TextModule.Text).toBeDefined();
      expect(typeof TextModule.Text).toBe('function');
    });
  });

  describe('Spinner', () => {
    it('exports Spinner component', () => {
      expect(SpinnerModule.Spinner).toBeDefined();
      expect(typeof SpinnerModule.Spinner).toBe('function');
    });
  });

  describe('Newline', () => {
    it('exports Newline component', () => {
      expect(NewlineModule.Newline).toBeDefined();
      expect(typeof NewlineModule.Newline).toBe('function');
    });
  });

  describe('Spacer', () => {
    it('exports Spacer component', () => {
      expect(SpacerModule.Spacer).toBeDefined();
      expect(typeof SpacerModule.Spacer).toBe('function');
    });
  });

  describe('Static', () => {
    it('exports Static component', () => {
      expect(StaticModule.Static).toBeDefined();
      expect(typeof StaticModule.Static).toBe('function');
    });
  });

  describe('Transform', () => {
    it('exports Transform component', () => {
      expect(TransformModule.Transform).toBeDefined();
      expect(typeof TransformModule.Transform).toBe('function');
    });
  });
});
