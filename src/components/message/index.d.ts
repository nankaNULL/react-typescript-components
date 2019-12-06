export declare type messageIconType = 'success' | 'error' | 'warn';

declare class MsgClass {
  container: HTMLElement | undefined;
  notice: Array<any>;
  message: string;
  key: number;

  createMessage(type: messageIconType): void;

  createContent(type: messageIconType): void;

  startTime(key: number): void;

  close(key: number, clearTime: NodeJS.Timeout): void;

  success(message: string): void;

  error(message: string): void;

  warning(message: string): void;
}

export default MyMessage;