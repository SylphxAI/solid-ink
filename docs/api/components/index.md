# UI Components

Beautiful UI components for building terminal interfaces.

## Package

```bash
npm install @sylphx/solid-tui-components
```

## Components

### [ProgressBar](/api/components/progress-bar)

Visual progress indicator with customizable characters.

```tsx
<ProgressBar
  value={75}
  total={100}
  width={30}
  color="green"
  showPercentage
/>
```

**Use Cases:** Loading indicators, progress tracking, completion status

---

### [Table](/api/components/table)

Data table with borders, alignment, and striping.

```tsx
<Table
  columns={[
    { key: 'name', title: 'Name', width: 15 },
    { key: 'age', title: 'Age', align: 'right' },
  ]}
  data={users}
  borderStyle="double"
  striped
/>
```

**Use Cases:** Data display, reports, listings

---

### [Divider](/api/components/divider)

Horizontal divider with optional title.

```tsx
<Divider title="Section" width={50} color="blue" />
```

**Use Cases:** Section separators, visual breaks, content organization

---

### [Link](/api/components/link)

Clickable hyperlink with OSC 8 support.

```tsx
<Link url="https://example.com" label="Visit Site" />
```

**Use Cases:** External links, documentation references, clickable URLs

---

### [TitledBox](/api/components/titled-box)

Bordered container with title.

```tsx
<TitledBox
  title="Configuration"
  width={40}
  borderStyle="round"
  borderColor="cyan"
>
  <Text>Content here...</Text>
</TitledBox>
```

**Use Cases:** Grouped content, panels, cards, sections

---

## Border Styles

All bordered components support these styles:

- `single` - `┌─┐ │ └─┘` (default)
- `double` - `╔═╗ ║ ╚═╝`
- `round` - `╭─╮ │ ╰─╯`
- `bold` - `┏━┓ ┃ ┗━┛`
- `classic` - `+-+ | +-+`

## Examples

### Dashboard Layout

```tsx
import { render, Box, Text } from '@sylphx/solid-tui';
import { ProgressBar, Table, TitledBox, Divider } from '@sylphx/solid-tui-components';

function Dashboard() {
  const tasks = [
    { name: 'Build', status: 'Done', progress: 100 },
    { name: 'Test', status: 'Running', progress: 75 },
    { name: 'Deploy', status: 'Pending', progress: 0 },
  ];

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">System Dashboard</Text>

      <Divider title="Tasks" />

      <Box marginTop={1}>
        <Table
          columns={[
            { key: 'name', title: 'Task', width: 10 },
            { key: 'status', title: 'Status', width: 10 },
          ]}
          data={tasks}
          borderStyle="single"
        />
      </Box>

      <Divider title="Progress" />

      <Box marginTop={1} flexDirection="column">
        {tasks.map(task => (
          <Box key={task.name}>
            <Text>{task.name.padEnd(10)}</Text>
            <ProgressBar
              value={task.progress}
              total={100}
              width={20}
              color={task.progress === 100 ? 'green' : 'yellow'}
            />
          </Box>
        ))}
      </Box>

      <TitledBox
        title="System Info"
        borderStyle="round"
        borderColor="blue"
        marginTop={2}
      >
        <Text>CPU: 45%</Text>
        <Text>Memory: 2.1GB</Text>
      </TitledBox>
    </Box>
  );
}

render(<Dashboard />);
```

## Learn More

- [Getting Started](/guide/getting-started)
- [Layout System](/guide/layout)
- [Examples](/examples/)
