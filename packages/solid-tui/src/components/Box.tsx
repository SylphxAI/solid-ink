import { JSX, splitProps, mergeProps } from 'solid-js';

export interface BoxProps {
  children?: JSX.Element;
  width?: number | string;
  height?: number | string;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  margin?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number | string;
  display?: 'flex' | 'none';
}

export function Box(props: BoxProps) {
  const merged = mergeProps({ flexDirection: 'column' as const }, props);
  const [styleProps, otherProps] = splitProps(merged, [
    'width',
    'height',
    'minWidth',
    'minHeight',
    'maxWidth',
    'maxHeight',
    'padding',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'margin',
    'marginLeft',
    'marginRight',
    'marginTop',
    'marginBottom',
    'flexDirection',
    'justifyContent',
    'alignItems',
    'flexGrow',
    'flexShrink',
    'flexBasis',
    'display',
  ]);

  // Convert style props to style: attributes
  const styleAttrs: Record<string, any> = {};
  Object.entries(styleProps).forEach(([key, value]) => {
    if (value !== undefined) {
      styleAttrs[`style:${key}`] = value;
    }
  });

  return <box {...styleAttrs} {...otherProps} />;
}
