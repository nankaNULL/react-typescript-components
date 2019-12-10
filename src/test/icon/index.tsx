import React, { Fragment } from 'react';
import { MyIcon } from '@/components';

export default class IconTest extends React.PureComponent {
  render() {
    return <Fragment>
      <div className="mb-10">
        <p className="mb-10">type ( 图标类型 ) : </p>
        <Fragment>
          <MyIcon className="mr-10" type="bilibili" />
          <MyIcon className="mr-10" type="zan" />
        </Fragment>
      </div>
      <div className="mb-10">
        <p className="mb-10">spin ( 图标是否旋转，loading图标默认旋转 ) : </p>
        <Fragment>
          <MyIcon className="mr-10" type="close" spin />
          <MyIcon type="loading" />
        </Fragment>
      </div>
    </Fragment>
  }
}