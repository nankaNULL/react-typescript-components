# react-typescript-components
基于react + typescript 的组件库
## Install

```bash
npm install yuwan
```

```bash
yarn add yuwan
```
## Usage

```jsx
import { MyButton } from 'yuwan';
ReactDOM.render(<MyButton />, mountNode);
```

### 按需引入
如果你是babel7.x的版本，请在.babelrc.js中配置以下信息

```jsx
module.exports = {
  ...
  "plugins": [
    ...
    ["import", { 
      "libraryName": "yuwan", 
      "style": true,
      "customName": (name) => {
        let curName = name.split('-')[1];
        return `yuwan/lib/${curName}`
      },
    }, "yuwan"],
  ]
}
```

如果你是babel6.x的版本，请直接引入css文件
```jsx
import 'yuwan/lib/style/index.css'
```

### TypeScript
已添加声明文件，支持在ts下使用

## 其他
目前已有组件为 Button, Tag, Tooltip, message, Radio, Icon

参考antd, 写的比较粗糙，希望大姐多给点意见，特别是message和Tooltip这两个组件

一个是message其实是创建了一个类，然后输出了用这个类new出来的一个对象，这个写法感觉不是特别好

然后Tooltip的悬浮框，这里直接是对DOM元素进行了操作以达到效果，这样做也不确定好不好