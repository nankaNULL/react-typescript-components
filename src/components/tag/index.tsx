import React from 'react';
import classNames from 'classnames';
import MyIcon from '../icon';
import './style.scss';

interface TagProps {
  children?: React.ReactNode;
  closable?: boolean;
  onClose?: Function;
  visible?: boolean;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface TagState {
  visible: boolean;
}

export default class MyTag extends React.PureComponent<TagProps, TagState> {
  constructor(props: TagProps) {
    super(props);
    this.state = {
      visible: ('visible' in props ? props.visible : true) as boolean
    }
  }

  // 点击关闭图标
  handleIconClose = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const { closable, onClose } = this.props;
    if (closable && onClose) {
      onClose(e);
    }
    if (!('visible' in this.props)) {
      this.setState({ visible: false })
    }
  }

  // tag - class
  getTagClassName = () => {
    const { color, className } = this.props;
    const { visible } = this.state;
    return classNames('tag', {
      [`tag-hidden`]: !visible,
      [`tag-has-color`]: Boolean(color),
    }, className)
  }

  // tag 样式
  getTagStyle = () => {
    const { color } = this.props;
    return {
      backgroundColor: color,
      borderColor: color
    }
  }

  render() {
    const { children, closable } = this.props;
    return <span className={this.getTagClassName()} style={this.getTagStyle()}>
      {children}
      {closable && <MyIcon type="close" className="tag-close" onClick={this.handleIconClose} />}
    </span>
  }
}