import { Box, Text } from '@sylphx/solid-tui';

export interface DividerProps {
  title?: string;
  width?: number;
  character?: string;
  color?: string;
  titleColor?: string;
  padding?: number;
}

export function Divider(props: DividerProps) {
  const {
    title,
    width = 50,
    character = '─',
    color = 'dim',
    titleColor,
  } = props;

  const renderDivider = () => {
    if (!title) {
      return <Text color={color}>{character.repeat(width)}</Text>;
    }

    const titleWithPadding = ` ${title} `;
    const titleLength = titleWithPadding.length;
    const sideLength = Math.floor((width - titleLength) / 2);
    const remainder = width - titleLength - (sideLength * 2);

    const leftSide = character.repeat(sideLength);
    const rightSide = character.repeat(sideLength + remainder);

    return (
      <Box>
        <Text color={color}>{leftSide}</Text>
        <Text color={titleColor || color}>{titleWithPadding}</Text>
        <Text color={color}>{rightSide}</Text>
      </Box>
    );
  };

  return <Box>{renderDivider()}</Box>;
}
