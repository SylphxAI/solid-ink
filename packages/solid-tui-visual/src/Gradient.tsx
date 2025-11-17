import { Text } from '@sylphx/solid-tui';
import gradient from 'gradient-string';

export interface GradientProps {
  children: string;
  colors?: string[];
  name?:
    | 'rainbow'
    | 'atlas'
    | 'cristal'
    | 'teen'
    | 'mind'
    | 'morning'
    | 'vice'
    | 'passion'
    | 'fruit'
    | 'instagram'
    | 'retro'
    | 'summer'
    | 'pastel';
}

// Pre-defined gradient themes
const GRADIENTS = {
  rainbow: gradient('red', 'yellow', 'green', 'cyan', 'blue', 'magenta'),
  atlas: gradient('#feac5e', '#c779d0', '#4bc0c8'),
  cristal: gradient('#bdfff3', '#4ac29a'),
  teen: gradient('#77a1d3', '#79cbca', '#e684ae'),
  mind: gradient('#473b7b', '#3584a7', '#30d2be'),
  morning: gradient('#ff5f6d', '#ffc371'),
  vice: gradient('#5ee7df', '#b490ca'),
  passion: gradient('#f43b47', '#453a94'),
  fruit: gradient('#ff4e50', '#f9d423'),
  instagram: gradient('#833ab4', '#fd1d1d', '#fcb045'),
  retro: gradient(
    '#3f51b1',
    '#5a55ae',
    '#7b5fac',
    '#8f6aae',
    '#a86aa4',
    '#cc6b8e',
    '#f18271',
    '#f3a469',
    '#f7c978',
  ),
  summer: gradient('#fdbb2d', '#22c1c3'),
  pastel: gradient('#eea2a2', '#bbc1bf', '#57c6e1', '#b49fda', '#7ac5d8'),
};

export function Gradient(props: GradientProps) {
  const { children, colors, name = 'rainbow' } = props;

  const applyGradient = () => {
    if (colors && colors.length > 0) {
      // Custom colors
      return gradient(...colors)(children);
    }

    // Pre-defined gradient
    if (name && GRADIENTS[name]) {
      return GRADIENTS[name](children);
    }

    // Fallback to rainbow
    return GRADIENTS.rainbow(children);
  };

  return <Text>{applyGradient()}</Text>;
}
