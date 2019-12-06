import React from 'react';

export declare type ButtonType = 'primary' | 'danger' | 'default';
export declare type ButtonShape = 'circle' | 'round';
export declare type ButtonSize = 'small' | 'large';
export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  type?: ButtonType;
  shape?: ButtonShape;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  ghost?: boolean;
  block?: boolean;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

export default class MyButton extends React.PureComponent<ButtonProps, {}>{
  handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  getButtonClassName(): string;
  render(): JSX.Element;
}