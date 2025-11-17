import { Box, Text } from '@sylphx/solid-tui';
import { createMemo } from 'solid-js';

export interface ProgressBarProps {
  value?: number;
  total?: number;
  width?: number;
  character?: string;
  completeCharacter?: string;
  incompleteCharacter?: string;
  showPercentage?: boolean;
  color?: string;
}

export function ProgressBar(props: ProgressBarProps) {
  const {
    value = 0,
    total = 100,
    width = 20,
    character,
    completeCharacter = character || '█',
    incompleteCharacter = character || '░',
    showPercentage = true,
    color = 'green',
  } = props;

  const percentage = createMemo(() => {
    const pct = Math.min(100, Math.max(0, (value / total) * 100));
    return Math.round(pct);
  });

  const filledWidth = createMemo(() => {
    return Math.round((percentage() / 100) * width);
  });

  const renderBar = () => {
    const filled = filledWidth();
    const empty = width - filled;

    const filledBar = completeCharacter.repeat(filled);
    const emptyBar = incompleteCharacter.repeat(empty);

    return (
      <Text color={color}>
        {filledBar}
        <Text dim>{emptyBar}</Text>
      </Text>
    );
  };

  return (
    <Box>
      {renderBar()}
      {showPercentage && (
        <Text> {percentage()}%</Text>
      )}
    </Box>
  );
}
