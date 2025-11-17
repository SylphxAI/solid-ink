import { Box, Text } from '@sylphx/solid-tui';
import { createMemo, For } from 'solid-js';
import stringWidth from 'string-width';

export interface TableColumn<T = any> {
  key: string;
  title: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: T) => string;
}

export interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  borderStyle?: 'single' | 'double' | 'none';
  headerColor?: string;
  borderColor?: string;
  striped?: boolean;
  stripeColor?: string;
}

const BORDER_STYLES = {
  single: {
    topLeft: '┌',
    topRight: '┐',
    topJoin: '┬',
    middleLeft: '├',
    middleRight: '┤',
    middleJoin: '┼',
    bottomLeft: '└',
    bottomRight: '┘',
    bottomJoin: '┴',
    horizontal: '─',
    vertical: '│',
  },
  double: {
    topLeft: '╔',
    topRight: '╗',
    topJoin: '╦',
    middleLeft: '╠',
    middleRight: '╣',
    middleJoin: '╬',
    bottomLeft: '╚',
    bottomRight: '╝',
    bottomJoin: '╩',
    horizontal: '═',
    vertical: '║',
  },
  none: {
    topLeft: '',
    topRight: '',
    topJoin: '',
    middleLeft: '',
    middleRight: '',
    middleJoin: '',
    bottomLeft: '',
    bottomRight: '',
    bottomJoin: '',
    horizontal: '',
    vertical: ' ',
  },
};

export function Table<T = any>(props: TableProps<T>) {
  const {
    columns,
    data,
    borderStyle = 'single',
    headerColor = 'blue',
    borderColor = 'white',
    striped = false,
    stripeColor = 'bgBlack',
  } = props;

  const border = BORDER_STYLES[borderStyle];

  // Calculate column widths
  const columnWidths = createMemo(() => {
    return columns.map((col) => {
      if (col.width) return col.width;

      // Calculate width based on header and data
      let maxWidth = stringWidth(col.title);

      for (const row of data) {
        const value = col.render
          ? col.render((row as any)[col.key], row)
          : String((row as any)[col.key] || '');
        const width = stringWidth(value);
        if (width > maxWidth) {
          maxWidth = width;
        }
      }

      return maxWidth;
    });
  });

  const padCell = (value: string, width: number, align: 'left' | 'center' | 'right' = 'left') => {
    const valueWidth = stringWidth(value);
    const padding = width - valueWidth;

    if (padding <= 0) return value;

    if (align === 'right') {
      return ' '.repeat(padding) + value;
    }

    if (align === 'center') {
      const leftPad = Math.floor(padding / 2);
      const rightPad = padding - leftPad;
      return ' '.repeat(leftPad) + value + ' '.repeat(rightPad);
    }

    return value + ' '.repeat(padding);
  };

  const renderBorder = (left: string, join: string, right: string, horizontal: string) => {
    if (borderStyle === 'none') return null;

    const widths = columnWidths();
    const segments = widths.map((w) => horizontal.repeat(w + 2)); // +2 for padding

    return (
      <Text color={borderColor}>
        {left}
        {segments.join(join)}
        {right}
      </Text>
    );
  };

  const renderHeader = () => {
    const widths = columnWidths();

    return (
      <Box>
        {borderStyle !== 'none' && <Text color={borderColor}>{border.vertical}</Text>}
        <For each={columns}>
          {(col, i) => (
            <>
              <Text color={headerColor} bold>
                {' '}
                {padCell(col.title, widths[i()], col.align)}{' '}
              </Text>
              {i() < columns.length - 1 && borderStyle !== 'none' && (
                <Text color={borderColor}>{border.vertical}</Text>
              )}
            </>
          )}
        </For>
        {borderStyle !== 'none' && <Text color={borderColor}>{border.vertical}</Text>}
      </Box>
    );
  };

  const renderRow = (row: T, index: number) => {
    const widths = columnWidths();
    const isStriped = striped && index % 2 === 1;

    return (
      <Box>
        {borderStyle !== 'none' && <Text color={borderColor}>{border.vertical}</Text>}
        <For each={columns}>
          {(col, i) => {
            const value = col.render
              ? col.render((row as any)[col.key], row)
              : String((row as any)[col.key] || '');
            const paddedValue = padCell(value, widths[i()], col.align);

            return (
              <>
                <Text color={isStriped ? stripeColor : undefined}> {paddedValue} </Text>
                {i() < columns.length - 1 && borderStyle !== 'none' && (
                  <Text color={borderColor}>{border.vertical}</Text>
                )}
              </>
            );
          }}
        </For>
        {borderStyle !== 'none' && <Text color={borderColor}>{border.vertical}</Text>}
      </Box>
    );
  };

  return (
    <Box flexDirection="column">
      {renderBorder(border.topLeft, border.topJoin, border.topRight, border.horizontal)}
      {renderHeader()}
      {renderBorder(border.middleLeft, border.middleJoin, border.middleRight, border.horizontal)}
      <For each={data}>{(row, i) => renderRow(row, i())}</For>
      {renderBorder(border.bottomLeft, border.bottomJoin, border.bottomRight, border.horizontal)}
    </Box>
  );
}
