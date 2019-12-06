import React from 'react';

export interface IconProps {
  type?: string;
  spin?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
}

export default class MyIcon extends React.PureComponent<IconProps, {}>{
  getIconClassName(): string;
  render(): JSX.Element
}