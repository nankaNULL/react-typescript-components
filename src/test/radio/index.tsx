import React, { Fragment } from 'react';
import { Divider } from 'antd';
import { MyRadio } from '@/components';
import { MyRadioChangeEvent } from '@/components/radio/radio';
const MyRadioGroup = MyRadio.Group;

interface IState {
  value: any;
}

export default class RadioTest extends React.PureComponent<{}, IState> {
  state: IState = {
    value: 1
  }

  handleChange = (e: MyRadioChangeEvent) => {
    console.log(e)
  }

  handleRadioGroupChange = (e: MyRadioChangeEvent) => {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    const { value } = this.state;
    return <Fragment>
      <Fragment>
        <h1>Radio</h1>
        <Divider style={{ margin: '12px 0' }} />
        <div className="mb-10">
          <p className="mb-10">autoFocus & checked & defaultChecked & disabeld ( 基于原生input[type="radio"]属性实现 ) :  </p>
          <Fragment>
            <MyRadio value={1} autoFocus>autoFocus</MyRadio>
            <MyRadio value={2} checked>checked</MyRadio>
            <MyRadio value={3} defaultChecked>defaultChecked</MyRadio>
            <MyRadio value={4} disabled>disabeld</MyRadio>
          </Fragment>
        </div>
        <div className="mb-10">
          <p className="mb-10">onChange ( console.log(e) ) :  </p>
          <MyRadio value={5} onChange={this.handleChange}>onChange</MyRadio>
        </div>
      </Fragment>
      <Fragment>
        <h1 style={{ marginTop: 20 }}>RadioGroup</h1>
        <Divider style={{ margin: '12px 0' }} />
        <div className="mb-10">
          <p className="mb-10">value : </p>
          <div style={{ marginLeft: 20 }}>
            <p className="mb-10">value === 1 : </p>
            <MyRadioGroup className="mb-10" value={1}>
              <MyRadio value={1}>1</MyRadio>
              <MyRadio value={2} checked>2</MyRadio>
            </MyRadioGroup>
            <p className="mb-10">未定义value，但{`<MyRadio value={2} checked>2</MyRadio>`} : </p>
            <MyRadioGroup className="mb-10">
              <MyRadio value={1}>1</MyRadio>
              <MyRadio value={2} checked>2</MyRadio>
            </MyRadioGroup>
          </div>
        </div>
        <div className="mb-10">
          <p className="mb-10">defaultValue : </p>
          <MyRadioGroup defaultValue={1}>
            <MyRadio value={1}>1</MyRadio>
            <MyRadio value={2}>2</MyRadio>
          </MyRadioGroup>
        </div>
        <div className="mb-10">
          <p className="mb-10">disabled : </p>
          <MyRadioGroup defaultValue={1} disabled>
            <MyRadio value={1}>1</MyRadio>
            <MyRadio value={2}>2</MyRadio>
          </MyRadioGroup>
        </div>
        <div className="mb-10">
          <p className="mb-10">onChange, 并且value值受onChange事件影响 : </p>
          <MyRadioGroup value={value} onChange={this.handleRadioGroupChange}>
            <MyRadio value={1}>1</MyRadio>
            <MyRadio value={2}>2</MyRadio>
          </MyRadioGroup>
        </div>
      </Fragment>
    </Fragment>
  }
}