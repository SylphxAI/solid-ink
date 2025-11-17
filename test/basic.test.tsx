import { describe, it, expect } from 'vitest';
import { renderTest, Text, Box } from '../src/index.js';

describe('Solid-Ink Testing', () => {
  it('renders basic text', () => {
    const { lastFrame } = renderTest(() => <Text>Hello World</Text>);
    expect(lastFrame()).toContain('Hello World');
  });

  it('renders with Box layout', () => {
    const { lastFrame } = renderTest(() => (
      <Box>
        <Text>Test</Text>
      </Box>
    ));
    expect(lastFrame()).toContain('Test');
  });

  it('supports rerendering', () => {
    const result = renderTest(() => <Text>First</Text>);
    expect(result.lastFrame()).toContain('First');

    result.rerender(() => <Text>Second</Text>);
    expect(result.lastFrame()).toContain('Second');
  });
});
