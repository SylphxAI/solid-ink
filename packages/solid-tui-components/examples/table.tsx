import { render } from '@sylphx/solid-tui';
import { Table } from '../src/Table.jsx';
import { Box, Text } from '@sylphx/solid-tui';

function TableDemo() {
  const columns = [
    { key: 'name', title: 'Name', width: 15 },
    { key: 'age', title: 'Age', width: 5, align: 'right' as const },
    { key: 'email', title: 'Email', width: 25 },
    { key: 'status', title: 'Status', width: 10, align: 'center' as const },
  ];

  const data = [
    { name: 'Alice Johnson', age: 28, email: 'alice@example.com', status: 'Active' },
    { name: 'Bob Smith', age: 34, email: 'bob@example.com', status: 'Inactive' },
    { name: 'Charlie Brown', age: 22, email: 'charlie@example.com', status: 'Active' },
    { name: 'Diana Prince', age: 30, email: 'diana@example.com', status: 'Active' },
  ];

  return (
    <Box flexDirection="column">
      <Text bold>Table Component Demo</Text>

      <Box marginTop={1}>
        <Table columns={columns} data={data} />
      </Box>

      <Box marginTop={2}>
        <Text bold>Striped Table with Double Border</Text>
        <Box marginTop={1}>
          <Table columns={columns} data={data} borderStyle="double" striped />
        </Box>
      </Box>

      <Box marginTop={2}>
        <Text bold>Borderless Table</Text>
        <Box marginTop={1}>
          <Table columns={columns} data={data} borderStyle="none" />
        </Box>
      </Box>
    </Box>
  );
}

render(<TableDemo />);
