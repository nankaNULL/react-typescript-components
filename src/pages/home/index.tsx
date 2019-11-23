import React from 'react';
import { Radio, message, Button, Card, Icon, Collapse } from 'antd';
import { connect } from 'react-redux';
import { API } from '@/api';
import MyButton from '@/components/button';
import MyIcon from '@/components/icon';
import MyTooltip from '@/components/tooltip';
const RadioGroup = Radio.Group;
const { Panel } = Collapse;

interface IState {
  radioValue: number;
  loading: boolean;
}
interface IProps {
  history: any
}

const mapState = (state: any) => state.global;
const mapDispatch = () => { };

class Home extends React.PureComponent<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = {
      radioValue: 1,
      loading: false
    }
  }

  componentDidMount() {
    API.getToken().then((res: any) => {
      const { result, result_message } = res;
      if (result) {
        message.success(result_message)
      } else {
        message.error(result_message);
      }
    })
    console.log(document.cookie);
  }

  handleChange = (e: any) => {
    this.setState({
      radioValue: e.target.value
    })
  }

  handleClick = () => {
    console.log("click button");
  }

  render() {
    const { radioValue, loading } = this.state;
    return (
      <div className="page-home">
        <Collapse defaultActiveKey={[1, 2, 3]}>
          <Panel header="button" key={1}>
            <MyButton type="primary" loading={loading}>MY BUTTON</MyButton>
          </Panel>
          <Panel header="icon" key={2}>
            <MyIcon type="bilibili" />
          </Panel>
          <Panel header="tooltip" key={3}>
            <MyTooltip title="this is tooltip content" trigger="hover" mouseEnterDelay={0.5}>this is text</MyTooltip>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Home);

/**
 * mouseEnterDelay
 * mouseLeaveDelay // 这两个delay似乎是和显示隐藏的加载动画有关系
 */