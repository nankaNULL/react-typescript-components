import React, { Fragment } from 'react';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import { RadioGroupState } from 'antd/lib/radio/interface';
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

interface RadioState {
  value: any
}

export default class MyRadioGroup extends React.PureComponent<RadioGroupProps, RadioState> {
  constructor(props: RadioGroupProps) {
    super(props);
    this.state = {
      value: this.initValue()
    }
  }

  // 用于说明所传递的数据类型
  static childContextTypes = {
    radioGroup: PropTypes.any,
  };

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

  // getChildContext表示该组件通过context传递数据，
  // 该方法返回的对象就是context需要传递的数据
  getChildContext() {
    const { value } = this.state;
    const { disabled } = this.props;
    return {
      radioGroup: {
        value,
        disabled,
        onChange: this.hangleChange
      }
    };
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
    return <span className={`${prefixCls} ${className}`} style={style}>
      {children}
    </span>
  }
}
