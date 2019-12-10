import React from 'react';
import { MyRadioChangeEvent } from './radio';

export interface RadioGroupProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  value?: any;
  defaultValue?: any;
  onChange?: (event: MyRadioChangeEvent) => void;
  disabled?: boolean;
}

export interface RadioGroupState {
  value: any
}

export interface ContextParams {
  radioGroup: {
    type: string;
    value: any;
    disabled: boolean | undefined;
    onChange: (e: MyRadioChangeEvent) => void
  }
}

export const RadioContext: React.Context<ContextParams>;

export default class MyRadioGroup extends React.PureComponent<RadioGroupProps, RadioGroupState> {
  radioGroupContext(): any;
  static getDerivedStateFromProps(nextProps: RadioGroupProps, prevState: RadioGroupState): any;
  initValue(): any;

  // 查找子元素下的 checked 项，对defaultChecked 并没有做处理
  // 而且对checked = false 也并未做不可操作的处理
  getChildrenValue(): any;

  // onChange 方法
  hangleChange(e: MyRadioChangeEvent):void;

  render(): JSX.Element;
}
