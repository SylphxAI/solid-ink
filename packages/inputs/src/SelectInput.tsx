import { Box, Text, useFocus, useInput } from '@sylphx/solid-tui';
import { createEffect, createSignal, For, type JSX } from 'solid-js';

export interface SelectInputItem<V = any> {
  label: string;
  value: V;
  key?: string;
}

export interface SelectInputProps<V = any> {
  items?: SelectInputItem<V>[];
  isFocused?: boolean;
  initialIndex?: number;
  limit?: number;
  indicatorComponent?: (props: { isSelected: boolean }) => JSX.Element;
  itemComponent?: (props: { isSelected: boolean; label: string }) => JSX.Element;
  onSelect?: (item: SelectInputItem<V>) => void;
  onHighlight?: (item: SelectInputItem<V>) => void;
}

function DefaultIndicator(props: { isSelected: boolean }) {
  return <Text color={props.isSelected ? 'blue' : undefined}>{props.isSelected ? '>' : ' '} </Text>;
}

function DefaultItem(props: { isSelected: boolean; label: string }) {
  return <Text color={props.isSelected ? 'blue' : undefined}>{props.label}</Text>;
}

export function SelectInput<V = any>(props: SelectInputProps<V>) {
  const {
    items = [],
    isFocused: isFocusedProp = true,
    initialIndex = 0,
    limit,
    indicatorComponent: IndicatorComponent = DefaultIndicator,
    itemComponent: ItemComponent = DefaultItem,
    onSelect,
    onHighlight,
  } = props;

  const [selectedIndex, setSelectedIndex] = createSignal(
    Math.min(initialIndex, Math.max(0, items.length - 1)),
  );
  const { isFocused } = useFocus({ isActive: isFocusedProp });

  // ASSUMPTION: Notify on highlight change
  createEffect(() => {
    const index = selectedIndex();
    if (items[index]) {
      onHighlight?.(items[index]);
    }
  });

  useInput(
    (input, key) => {
      if (key.upArrow || input === 'k') {
        setSelectedIndex(Math.max(0, selectedIndex() - 1));
        return;
      }

      if (key.downArrow || input === 'j') {
        setSelectedIndex(Math.min(items.length - 1, selectedIndex() + 1));
        return;
      }

      if (key.return) {
        const item = items[selectedIndex()];
        if (item) {
          onSelect?.(item);
        }
        return;
      }

      // Number key selection (1-9)
      const num = Number.parseInt(input, 10);
      if (!Number.isNaN(num) && num >= 1 && num <= items.length) {
        const index = num - 1;
        setSelectedIndex(index);
        onSelect?.(items[index]);
        return;
      }
    },
    { isActive: isFocusedProp && isFocused() },
  );

  const getVisibleItems = () => {
    if (!limit || items.length <= limit) {
      return items.map((item, index) => ({ item, index }));
    }

    const index = selectedIndex();
    const half = Math.floor(limit / 2);

    let start = Math.max(0, index - half);
    const end = Math.min(items.length, start + limit);

    // Adjust if at the end
    if (end === items.length) {
      start = Math.max(0, end - limit);
    }

    return items.slice(start, end).map((item, i) => ({ item, index: start + i }));
  };

  return (
    <Box flexDirection="column">
      <For each={getVisibleItems()}>
        {({ item, index }) => (
          <Box>
            <IndicatorComponent isSelected={index === selectedIndex()} />
            <ItemComponent isSelected={index === selectedIndex()} label={item.label} />
          </Box>
        )}
      </For>
    </Box>
  );
}
