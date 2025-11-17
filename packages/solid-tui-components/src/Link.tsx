import { Text } from '@sylphx/solid-tui';
import type { JSX } from 'solid-js';

export interface LinkProps {
  url: string;
  children?: JSX.Element;
  fallback?: boolean;
}

export function Link(props: LinkProps) {
  const { url, children, fallback = true } = props;

  // Check if terminal supports hyperlinks
  const supportsHyperlinks = () => {
    return (
      process.env.TERM_PROGRAM === 'iTerm.app' ||
      process.env.TERM_PROGRAM === 'WezTerm' ||
      process.env.TERM_PROGRAM === 'vscode' ||
      process.env.WT_SESSION ||
      process.env.KONSOLE_VERSION
    );
  };

  const renderLink = () => {
    const label = children || url;

    if (supportsHyperlinks()) {
      // OSC 8 hyperlink format: ESC ]8;;URL ESC \\ TEXT ESC ]8;; ESC \\
      const openLink = `\x1b]8;;${url}\x1b\\`;
      const closeLink = '\x1b]8;;\x1b\\';

      return (
        <Text color="blue" underline>
          {openLink}
          {label}
          {closeLink}
        </Text>
      );
    }

    if (fallback) {
      return (
        <Text color="blue" underline>
          {label} ({url})
        </Text>
      );
    }

    return (
      <Text color="blue" underline>
        {label}
      </Text>
    );
  };

  return renderLink();
}
