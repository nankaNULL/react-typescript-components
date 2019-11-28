import React, { Fragment } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { MyRadioChangeEvent } from './radio';
import './style.scss';;

interface RadioGroupProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  value?: any;
  defaultValue?: any;
  onChange?: (event: MyRadioChangeEvent) => void;
  disabled?: boolean;
}

interface RadioGroupState {
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

export const RadioContext = React.createContext<ContextParams>({
  radioGroup: {
    type: 'radio',
    value: undefined,
    disabled: false,
    onChange: () => null
  }
})

export default class MyRadioGroup extends React.PureComponent<RadioGroupProps, RadioGroupState> {
  constructor(props: RadioGroupProps) {
    super(props);
    this.state = {
      value: this.initValue()
    }
  }

  /**
   * // 老版context用法
   * // 用于说明所传递的数据类型
   * static childContextTypes = {
   *   radioGroup: PropTypes.any,
   * };
   * // getChildContext表示该组件通过context传递数据，
   * // 该方法返回的对象就是context需要传递的数据
   * getChildContext() {
   *   const { value } = this.state;
   *   const { disabled } = this.props;
   *   return {
   *     radioGroup: {
   *       value,
   *       disabled,
   *       onChange: this.hangleChange
   *     }
   *   };
   * }
   */
  // 同之前 getChildContext类似，返回所需数据，
  radioGroupContext = () => {
    const { value } = this.state;
    const { disabled } = this.props;
    return {
      type: 'radioGroup',
      value,
      disabled,
      onChange: this.hangleChange
    };
  }

  static getDerivedStateFromProps(nextProps: RadioGroupProps, prevState: RadioGroupState) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value
      }
    }
    return null;
  }

  // 初始化value的值
  initValue = () => {
    let value;
    if ('value' in this.props) {
      value = this.props.value;
    } else if ('defaultValue' in this.props) {
      value = this.props.defaultValue;
    } else {
      const childValue = this.getChildrenValue();
      value = childValue || undefined
    }
    return value;
  }

  // 查找子元素下的 checked 项，对defaultChecked 并没有做处理
  // 而且对checked = false 也并未做不可操作的处理
  getChildrenValue = () => {
    const { children = [] } = this.props;
    let value;
    Array.isArray(children) && children.forEach(child => {
      if (child.props && child.props.checked) {
        value = child.props.value;
      }
    })
    return value;
  }

  // onChange 方法
  hangleChange = (e: MyRadioChangeEvent) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
    if ('value' in this.props) {
      return;
    }
    this.setState({ value: e.target.value });
  }

  render() {
    const { children, className, style } = this.props;
    const prefixCls = 'radio-group';
    return <RadioContext.Provider value={{ radioGroup: this.radioGroupContext() }}>
      <span className={`${prefixCls} ${className}`} style={style}>
        {children}
      </span>
    </RadioContext.Provider>
  }
}
