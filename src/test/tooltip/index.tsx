import React, { Fragment } from 'react';
import { MyTooltip, MyButton } from '@/components';
import { Tooltip } from 'antd';
interface IState {
  visible: boolean;
}

export default class TooltipTest extends React.PureComponent<{}, IState> {
  state: IState = {
    visible: true
  }

  handleClick = () => {
    this.setState({ visible: !this.state.visible })
  }
  render() {
    const { visible } = this.state;
    return <Fragment>
      <div className="mb-10">
        <p className="mb-10">visible : </p>
        <MyTooltip className="mr-10" title="test" visible={visible} defaultVisible={true} placement="right" style={{ marginRight: 80 }}><MyButton>visible</MyButton></MyTooltip>
        <Fragment>
          <span>&lt;=&nbsp;</span>
          <MyButton onClick={this.handleClick}>点击更改左边visible状态</MyButton>
        </Fragment>
      </div>
      <div className="mb-10">
        <p className="mb-10">defaultVisible : </p>
        <MyTooltip className="mr-10" title="test" defaultVisible placement="right"><MyButton>defaultVisible</MyButton></MyTooltip>
      </div>
      <div className="mb-10">
        <p className="mb-10">trigger ( 'click' | 'hover' ) 默认 'hover' : </p>
        <Fragment>
          <MyTooltip className="mr-10" title="test" trigger="click"><MyButton>click</MyButton></MyTooltip>
          <MyTooltip className="mr-10" title="test" trigger="hover"><MyButton>hover</MyButton></MyTooltip>
        </Fragment>
      </div>
      <div className="mb-10">
        <p className="mb-10">placement ( 'top' | 'right' | 'bottom' | 'left' ) 默认 'top' : </p>
        <Fragment>
          <MyTooltip className="mr-10" title="test" placement="top"><MyButton>top</MyButton></MyTooltip>
          <MyTooltip className="mr-10" title="test" placement="right"><MyButton>right</MyButton></MyTooltip>
          <MyTooltip className="mr-10" title="test" placement="bottom"><MyButton>bottom</MyButton></MyTooltip>
          <MyTooltip className="mr-10" title="test" placement="left"><MyButton>left</MyButton></MyTooltip>
        </Fragment>
      </div>
      <Tooltip title="test" visible={visible}>test</Tooltip>
    </Fragment>
  }
}
