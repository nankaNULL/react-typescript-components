import React, { Fragment } from 'react';
import classNames from 'classnames';
import shallowequal from 'shallowequal';
import MyRadioGroup from './radioGroup';
import * as PropTypes from 'prop-types';
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
    // this.context;
  }

  // 在子组件中用于说明context接收的数据类型
  // 名字需对应，否则接收不到
  // static contextTypes = {
  //   radioGroup: PropTypes.any,
  // };

  // Radio.Group
  static Group: typeof MyRadioGroup;

  // 只要父组件重新渲染了，即使传入子组件的 props 未发生变化，那么子组件也会重新渲染，进而触发 render。
  // 所以当时 radioGroup 的 onChange 改变了state 之后，所有的radio组件都触发了这个函数
  // 通过判断 选择是否更新
  // pureComponent 和 Component 的区别就在于pureComponent多了一层shouldComponentUpdate(nextProps, nextState) 但他会阻止context
  // shouldComponentUpdate(nextProps: Readonly<RadioProps>, nextState: Readonly<RadioState>, nextContext: any) {
  //   console.log(nextProps, this.props, !shallowequal(nextProps, this.props))
  //   return (
  //     !shallowequal(nextProps, this.props)
  //     || !shallowequal(nextState, this.state)
  //     || !shallowequal(nextContext.radioGroup, this.context.radioGroup)
  //   )
  //   // shallowequal is like lodash's isEqualWith but for shallow (strict) equal.
  //   // 会比较 Object.keys(state | props) 的长度是否一致，
  //   // 每一个 key 是否两者都有，
  //   // 并且是否是一个引用，
  //   // 也就是只比较了第一层的值，确实很浅，所以深层的嵌套数据是对比不出来的。
  //   // 而 isEqual 进行了深比较，isEqualWith 比 isEqual 多了一个 customizer 来定制比较值
  // }

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