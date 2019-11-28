import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { last } from 'lodash';
import { message } from 'antd';
import './style.scss';

interface MessageProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}


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

  createMessage() {
    if (!this.container) {
      let div = document.createElement('div');
      let body = document.body;
      div.className = 'message-container';
      body.appendChild(div);
      this.container = div;
    }
    this.createContent();
  }

  createContent() {
    let lastNotice = last(this.notice);
    let key = lastNotice ? lastNotice.key + 1 : 0;
    let element = <div key={key} className="message-content">
      <div className="message">{this.message}</div>
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
    this.createMessage();
  }

  error(message: string) {
    this.message = message;
    this.createMessage();
  }
}

export const MyMessage = new MsgClass();