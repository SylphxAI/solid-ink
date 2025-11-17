# @sylphx/solid-tui-inputs

> Interactive input components for Solid-TUI terminal applications

[![npm version](https://img.shields.io/npm/v/@sylphx/solid-tui-inputs.svg)](https://www.npmjs.com/package/@sylphx/solid-tui-inputs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of interactive input components for building terminal user interfaces with [Solid-TUI](https://github.com/SylphxAI/solid-tui). Powered by SolidJS's fine-grained reactivity for blazing-fast, responsive UIs.

## 📦 Installation

```bash
npm install @sylphx/solid-tui-inputs solid-js @sylphx/solid-tui
```

## 🎯 Components

### TextInput

Single-line text input with cursor navigation and masking support.

**Features:**
- Cursor navigation with arrow keys
- Backspace/Delete support
- Placeholder text
- Password masking
- Submit on Enter

**Props:**
- `value?: string` - Input value
- `placeholder?: string` - Placeholder text when empty
- `focus?: boolean` - Auto-focus input (default: true)
- `showCursor?: boolean` - Show blinking cursor (default: true)
- `mask?: string` - Mask character for passwords (e.g., '*')
- `onChange?: (value: string) => void` - Value change handler
- `onSubmit?: (value: string) => void` - Enter key handler

**Example:**
```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { TextInput } from '@sylphx/solid-tui-inputs';
import { createSignal } from 'solid-js';

function App() {
  const [value, setValue] = createSignal('');

  return (
    <Box flexDirection="column">
      <Text>Enter your name:</Text>
      <TextInput
        value={value()}
        placeholder="Type here..."
        onChange={setValue}
        onSubmit={(val) => console.log('Submitted:', val)}
      />
    </Box>
  );
}

render(<App />);
```

### SelectInput

Single-selection dropdown with keyboard navigation.

**Features:**
- Arrow keys or j/k for navigation
- Number keys for quick selection
- Enter to confirm
- Visual highlight on selected item

**Props:**
- `items: SelectInputItem<V>[]` - Array of items to select from
- `initialIndex?: number` - Initially selected index (default: 0)
- `onSelect?: (item: SelectInputItem<V>) => void` - Selection handler
- `onHighlight?: (item: SelectInputItem<V>) => void` - Highlight handler

**Types:**
```typescript
interface SelectInputItem<V = any> {
  label: string;
  value: V;
}
```

**Example:**
```tsx
import { SelectInput } from '@sylphx/solid-tui-inputs';

function ColorPicker() {
  const items = [
    { label: 'Red', value: '#ff0000' },
    { label: 'Green', value: '#00ff00' },
    { label: 'Blue', value: '#0000ff' },
  ];

  return (
    <SelectInput
      items={items}
      onSelect={(item) => console.log('Selected:', item.value)}
    />
  );
}
```

### MultiSelect

Multi-selection list with checkbox toggles.

**Features:**
- Space to toggle selection
- Arrow keys or j/k for navigation
- Number keys for quick toggle
- Enter to confirm
- Checkboxes ([x]/[ ]) for visual feedback

**Props:**
- `items: MultiSelectItem<V>[]` - Array of items to select from
- `defaultValue?: V[]` - Initially selected values
- `onSelect?: (items: MultiSelectItem<V>[]) => void` - Selection handler

**Types:**
```typescript
interface MultiSelectItem<V = any> {
  label: string;
  value: V;
}
```

**Example:**
```tsx
import { MultiSelect } from '@sylphx/solid-tui-inputs';

function FruitPicker() {
  const items = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ];

  return (
    <MultiSelect
      items={items}
      defaultValue={['apple']}
      onSelect={(selected) => console.log('Selected:', selected)}
    />
  );
}
```

### ConfirmInput

Yes/No confirmation prompt.

**Features:**
- Y/N keyboard shortcuts
- Arrow keys for navigation
- Enter to confirm
- Customizable labels

**Props:**
- `onConfirm?: (confirmed: boolean) => void` - Confirmation handler
- `yesLabel?: string` - Custom "Yes" label (default: "Yes")
- `noLabel?: string` - Custom "No" label (default: "No")
- `defaultValue?: boolean` - Default selection (default: false)

**Example:**
```tsx
import { ConfirmInput } from '@sylphx/solid-tui-inputs';

function DeleteConfirm() {
  return (
    <Box flexDirection="column">
      <Text>Are you sure you want to delete this file?</Text>
      <ConfirmInput
        onConfirm={(confirmed) => {
          if (confirmed) {
            console.log('Deleting...');
          }
        }}
      />
    </Box>
  );
}
```

### QuickSearchInput

Searchable dropdown with real-time filtering.

**Features:**
- Type to filter items
- Cursor navigation within search text
- Arrow keys for list navigation
- Backspace/Delete for editing
- Case-sensitive search option

**Props:**
- `items: QuickSearchItem<V>[]` - Array of items to search
- `placeholder?: string` - Search input placeholder
- `caseSensitive?: boolean` - Case-sensitive search (default: false)
- `onSelect?: (item: QuickSearchItem<V>) => void` - Selection handler

**Types:**
```typescript
interface QuickSearchItem<V = any> {
  label: string;
  value: V;
}
```

**Example:**
```tsx
import { QuickSearchInput } from '@sylphx/solid-tui-inputs';

function CountrySelector() {
  const countries = [
    { label: 'United States', value: 'us' },
    { label: 'United Kingdom', value: 'uk' },
    { label: 'Canada', value: 'ca' },
    // ... more countries
  ];

  return (
    <QuickSearchInput
      items={countries}
      placeholder="Search countries..."
      onSelect={(country) => console.log('Selected:', country.value)}
    />
  );
}
```

## ⌨️ Keyboard Shortcuts

### Common
- `↑/↓` or `j/k` - Navigate items
- `Enter` - Confirm selection
- `1-9` - Quick select/toggle item by number

### TextInput / QuickSearchInput
- `←/→` - Move cursor
- `Backspace` - Delete before cursor
- `Delete` - Delete after cursor

### MultiSelect
- `Space` - Toggle checkbox

### ConfirmInput
- `y` - Select Yes
- `n` - Select No

## 🎨 Examples

Run the included examples:

```bash
npm run example:text      # TextInput demo
npm run example:select    # SelectInput demo
npm run example:multi     # MultiSelect demo
npm run example:confirm   # ConfirmInput demo
npm run example:search    # QuickSearchInput demo
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
