import { Box, Text, useFocus, useInput } from '@sylphx/solid-tui';
import { createEffect, createMemo, createSignal, For, type JSX } from 'solid-js';

export interface QuickSearchItem<V = any> {
  label: string;
  value: V;
  key?: string;
}

export interface QuickSearchInputProps<V = any> {
  items?: QuickSearchItem<V>[];
  isFocused?: boolean;
  placeholder?: string;
  limit?: number;
  caseSensitive?: boolean;
  indicatorComponent?: (props: { isSelected: boolean }) => JSX.Element;
  itemComponent?: (props: { isSelected: boolean; label: string }) => JSX.Element;
  onSelect?: (item: QuickSearchItem<V>) => void;
  onHighlight?: (item: QuickSearchItem<V>) => void;
  onChange?: (query: string) => void;
}

function DefaultIndicator(props: { isSelected: boolean }) {
  return <Text color={props.isSelected ? 'blue' : undefined}>{props.isSelected ? '>' : ' '} </Text>;
}

function DefaultItem(props: { isSelected: boolean; label: string }) {
  return <Text color={props.isSelected ? 'blue' : undefined}>{props.label}</Text>;
}

export function QuickSearchInput<V = any>(props: QuickSearchInputProps<V>) {
  const {
    items = [],
    isFocused: isFocusedProp = true,
    placeholder = 'Search...',
    limit,
    caseSensitive = false,
    indicatorComponent: IndicatorComponent = DefaultIndicator,
    itemComponent: ItemComponent = DefaultItem,
    onSelect,
    onHighlight,
    onChange,
  } = props;

  const [query, setQuery] = createSignal('');
  const [cursorOffset, setCursorOffset] = createSignal(0);
  const [selectedIndex, setSelectedIndex] = createSignal(0);
  const { isFocused } = useFocus({ isActive: isFocusedProp });

  // Filter items based on query
  const filteredItems = createMemo(() => {
    const q = query();
    if (!q) return items;

    const searchQuery = caseSensitive ? q : q.toLowerCase();
    return items.filter((item) => {
      const label = caseSensitive ? item.label : item.label.toLowerCase();
      return label.includes(searchQuery);
    });
  });

  // Reset selected index when filtered items change
  createEffect(() => {
    const filtered = filteredItems();
    if (selectedIndex() >= filtered.length) {
      setSelectedIndex(Math.max(0, filtered.length - 1));
    }
  });

  // Call onChange when query changes
  createEffect(() => {
    onChange?.(query());
  });

  // Call onHighlight when selection changes
  createEffect(() => {
    const filtered = filteredItems();
    const index = selectedIndex();
    if (filtered[index]) {
      onHighlight?.(filtered[index]);
    }
  });

  useInput(
    (input, key) => {
      // Navigation
      if (key.upArrow) {
        setSelectedIndex(Math.max(0, selectedIndex() - 1));
        return;
      }

      if (key.downArrow) {
        setSelectedIndex(Math.min(filteredItems().length - 1, selectedIndex() + 1));
        return;
      }

      // Select item
      if (key.return) {
        const filtered = filteredItems();
        const item = filtered[selectedIndex()];
        if (item) {
          onSelect?.(item);
        }
        return;
      }

      // Text editing - Left arrow
      if (key.leftArrow) {
        setCursorOffset(Math.max(0, cursorOffset() - 1));
        return;
      }

      // Text editing - Right arrow
      if (key.rightArrow) {
        setCursorOffset(Math.min(query().length, cursorOffset() + 1));
        return;
      }

      // Text editing - Backspace
      if (key.backspace) {
        if (cursorOffset() > 0) {
          const newQuery = query().slice(0, cursorOffset() - 1) + query().slice(cursorOffset());
          setQuery(newQuery);
          setCursorOffset(cursorOffset() - 1);
        }
        return;
      }

      // Text editing - Delete
      if (key.delete) {
        if (cursorOffset() < query().length) {
          const newQuery = query().slice(0, cursorOffset()) + query().slice(cursorOffset() + 1);
          setQuery(newQuery);
        }
        return;
      }

      // Ignore control keys
      if (key.ctrl || key.meta || key.escape || key.tab) {
        return;
      }

      // Regular character input
      const newQuery = query().slice(0, cursorOffset()) + input + query().slice(cursorOffset());
      setQuery(newQuery);
      setCursorOffset(cursorOffset() + input.length);
    },
    { isActive: isFocusedProp && isFocused() },
  );

  const getVisibleItems = () => {
    const filtered = filteredItems();
    if (!limit || filtered.length <= limit) {
      return filtered.map((item, index) => ({ item, index }));
    }

    const index = selectedIndex();
    const half = Math.floor(limit / 2);
    let start = Math.max(0, index - half);
    const end = Math.min(filtered.length, start + limit);

    if (end === filtered.length) {
      start = Math.max(0, end - limit);
    }

    return filtered.slice(start, end).map((item, i) => ({ item, index: start + i }));
  };

  const renderInput = () => {
    const q = query();
    if (q.length === 0 && placeholder) {
      return <Text dim>{placeholder}</Text>;
    }

    if (!isFocused()) {
      return <Text>{q}</Text>;
    }

    // Render with cursor
    const before = q.slice(0, cursorOffset());
    const char = q[cursorOffset()] || ' ';
    const after = q.slice(cursorOffset() + 1);

    return (
      <Text>
        {before}
        <Text color="bgWhite" bold>
          {char}
        </Text>
        {after}
      </Text>
    );
  };

  return (
    <Box flexDirection="column">
      <Box>{renderInput()}</Box>
      <Box flexDirection="column" marginTop={1}>
        <For each={getVisibleItems()}>
          {({ item, index }) => (
            <Box>
              <IndicatorComponent isSelected={index === selectedIndex()} />
              <ItemComponent isSelected={index === selectedIndex()} label={item.label} />
            </Box>
          )}
        </For>
        {filteredItems().length === 0 && query() && <Text dim>No results found</Text>}
      </Box>
    </Box>
  );
}
