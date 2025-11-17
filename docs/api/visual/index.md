# Visual Effects

Stunning visual effects and data visualization for terminal applications.

## Package

```bash
npm install @sylphx/solid-tui-visual
```

## Components

### [Gradient](/api/visual/gradient)

Beautiful gradient text effects.

```tsx
<Gradient name="rainbow">
  Rainbow Gradient Text
</Gradient>

<Gradient colors={['#FF0000', '#00FF00', '#0000FF']}>
  Custom Gradient
</Gradient>
```

**13 Built-in Gradients:**
- `rainbow`, `atlas`, `cristal`, `teen`, `mind`, `morning`
- `vice`, `passion`, `fruit`, `instagram`, `retro`, `summer`, `pastel`

---

### [BigText](/api/visual/big-text)

ASCII art text rendering.

```tsx
<BigText font="Banner" align="center" color="cyan">
  HELLO
</BigText>
```

**Popular Fonts:**
- `Standard`, `Banner`, `Slant`, `3D-ASCII`, `Doom`, `Big`, `Small`

---

### [Chart](/api/visual/chart)

Terminal-based data visualization.

```tsx
<Chart
  data={[
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 62 },
  ]}
  type="bar"  // or "line"
  width={40}
  color="green"
  showValues
/>
```

**Chart Types:**
- **Bar Chart** - Horizontal bars
- **Line Chart** - Connected points

---

## Examples

### Splash Screen

```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { Gradient, BigText } from '@sylphx/solid-tui-visual';

function SplashScreen() {
  return (
    <Box flexDirection="column" alignItems="center" padding={2}>
      <Gradient name="rainbow">
        <BigText font="Banner">MY APP</BigText>
      </Gradient>
      <Text dim>Version 1.0.0</Text>
    </Box>
  );
}

render(<SplashScreen />);
```

### Data Dashboard

```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { Chart, Gradient, BigText } from '@sylphx/solid-tui-visual';
import { createSignal, onCleanup } from 'solid-js';

function Dashboard() {
  const [cpuData, setCpuData] = createSignal([
    { label: '1m', value: 45 },
    { label: '5m', value: 62 },
    { label: '15m', value: 38 },
  ]);

  // Update CPU data every second
  const interval = setInterval(() => {
    setCpuData(prev => prev.map(d => ({
      ...d,
      value: Math.random() * 100
    })));
  }, 1000);

  onCleanup(() => clearInterval(interval));

  return (
    <Box flexDirection="column" padding={1}>
      <Gradient name="passion">
        <BigText font="Small">CPU USAGE</BigText>
      </Gradient>

      <Box marginTop={1}>
        <Chart
          data={cpuData()}
          type="line"
          height={8}
          color="red"
          showValues
        />
      </Box>
    </Box>
  );
}

render(<Dashboard />);
```

### Build Status

```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { Chart, BigText } from '@sylphx/solid-tui-visual';

function BuildStatus() {
  const stages = [
    { label: 'Install', value: 100 },
    { label: 'Build', value: 75 },
    { label: 'Test', value: 30 },
    { label: 'Deploy', value: 0 },
  ];

  return (
    <Box flexDirection="column" padding={1}>
      <BigText font="Small" color="cyan">BUILD</BigText>

      <Box marginTop={1}>
        <Chart
          data={stages}
          type="bar"
          width={30}
          color="cyan"
          showValues
        />
      </Box>
    </Box>
  );
}

render(<BuildStatus />);
```

### Gradient Showcase

```tsx
import { render, Box } from '@sylphx/solid-tui';
import { Gradient } from '@sylphx/solid-tui-visual';
import { For } from 'solid-js';

function GradientShowcase() {
  const gradients = [
    'rainbow', 'atlas', 'cristal', 'teen', 'mind',
    'morning', 'vice', 'passion', 'fruit', 'instagram',
    'retro', 'summer', 'pastel'
  ];

  return (
    <Box flexDirection="column" padding={1}>
      <For each={gradients}>
        {(name) => (
          <Gradient name={name}>
            {name.padEnd(15)} - Beautiful gradient text
          </Gradient>
        )}
      </For>
    </Box>
  );
}

render(<GradientShowcase />);
```

## Color Support

All components support:
- **Named colors**: `red`, `green`, `blue`, `yellow`, `magenta`, `cyan`, `white`, `black`
- **Modifiers**: `dim`, `bold`, `underline`
- **Hex colors**: `#FF0000`, `#00FF00` (terminal-dependent)

## Dependencies

- [gradient-string](https://github.com/bokub/gradient-string) - Gradient text
- [figlet](https://github.com/patorjk/figlet.js) - ASCII art

## Learn More

- [Getting Started](/guide/getting-started)
- [Examples](/examples/)
