import React from 'react';
import classNames from 'classnames';
import MyRadioGroup from './radioGroup';
import { RadioContext, ContextParams } from './radioGroup';

interface RadioProps {
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

interface RadioState {
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

// export function MyRadioContext() {
export default class MyRadioContext extends React.Component<RadioProps, {}> {
  constructor(props: RadioProps) {
    super(props);
  }
  static Group: typeof MyRadioGroup;

  render() {
    return <RadioContext.Consumer>
      {(context: ContextParams) => <MyRadio {...this.props} context={context} />}
    </RadioContext.Consumer>
  }
}

class MyRadio extends React.PureComponent<RadioProps, RadioState> {
  constructor(props: RadioProps) {
    super(props);
    this.state = {
      checked: this.initChecked()
    }
  }

  // Radio.Group
  static Group: typeof MyRadioGroup;

  // 初始化checked 
  initChecked = () => {
    let checked = false;
    if ('checked' in this.props) {
      checked = this.props.checked as boolean;
    }
    if ('defaultChecked' in this.props) {
      checked = this.props.defaultChecked as boolean;
    }
    return checked;
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.myChangeEvent({
      target: {
        ...this.props,
      },
      stopPropagation: function stopPropagation() {
        e.stopPropagation();
      },
      preventDefault: function preventDefault() {
        e.preventDefault();
      },
      nativeEvent: e.nativeEvent as MouseEvent
    });
  }

  // 实际暴露出来的onChange
  myChangeEvent = (e: MyRadioChangeEvent) => {
    const { context, onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
    if (context && context.radioGroup && context.radioGroup.onChange) {
      context.radioGroup.onChange(e);
    }
    if ('checked' in this.props) {
      return;
    }
    this.setState({ checked: !this.state.checked })
  }

  render() {
    const { children, className, style, context, ...restProps } = this.props;
    const { checked } = this.state;
    const prefixCls = 'radio';
    const inputProps = {
      ...restProps // checked, defaultChecked, autoFocus, value
      // 这几个属性是原生就带有的，可以通过原生的属性值来控制单选框当前状态
      // 但其实对于checked & defaultChecked，感觉，并没有什么卵用，还是要在onChange 中做一层判断
    }
    let radioGroup = context && context.radioGroup ? context.radioGroup : undefined;

    if (radioGroup && radioGroup.type === 'radioGroup') {
      inputProps.checked = radioGroup.value === this.props.value;
      inputProps.disabled = this.props.disabled || radioGroup.disabled;
    }
    return (
      <label className={classNames('radio-wrapper', className)} style={style}>
        <span className={classNames('radio', {
          [`${prefixCls}-checked`]: radioGroup && radioGroup.type === 'radioGroup' ? inputProps.checked : checked,
          [`${prefixCls}-disabled`]: inputProps.disabled
        })} >
          <input {...inputProps} type="radio" className="radio-input" onChange={this.handleChange} />
          <span className="radio-inner"></span>
        </span>
        <span>{children}</span>
      </label>
    )
  }
}