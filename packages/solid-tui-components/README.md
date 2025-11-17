# @sylphx/solid-tui-components

> UI components for building beautiful terminal interfaces

[![npm version](https://img.shields.io/npm/v/@sylphx/solid-tui-components.svg)](https://www.npmjs.com/package/@sylphx/solid-tui-components)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of UI components for building terminal user interfaces with [Solid-TUI](https://github.com/SylphxAI/solid-tui). Progress bars, tables, dividers, links, and more—all powered by SolidJS's fine-grained reactivity.

## 📦 Installation

```bash
npm install @sylphx/solid-tui-components solid-js @sylphx/solid-tui
```

## 🎯 Components

### ProgressBar

Visual progress indicator with customizable characters and colors.

**Features:**
- Customizable characters (complete/incomplete)
- Percentage display
- Configurable width
- Auto-clamping (0-100%)

**Props:**
- `value?: number` - Current value (default: 0)
- `total?: number` - Maximum value (default: 100)
- `width?: number` - Bar width in characters (default: 20)
- `character?: string` - Character for both complete/incomplete
- `completeCharacter?: string` - Character for completed portion (default: '█')
- `incompleteCharacter?: string` - Character for incomplete portion (default: '░')
- `showPercentage?: boolean` - Show percentage text (default: true)
- `color?: string` - Bar color (default: 'green')

**Example:**
```tsx
import { render, Box } from '@sylphx/solid-tui';
import { ProgressBar } from '@sylphx/solid-tui-components';

function App() {
  return (
    <Box flexDirection="column">
      <ProgressBar value={75} total={100} width={30} color="cyan" />
      <ProgressBar
        value={45}
        total={100}
        completeCharacter="●"
        incompleteCharacter="○"
      />
    </Box>
  );
}

render(<App />);
```

### Table

Data table with borders, alignment, and striping.

**Features:**
- Multiple border styles (single, double, round, bold, classic, none)
- Column alignment (left, center, right)
- Auto-width calculation
- Striped rows
- Custom rendering per column

**Props:**
- `columns: TableColumn[]` - Column definitions
- `data: T[]` - Data rows
- `borderStyle?: 'single' | 'double' | 'round' | 'bold' | 'classic' | 'none'` - Border style (default: 'single')
- `striped?: boolean` - Alternate row colors (default: false)

**Types:**
```typescript
interface TableColumn<T = any> {
  key: string;
  title: string;
  width?: number;  // Auto-calculated if not provided
  align?: 'left' | 'center' | 'right';  // Default: 'left'
  render?: (value: any, row: T) => string;  // Custom renderer
}
```

**Example:**
```tsx
import { Table } from '@sylphx/solid-tui-components';

function UserTable() {
  const columns = [
    { key: 'name', title: 'Name', width: 15 },
    { key: 'age', title: 'Age', width: 5, align: 'right' },
    { key: 'email', title: 'Email', width: 25 },
    {
      key: 'status',
      title: 'Status',
      width: 10,
      render: (val) => val === 'active' ? '✓ Active' : '✗ Inactive'
    },
  ];

  const data = [
    { name: 'Alice', age: 28, email: 'alice@example.com', status: 'active' },
    { name: 'Bob', age: 34, email: 'bob@example.com', status: 'inactive' },
  ];

  return <Table columns={columns} data={data} borderStyle="double" striped />;
}
```

### Divider

Horizontal divider with optional title.

**Features:**
- Optional centered title
- Customizable character
- Configurable width
- Color customization

**Props:**
- `title?: string` - Optional centered title
- `width?: number` - Divider width (default: 50)
- `character?: string` - Divider character (default: '─')
- `color?: string` - Divider color (default: 'dim')
- `titleColor?: string` - Title color (defaults to divider color)

**Example:**
```tsx
import { Divider } from '@sylphx/solid-tui-components';

function App() {
  return (
    <Box flexDirection="column">
      <Text>Section 1</Text>
      <Divider />

      <Text>Section 2</Text>
      <Divider title="Important" titleColor="yellow" />

      <Text>Section 3</Text>
      <Divider character="═" color="blue" width={60} />
    </Box>
  );
}
```

### Link

Clickable hyperlink with OSC 8 support.

**Features:**
- Auto-detection of terminal hyperlink support
- Fallback for unsupported terminals
- Styled as blue underlined text

**Supported Terminals:**
- iTerm2
- WezTerm
- VS Code integrated terminal
- Windows Terminal
- Konsole

**Props:**
- `url: string` - Target URL
- `label?: string` - Link text (defaults to URL)

**Example:**
```tsx
import { Link } from '@sylphx/solid-tui-components';

function App() {
  return (
    <Box flexDirection="column">
      <Link url="https://solid-tui.sylphx.com" />
      <Link url="https://github.com/SylphxAI/solid-tui" label="View on GitHub" />
    </Box>
  );
}
```

### TitledBox

Bordered container with title.

**Features:**
- 5 border styles (single, double, round, bold, classic)
- Customizable border and title colors
- Configurable width and padding
- Centered title in top border

**Props:**
- `title: string` - Box title
- `children: JSX.Element` - Box content
- `width?: number` - Box width (default: 50)
- `borderStyle?: 'single' | 'double' | 'round' | 'bold' | 'classic'` - Border style (default: 'single')
- `borderColor?: string` - Border color (default: 'white')
- `titleColor?: string` - Title color (defaults to border color)
- `padding?: number` - Internal padding (default: 1)

**Example:**
```tsx
import { TitledBox } from '@sylphx/solid-tui-components';

function App() {
  return (
    <Box flexDirection="column">
      <TitledBox title="Configuration" width={40}>
        <Text>API Key: ****************</Text>
        <Text>Endpoint: https://api.example.com</Text>
      </TitledBox>

      <TitledBox
        title="Warning"
        borderStyle="double"
        borderColor="yellow"
        width={40}
      >
        <Text>This action cannot be undone!</Text>
      </TitledBox>
    </Box>
  );
}
```

## 🎨 Border Styles

All components with borders support these styles:

- **single**: `┌─┐ │ └─┘` (default)
- **double**: `╔═╗ ║ ╚═╝`
- **round**: `╭─╮ │ ╰─╯`
- **bold**: `┏━┓ ┃ ┗━┛`
- **classic**: `+-+ | +-+`
- **none**: No borders (Table only)

## 🎨 Examples

Run the included examples:

```bash
npm run example:progress   # ProgressBar demo
npm run example:table      # Table demo
npm run example:divider    # Divider demo
npm run example:link       # Link demo
npm run example:titled     # TitledBox demo
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
