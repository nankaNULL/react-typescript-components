import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames'
import './style.scss';

type TooltipTrigger = 'hover' | 'click';
type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
  children?: React.ReactNode;
  title?: React.ReactNode | (() => React.ReactNode);
  visible?: boolean;
  defaultVisible?: boolean;
  trigger?: TooltipTrigger;
  placement?: TooltipPlacement;
  mouseEnterDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface TooltipState {
  visible: boolean;
}

export default class MyTooltip extends React.PureComponent<TooltipProps, TooltipState> {
  constructor(props: TooltipProps) {
    super(props);
    this.state = {
      visible: !!props.visible || !!props.defaultVisible || false,
      // 这里其实还很粗糙，如果是visible={false}，他会往下找defaultValue, 而不是直接拿visible的false值
      // 这个问题在后面getDerivedStateFromProps中通过判断props中是否存在visible属性解决
    }
    this.tooltip = document.createElement('div');
    this.child = document.createElement('div');
  }
  private tooltip: HTMLDivElement;
  private child: HTMLDivElement;

  static getDerivedStateFromProps(nextProps: TooltipProps) {
    if ('visible' in nextProps) {
      return { visible: nextProps.visible };
    }
    return null;
  }

  componentDidMount() {
    this.createContent();
  }

  // 创建最外层，并挂在body上
  createContent = () => {
    let tip = document.createElement("div");
    tip.style.position = 'absolute';
    tip.style.top = '0px';
    tip.style.left = '0px';
    tip.style.width = '100%';
    document.body.appendChild(tip);

    this.createChildren(tip);
  }

  // 创建内部子节点
  createChildren = async (parent: HTMLElement) => {
    const { title, placement } = this.props;
    let child = <div>
      <div className="tooltip" ref={(child: HTMLDivElement) => this.child = child}>
        <div className="tooltip-arrow"></div>
        <div className="tooltip-content">{title}</div>
      </div>
    </div>;
    await ReactDOM.render(child, parent);
    this.setChildrenStyle();
  }

  // 设置子节点显示隐藏，位置
  setChildrenStyle = () => {
    const { placement } = this.props;
    const { visible } = this.state;
    this.child.className = classNames("tooltip", {
      [`tooltip-placement-${placement}`]: Boolean(placement),
      ['tooltip-hidden']: !visible
    })

    this.setChildrenPosition();
  }

  // 设置子节点位置
  setChildrenPosition = () => {
    const rect = this.tooltip.getBoundingClientRect(); // { left, right, top, bottom, height, width }
    const { placement } = this.props;
    let style = {
      top: '0px',
      left: '0px',
      transform: ''
    }
    if (placement === 'top' || !placement) {
      style.top = `${rect.top - this.child.offsetHeight - 10}px`;
    } else if (placement === 'right') {
      style.left = `${rect.left + rect.width + 10}px`;
    } else if (placement === 'bottom') {
      style.top = `${rect.top + rect.height + 10}px`;
    } else if (placement === 'left') {
      style.left = `${rect.left - this.child.offsetWidth - 10}px`
    }

    if (placement === 'top' || placement === 'bottom' || !placement) {
      style.left = `${rect.left + rect.width / 2}px`;
      style.transform = 'translateX(-50%)';
    }
    if (placement === 'left' || placement === 'right') {
      style.top = `${rect.top + rect.height / 2}px`;
      style.transform = 'translateY(-50%)';
    }
    this.child.style.top = style.top;
    this.child.style.left = style.left;
    this.child.style.transform = style.transform;
  }

  saveTooltip = (tooltip: HTMLDivElement) => {
    this.tooltip = tooltip
  }

  // tooltip 的 显示隐藏
  tooltipVisible = (visible: boolean) => {
    if ('visible' in this.props) {
      return;
    }
    this.setState({ visible }, () => {
      this.setChildrenStyle()
    })
  }

  // 鼠标进入事件
  onMouseEnter = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.tooltipVisible(true);
  }

  // 鼠标离开事件
  onMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.tooltipVisible(false);
  }

  // 点击事件
  onClick = () => {
    const { visible } = this.state;
    this.tooltipVisible(!visible);
  }

  render() {
    const { trigger, className, style, children } = this.props;
    const { visible } = this.state;
    return <span
      ref={this.saveTooltip}
      style={style}
      onMouseEnter={trigger === 'click' ? undefined : this.onMouseEnter}
      onMouseLeave={trigger === 'click' ? undefined : this.onMouseLeave}
      onClick={trigger === 'click' ? this.onClick : undefined}
      className={classNames({
        'tooltip-hidden': !visible
      }, className)}
    >{children}</span>
  }
}
