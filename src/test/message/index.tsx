import React, { Fragment } from 'react';
import { MyMessage, MyButton } from '@/components';

export default class MessageTest extends React.PureComponent {
  handleSuccess = () => {
    MyMessage.success("success")
  }
  handleError = () => {
    MyMessage.error("error")
  }
  handleWarning = () => {
    MyMessage.warning("warning");
  }
  render() {
    return <Fragment>
      <MyButton onClick={this.handleSuccess}>MESSAGE.SUCCESS</MyButton>
      <MyButton onClick={this.handleError}>MESSAGE.ERROR</MyButton>
      <MyButton onClick={this.handleWarning}>MESSAGE.WARNING</MyButton>
    </Fragment>
  }
}