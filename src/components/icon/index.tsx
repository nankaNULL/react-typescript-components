import React from 'react';
import classNames from 'classnames';
import './style.scss';

interface IconProps {
  type?: string;
  spin?: boolean
}

export default class MyIcon extends React.PureComponent<IconProps, {}>{
  constructor(props: IconProps) {
    super(props);
  }

  render() {
    const { type, spin } = this.props;
    return <i className={classNames('yuwan icon', {
      [`icon-${type}`]: Boolean(type),
      [`icon-spin`]: !!spin || type === 'loading'
    })}></i>
  }
}