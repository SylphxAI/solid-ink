import { Box, Text, useFocus, useInput } from '@sylphx/solid-tui';
import { createEffect, createSignal, For, type JSX } from 'solid-js';

export interface MultiSelectItem<V = any> {
  label: string;
  value: V;
  key?: string;
}

export interface MultiSelectProps<V = any> {
  items?: MultiSelectItem<V>[];
  isFocused?: boolean;
  initialIndex?: number;
  defaultValue?: V[];
  limit?: number;
  checkboxComponent?: (props: { isSelected: boolean }) => JSX.Element;
  itemComponent?: (props: { isSelected: boolean; isChecked: boolean; label: string }) => JSX.Element;
  onSelect?: (items: MultiSelectItem<V>[]) => void;
  onHighlight?: (item: MultiSelectItem<V>) => void;
  onChange?: (items: MultiSelectItem<V>[]) => void;
}

function DefaultCheckbox(props: { isSelected: boolean }) {
  return <Text color={props.isSelected ? 'blue' : undefined}>{props.isSelected ? '>' : ' '} </Text>;
}

function DefaultItem(props: { isSelected: boolean; isChecked: boolean; label: string }) {
  const checkbox = props.isChecked ? '[×]' : '[ ]';
  return (
    <Text color={props.isSelected ? 'blue' : undefined}>
      {checkbox} {props.label}
    </Text>
  );
}

export function MultiSelect<V = any>(props: MultiSelectProps<V>) {
  const {
    items = [],
    isFocused: isFocusedProp = true,
    initialIndex = 0,
    defaultValue = [],
    limit,
    checkboxComponent: CheckboxComponent = DefaultCheckbox,
    itemComponent: ItemComponent = DefaultItem,
    onSelect,
    onHighlight,
    onChange,
  } = props;

  const [selectedIndex, setSelectedIndex] = createSignal(
    Math.min(initialIndex, Math.max(0, items.length - 1)),
  );

  // Track which items are checked (by value)
  const [checkedValues, setCheckedValues] = createSignal<Set<V>>(
    new Set(defaultValue),
  );

  const { isFocused } = useFocus({ isActive: isFocusedProp });

  // Call onHighlight when selection changes
  createEffect(() => {
    const index = selectedIndex();
    if (items[index]) {
      onHighlight?.(items[index]);
    }
  });

  // Call onChange when checked items change
  createEffect(() => {
    const checked = checkedValues();
    const checkedItems = items.filter((item) => checked.has(item.value));
    onChange?.(checkedItems);
  });

  const toggleCurrentItem = () => {
    const item = items[selectedIndex()];
    if (!item) return;

    setCheckedValues((prev) => {
      const next = new Set(prev);
      if (next.has(item.value)) {
        next.delete(item.value);
      } else {
        next.add(item.value);
      }
      return next;
    });
  };

  const handleSubmit = () => {
    const checked = checkedValues();
    const checkedItems = items.filter((item) => checked.has(item.value));
    onSelect?.(checkedItems);
  };

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

      if (input === ' ') {
        toggleCurrentItem();
        return;
      }

      if (key.return) {
        handleSubmit();
        return;
      }

      // Number key selection (1-9)
      const num = Number.parseInt(input, 10);
      if (!Number.isNaN(num) && num >= 1 && num <= items.length) {
        setSelectedIndex(num - 1);
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

    if (end === items.length) {
      start = Math.max(0, end - limit);
    }

    return items.slice(start, end).map((item, i) => ({ item, index: start + i }));
  };

  return (
    <Box flexDirection="column">
      <For each={getVisibleItems()}>
        {({ item, index }) => {
          const isSelected = index === selectedIndex();
          const isChecked = checkedValues().has(item.value);

          return (
            <Box>
              <CheckboxComponent isSelected={isSelected} />
              <ItemComponent isSelected={isSelected} isChecked={isChecked} label={item.label} />
            </Box>
          );
        }}
      </For>
    </Box>
  );
}
