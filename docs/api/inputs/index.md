# Input Components

Interactive input components for building terminal forms and user interfaces.

## Package

```bash
npm install @sylphx/solid-tui-inputs
```

## Components

### [TextInput](/api/inputs/text-input)

Single-line text input with cursor navigation and masking support.

```tsx
<TextInput
  value={value()}
  onChange={setValue}
  placeholder="Enter text..."
  mask="*"  // For passwords
  onSubmit={handleSubmit}
/>
```

**Use Cases:** Text fields, password inputs, search boxes

---

### [SelectInput](/api/inputs/select-input)

Single-selection dropdown with keyboard navigation.

```tsx
<SelectInput
  items={[
    { label: 'Option 1', value: 1 },
    { label: 'Option 2', value: 2 },
  ]}
  onSelect={(item) => console.log(item.value)}
/>
```

**Use Cases:** Dropdown menus, option selection, configuration choices

---

### [MultiSelect](/api/inputs/multi-select)

Multi-selection list with checkbox toggles.

```tsx
<MultiSelect
  items={[
    { label: 'Feature A', value: 'a' },
    { label: 'Feature B', value: 'b' },
  ]}
  defaultValue={['a']}
  onSelect={(items) => console.log(items)}
/>
```

**Use Cases:** Feature toggles, multiple selections, tag selection

---

### [ConfirmInput](/api/inputs/confirm-input)

Yes/No confirmation prompt.

```tsx
<ConfirmInput
  onConfirm={(confirmed) => {
    if (confirmed) {
      // User confirmed
    }
  }}
  yesLabel="Yes"
  noLabel="No"
/>
```

**Use Cases:** Confirmation dialogs, yes/no questions, destructive action confirms

---

### [QuickSearchInput](/api/inputs/quick-search)

Searchable dropdown with real-time filtering.

```tsx
<QuickSearchInput
  items={countries}
  placeholder="Search countries..."
  caseSensitive={false}
  onSelect={(item) => console.log(item.value)}
/>
```

**Use Cases:** Searchable lists, autocomplete, large option sets

---

## Common Features

All input components support:

- ✅ **Keyboard Navigation** - Arrow keys, j/k, number keys
- ✅ **Focus Management** - Control focus with `focus` prop
- ✅ **TypeScript** - Fully typed with generics
- ✅ **Reactive** - SolidJS signals for instant updates
- ✅ **Accessible** - Keyboard-first design

## Examples

### Simple Form

```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { TextInput, SelectInput, ConfirmInput } from '@sylphx/solid-tui-inputs';
import { createSignal } from 'solid-js';

function Form() {
  const [name, setName] = createSignal('');
  const [role, setRole] = createSignal('');
  const [submitted, setSubmitted] = createSignal(false);

  return (
    <Box flexDirection="column">
      <Text bold>User Registration</Text>

      <Box marginTop={1}>
        <Text>Name:</Text>
        <TextInput value={name()} onChange={setName} />
      </Box>

      <Box marginTop={1}>
        <Text>Role:</Text>
        <SelectInput
          items={[
            { label: 'Developer', value: 'dev' },
            { label: 'Designer', value: 'design' },
          ]}
          onSelect={(item) => setRole(item.value)}
        />
      </Box>

      <Box marginTop={1}>
        <Text>Submit?</Text>
        <ConfirmInput onConfirm={setSubmitted} />
      </Box>

      {submitted() && (
        <Text color="green">
          Registered: {name()} as {role()}
        </Text>
      )}
    </Box>
  );
}

render(<Form />);
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `↑/↓` or `j/k` | Navigate items |
| `Enter` | Confirm selection |
| `Space` | Toggle (MultiSelect) |
| `1-9` | Quick select item |
| `←/→` | Move cursor (TextInput) |
| `Backspace` | Delete character |
| `y/n` | Yes/No (ConfirmInput) |

## Learn More

- [Getting Started](/guide/getting-started)
- [Testing Guide](/guide/testing)
- [Examples](/examples/)
