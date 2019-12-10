import React from 'react';
import { Collapse } from 'antd';
import { ButtonTest, IconTest, MessageTest, RadioTest, TagTest, TooltipTest } from '@/test';
import '@/components/style';
const { Panel } = Collapse;

export default class Home extends React.PureComponent {
  render() {
    return (
      <div className="page-home">
        <Collapse defaultActiveKey={[6]}>
          <Panel header="button" key={1}>
            <ButtonTest />
          </Panel>
          <Panel header="icon" key={2}>
            <IconTest />
          </Panel>
          <Panel header="message" key={3}>
            <MessageTest />
          </Panel>
          <Panel header="radio" key={4}>
            <RadioTest />
          </Panel>
          <Panel header="tag" key={5}>
            <TagTest />
          </Panel>
          <Panel header="tooltip" key={6}>
            <TooltipTest />
          </Panel>
        </Collapse>
      </div>
    )
  }
}