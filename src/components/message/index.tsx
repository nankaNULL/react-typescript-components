import React from 'react';
import ReactDOM from 'react-dom';
import { last } from 'lodash';
import MyIcon from '../icon';

interface MessageProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

let messageIcon = {
  'success': { type: 'check-circle-fill', color: '#33cc33' },
  'error': { type: 'close-circle-fill', color: '#ff4400' },
  'warn': { type: 'info-circle-fill', color: 'orange' },
}
type messageIconType = 'success' | 'error' | 'warn';

class MsgClass {
  container: HTMLElement | undefined;
  notice: Array<any>;
  message: string;
  key: number;
  constructor() {
    this.container = undefined;
    this.message = '';
    this.notice = [];
    this.key = 0;
  }

  createMessage(type: messageIconType) {
    if (!this.container) {
      let div = document.createElement('div');
      let body = document.body;
      div.className = 'message-container';
      body.appendChild(div);
      this.container = div;
    }
    this.createContent(type);
  }

  createContent(type: messageIconType) {
    let lastNotice = last(this.notice);
    let key = lastNotice ? lastNotice.key + 1 : 0;
    let icon = messageIcon[type];
    let element = <div key={key} className="message-content">
      <div className="message">
        <MyIcon type={icon.type} style={{ color: icon.color }} />
        <span>{this.message}</span>
      </div>
    </div>;
    this.notice.push({
      element,
      time: new Date(),
      delay: 5000,
      key: key
    });
    this.startTime(key);
    let content = <span>{this.notice.map(item => item.element)}</span>
    ReactDOM.render(content, this.container as HTMLElement);
  }

  startTime(key: number) {
    let clearTime = setTimeout(() => {
      this.close(key, clearTime);
    }, 2000);
  }

  close(key: number, clearTime: NodeJS.Timeout) {
    let idx = this.notice.findIndex(item => item.key === key);
    this.notice.splice(idx, 1);
    clearTimeout(clearTime);

    let content = <span>{this.notice.map(item => item.element)}</span>
    ReactDOM.render(content, this.container as HTMLElement);
  }

  success(message: string) {
    this.message = message;
    this.createMessage("success");
  }

  error(message: string) {
    this.message = message;
    this.createMessage("error");
  }

  warning(message: string) {
    this.message = message;
    this.createMessage("warn");
  }
}

const MyMessage = new MsgClass();
export default MyMessage;