import React, { Fragment } from 'react';
import { MyTag } from '@/components';

export default class TagTest extends React.PureComponent {
  handleClose = () => {
    console.log("close");
  }
  render() {
    return <Fragment>
      <div className="mb-10">
        <p className="mb-10">color : </p>
        <Fragment>
          <MyTag className="mr-10" color="lightcoral" >lightcoral</MyTag>
          <MyTag className="mr-10" color="#aaa">#aaa</MyTag>
        </Fragment>
      </div>
      <div className="mb-10">
        <p className="mb-10">closable & onClick : </p>
        <Fragment>
          <MyTag className="mr-10" closable onClose={this.handleClose}>closable</MyTag>
        </Fragment>
      </div>
    </Fragment>
  }
}