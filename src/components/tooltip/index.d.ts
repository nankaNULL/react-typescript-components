import React from 'react';

export declare type TooltipTrigger = 'hover' | 'click';
export declare type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  children?: React.ReactNode;
  title?: React.ReactNode | (() => React.ReactNode);
  visible?: boolean;
  defaultVisible?: boolean;
  trigger?: TooltipTrigger;
  placement?: TooltipPlacement;
  mouseEnterDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export interface TooltipState {
  visible: boolean;
}

export default class MyTooltip extends React.PureComponent<TooltipProps, TooltipState> {
  private tooltip: HTMLDivElement;
  private child: HTMLDivElement;

  static getDerivedStateFromProps(nextProps: TooltipProps): any;

  componentDidMount(): void;

  // 创建最外层，并挂在body上
  createContent(): void;
  // 创建内部子节点
  createChildren(parent: HTMLElement): void;

  // 设置子节点显示隐藏，位置
  setChildrenStyle(): void;

  // 设置子节点位置
  setChildrenPosition(): void;

  saveTooltip(tooltip: HTMLDivElement): void;

  // tooltip 的 显示隐藏
  tooltipVisible(visible: boolean): void;

  // 鼠标进入事件
  onMouseEnter(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;

  // 鼠标离开事件
  onMouseLeave(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;

  // 点击事件
  onClick(): void;

  render(): JSX.Element;
}
