import React from 'react';
import { Radio, message, Button, Card, Icon } from 'antd';
import { connect } from 'react-redux';
import { API } from '@/api';
import MyButton from '@/components/button';
const RadioGroup = Radio.Group;

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

    this.setState({loading: true})
    setTimeout(() => {
      this.setState({loading: false})
    }, 1000)
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
        <Card title="button">
          <MyButton type="primary" loading={loading}>MY BUTTON</MyButton>
        </Card>
      </div>
    )
  }
}

export default connect(mapState, mapDispatch)(Home);
