# @sylphx/solid-tui-visual

> Visual effects and data visualization components for terminal applications

[![npm version](https://img.shields.io/npm/v/@sylphx/solid-tui-visual.svg)](https://www.npmjs.com/package/@sylphx/solid-tui-visual)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Stunning visual effects and data visualization for [Solid-TUI](https://github.com/SylphxAI/solid-tui) terminal applications. Gradients, ASCII art, charts, and more—powered by SolidJS's fine-grained reactivity.

## 📦 Installation

```bash
npm install @sylphx/solid-tui-visual solid-js @sylphx/solid-tui
```

## 🎯 Components

### Gradient

Apply beautiful gradient effects to text with pre-defined themes or custom colors.

**Features:**
- 13 built-in gradient presets
- Custom color arrays support
- Smooth color transitions
- Powered by [gradient-string](https://github.com/bokub/gradient-string)

**Props:**
- `children: string` - Text to apply gradient to
- `colors?: string[]` - Custom color array (hex or named colors)
- `name?: string` - Pre-defined gradient name (default: 'rainbow')

**Available Gradients:**
- `rainbow` - Red → Yellow → Green → Cyan → Blue → Magenta
- `atlas` - #feac5e → #c779d0 → #4bc0c8
- `cristal` - #bdfff3 → #4ac29a
- `teen` - #77a1d3 → #79cbca → #e684ae
- `mind` - #473b7b → #3584a7 → #30d2be
- `morning` - #ff5f6d → #ffc371
- `vice` - #5ee7df → #b490ca
- `passion` - #f43b47 → #453a94
- `fruit` - #ff4e50 → #f9d423
- `instagram` - #833ab4 → #fd1d1d → #fcb045
- `retro` - Multi-color retro gradient
- `summer` - #fdbb2d → #22c1c3
- `pastel` - Soft pastel colors

**Example:**
```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { Gradient } from '@sylphx/solid-tui-visual';

function App() {
  return (
    <Box flexDirection="column">
      <Gradient name="rainbow">
        Rainbow Gradient Text
      </Gradient>

      <Gradient name="instagram">
        Instagram-style Gradient
      </Gradient>

      <Gradient colors={['#FF0000', '#00FF00', '#0000FF']}>
        Custom RGB Gradient
      </Gradient>
    </Box>
  );
}

render(<App />);
```

### BigText

Render ASCII art text using figlet fonts.

**Features:**
- Multiple font styles
- Text alignment (left, center, right)
- Color customization
- Automatic fallback to default font
- Powered by [figlet](https://github.com/patorjk/figlet.js)

**Props:**
- `children: string` - Text to render as ASCII art
- `font?: string` - Figlet font name (default: 'Standard')
- `align?: 'left' | 'center' | 'right'` - Text alignment (default: 'left')
- `color?: string` - Text color

**Popular Fonts:**
- `Standard` - Classic block letters
- `Banner` - Large banner style
- `Slant` - Slanted letters
- `3D-ASCII` - 3D effect
- `Doom` - Doom game style
- `Big` - Extra large letters
- `Small` - Compact letters

[See all available fonts](http://www.figlet.org/examples.html)

**Example:**
```tsx
import { BigText } from '@sylphx/solid-tui-visual';

function Welcome() {
  return (
    <Box flexDirection="column">
      <BigText color="cyan">HELLO</BigText>

      <BigText font="Banner" color="green">
        SOLID-TUI
      </BigText>

      <BigText font="Slant" align="center" color="magenta">
        WELCOME
      </BigText>
    </Box>
  );
}
```

### Chart

Terminal-based data visualization with bar and line charts.

**Features:**
- Bar chart (horizontal bars)
- Line chart (connected points)
- Auto-scaling based on data
- Configurable dimensions
- Optional value labels and axis
- Color customization

**Props:**
- `data: ChartDataPoint[]` - Array of data points
- `type?: 'bar' | 'line'` - Chart type (default: 'bar')
- `width?: number` - Chart width in characters (default: 50)
- `height?: number` - Chart height in rows (default: 10, line charts only)
- `color?: string` - Chart color (default: 'blue')
- `showValues?: boolean` - Show data values (default: true)
- `showAxis?: boolean` - Show axis labels (default: true, line charts only)

**Types:**
```typescript
interface ChartDataPoint {
  label: string;
  value: number;
}
```

**Example:**
```tsx
import { Chart } from '@sylphx/solid-tui-visual';

function Dashboard() {
  const barData = [
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 62 },
    { label: 'Mar', value: 38 },
    { label: 'Apr', value: 71 },
    { label: 'May', value: 55 },
  ];

  const lineData = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 19 },
    { label: 'Wed', value: 15 },
    { label: 'Thu', value: 25 },
    { label: 'Fri', value: 22 },
  ];

  return (
    <Box flexDirection="column">
      <Text bold>Sales by Month</Text>
      <Chart data={barData} type="bar" width={40} color="green" />

      <Box marginTop={3}>
        <Text bold>Weekly Trend</Text>
        <Chart data={lineData} type="line" height={10} color="blue" />
      </Box>
    </Box>
  );
}
```

**Bar Chart Features:**
- Horizontal bars with labels
- Auto-width calculation
- Value display on the right
- Uses block character (█) for bars

**Line Chart Features:**
- Connected data points
- Vertical axis rendering
- Point markers (●)
- Connecting lines (│)
- Optional axis labels

## 📊 Use Cases

### Splash Screens

```tsx
function SplashScreen() {
  return (
    <Box flexDirection="column" alignItems="center">
      <Gradient name="rainbow">
        <BigText font="Banner">MY APP</BigText>
      </Gradient>
      <Text dim>Version 1.0.0</Text>
    </Box>
  );
}
```

### Data Dashboards

```tsx
function MetricsDashboard() {
  const cpuData = [
    { label: '1m', value: 45 },
    { label: '5m', value: 62 },
    { label: '15m', value: 38 },
  ];

  return (
    <Box flexDirection="column">
      <Gradient name="passion">
        <BigText font="Small">CPU USAGE</BigText>
      </Gradient>
      <Chart data={cpuData} type="line" height={8} color="red" />
    </Box>
  );
}
```

### Progress Displays

```tsx
function BuildStatus() {
  const stages = [
    { label: 'Install', value: 100 },
    { label: 'Build', value: 75 },
    { label: 'Test', value: 30 },
    { label: 'Deploy', value: 0 },
  ];

  return (
    <Box flexDirection="column">
      <BigText font="Small" color="cyan">BUILD</BigText>
      <Chart data={stages} type="bar" width={30} color="cyan" />
    </Box>
  );
}
```

## 🎨 Examples

Run the included examples:

```bash
npm run example:gradient  # Gradient demo
npm run example:bigtext   # BigText demo
npm run example:chart     # Chart demo
```

## 🔧 Development

```bash
# Build package
npm run build

# Run tests
npm test

# Watch mode
npm run dev
```

## 🎨 Color Support

All components support standard terminal colors:
- Named: `red`, `green`, `blue`, `yellow`, `magenta`, `cyan`, `white`, `black`
- Modifiers: `dim`, `bold`, `underline`
- Hex colors: `#FF0000`, `#00FF00`, etc. (terminal-dependent)

## 📚 Dependencies

- [gradient-string](https://github.com/bokub/gradient-string) - Beautiful gradient text
- [figlet](https://github.com/patorjk/figlet.js) - ASCII art text generation

## 📖 API Reference

See [TypeScript definitions](./src/index.ts) for complete API documentation.

## 🤝 Contributing

Contributions are welcome! Please read the [Contributing Guide](../../CONTRIBUTING.md) for details.

## 📄 License

MIT © [SylphxAI](https://github.com/SylphxAI)

## 🔗 Links

- [Solid-TUI Documentation](https://solid-tui.sylphx.com)
- [GitHub Repository](https://github.com/SylphxAI/solid-tui)
- [Report Issues](https://github.com/SylphxAI/solid-tui/issues)
