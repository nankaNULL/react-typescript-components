import React from 'react';
import MyRadioGroup from './radioGroup';
import { RadioContext, ContextParams } from './radioGroup';


export interface RadioProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  value?: any,
  autoFocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (event: MyRadioChangeEvent) => void;
  context?: ContextParams
}

export interface RadioState {
  checked: boolean;
}

export interface RadioChangeEventTarget extends RadioProps {
}

// onChange 事件的 event 的参数定义
export interface MyRadioChangeEvent {
  target: RadioChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export declare class MyRadioContext extends React.Component<RadioProps, {}> {
  static Group: typeof MyRadioGroup;
  render(): JSX.Element
}

export default class MyRadio extends React.PureComponent<RadioProps, RadioState> {
  static Group: typeof MyRadioGroup;
  initChecked(): boolean;

  handleChange(e: React.ChangeEvent<HTMLInputElement>):void;

  // 实际暴露出来的onChange
  myChangeEvent(e: MyRadioChangeEvent): void

  render(): JSX.Element
}