import React from 'react';
import classNames from 'classnames';

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
    return classNames('yuwan icon', {
      [`icon-${type}`]: Boolean(type),
      [`icon-spin`]: !!spin || type === 'loading',
    }, className)
  }

  render() {
    const { onClick, style } = this.props;
    return <i className={this.getIconClassName()} style={style} onClick={onClick} ></i>
  }
}