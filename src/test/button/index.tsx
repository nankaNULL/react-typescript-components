import React, { Fragment } from 'react';
import { MyButton } from '@/components';

interface IState {
  loading: boolean;
}
export default class ButtonTest extends React.PureComponent<{}, IState> {
  state = {
    loading: false
  }

  handleClick = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false })
    }, 1000)
  }

  render() {
    const { loading } = this.state;
    return <Fragment>
      <div className="mb-10">
        <p className="mb-10">type ( 'primay' | 'danger' | 'default' ) 默认'default' : </p>
        <Fragment>
          <MyButton className="mr-10" >type-default</MyButton>
          <MyButton className="mr-10" type="primary">primary</MyButton>
          <MyButton className="mr-10" type="danger">danger</MyButton>
          <MyButton className="mr-10" type="default">default</MyButton>
        </Fragment>
      </div>
      <div className="mb-10">
        <p className="mb-10">shape ( 'circle' | 'round' ) 默认default 不带图形样式 : </p>
        <Fragment>
          <MyButton className="mr-10" >shape-default</MyButton>
          <MyButton className="mr-10" shape="circle">circle</MyButton>
          <MyButton className="mr-10" shape="round">round</MyButton>
        </Fragment>
      </div>
      <div className="mb-10">
        <p className="mb-10">size ( 'small' | 'large' ) 默认default 介入两种大小之间 : </p>
        <Fragment>
          <MyButton className="mr-10" >size-default</MyButton>
          <MyButton className="mr-10" size="small">small</MyButton>
          <MyButton className="mr-10" size="large">large</MyButton>
        </Fragment>
      </div>
      <div className="mb-10">
        <p className="mb-10">loading & onClick: </p>
        <p className="mb-10">loading状态下的按钮不可进行操作 </p>
        <Fragment>
          <MyButton className="mr-10" loading={loading} >loading</MyButton>
          <MyButton className="mr-10" onClick={this.handleClick}>click</MyButton>
        </Fragment>
      </div>
      <div className="mb-10">
        <p className="mb-10">disabled: </p>
        <p className="mb-10">disabled状态下的按钮不可进行操作 </p>
        <Fragment>
          <MyButton className="mr-10" disabled>disabled</MyButton>
        </Fragment>
      </div>
      <div className="mb-10">
        <p className="mb-10">ghost ( 透明背景 ) : </p>
        <Fragment>
          <MyButton className="mr-10" ghost type="primary">ghost</MyButton>
        </Fragment>
      </div>
      <div className="mb-10">
        <div className="mb-10">block (块级) : </div>
        <Fragment>
          <MyButton className="mr-10" block>block</MyButton>
        </Fragment>
      </div>
    </Fragment>
  }
}