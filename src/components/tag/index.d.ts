import React from 'react';

export interface TagProps {
  children?: React.ReactNode;
  closable?: boolean;
  onClose?: Function;
  visible?: boolean;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export interface TagState {
  visible: boolean;
}

export default class Tag extends React.PureComponent<TagProps, TagState> {
  // 点击关闭图标
  handleIconClose(e: React.MouseEvent<HTMLElement, MouseEvent>): void;

  // tag - class
  getTagClassName(): string;
  // tag 样式
  getTagStyle(): React.CSSProperties;

  render(): JSX.Element
}