import React from 'react';
import MyIcon from '../icon';
import classNames from 'classnames';

type ButtonType = 'primary' | 'danger' | 'default';
type ButtonShape = 'circle' | 'round';
type ButtonSize = 'small' | 'large';
interface ButtonProps {
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

const prefixCls = 'btn';

export default class MyButton extends React.PureComponent<ButtonProps, {}>{
  constructor(props: ButtonProps) {
    super(props);
  }

  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { onClick, loading } = this.props;
    if (loading) {
      return;
    }
    if (onClick) {
      onClick(e);
    }
  }

  getButtonClassName = () => {
    const { type, shape, size, loading, ghost, block, className } = this.props;
    return classNames('btn', {
      [`${prefixCls}-${type}`]: Boolean(type),
      [`${prefixCls}-${shape}`]: Boolean(shape),
      [`${prefixCls}-${size}`]: Boolean(size),
      [`${prefixCls}-loading`]: !!loading,
      [`${prefixCls}-ghost`]: !!ghost,
      [`${prefixCls}-block`]: !!block,
    }, className)
  }

  render() {
    const { icon, loading, disabled, style, children } = this.props;
    let iconType = loading ? 'loading' : icon;
    return (
      <button
        className={this.getButtonClassName()}
        style={style}
        disabled={!!disabled}
        onClick={this.handleClick}>
        {iconType && <MyIcon type={iconType} />}
        <span>{children}</span>
      </button>
    )
  }
}