import React from 'react';
import classNames from 'classnames';
import './iconfont.js';

interface IconProps {
  type?: string;
  spin?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void);
}

export default class MyIcon extends React.PureComponent<IconProps, {}>{
  constructor(props: IconProps) {
    super(props);
  }

  getIconClassName = () => {
    const { type, spin, className } = this.props;
    return classNames('icon', {
      [`icon-spin`]: !!spin || type === 'loading',
    }, className)
  }

  render() {
    const { onClick, style, type } = this.props;
    return <span onClick={onClick}>
      <svg className={this.getIconClassName()} style={style} aria-hidden="true">
        <use xlinkHref={`#icon-${type}`}></use>
      </svg>
    </span>
  }
}