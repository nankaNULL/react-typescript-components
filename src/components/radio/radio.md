## 功能点

```jsx

Radio
/*
 * children?: React.ReactNode;
 * className?: string;
 * style?: React.CSSProperties;
 * value?: any,
 * autoFocus?: boolean;
 * checked?: boolean;
 * defaultChecked?: boolean;
 * disabled?: boolean;
 * onChange?: (event: MyRadioChangeEvent) => void
 */

RadioGroup
/*
 * children?: React.ReactNode;
 * className?: string;
 * style?: React.CSSProperties;
 * value?: any,
 * defaultChecked?: boolean;
 * disabled?: boolean;
 * onChange?: (event: MyRadioChangeEvent) => void
 */

RadioGroup 传递数据给 Radio 的时候 用到了 context, 父组件 -> 子组件传递数据可以用到这个

RadioGroup没有设置 value, defalutValue 时，如果子元素中存在checked = true 的项，则显示该项

RadioButton 感觉主要就是样式的改变，就不做了

```
## 待實現
```jsx
/*
 * Radio 的 ref 似乎是直接挂到 input 下的，没弄
 * onFocus(), onBlur()
 */

```

## 测试数据
```jsx
  <div>
    <span>radio: </span>
    <MyRadio value={1}>children</MyRadio>
    <MyRadio className="classname-test">className</MyRadio>
    <MyRadio value={2} style={{ border: '1px solid black' }}>style</MyRadio>
    <MyRadio value={3}>value</MyRadio>
    <MyRadio value={4} autoFocus>autoFocus</MyRadio>
    <MyRadio value={5} autoFocus={false}>autoFocus-false</MyRadio>
    <MyRadio value={6} checked>checked</MyRadio>
    <br />
    <MyRadio value={7} checked={false}> checked-false</MyRadio>
    <MyRadio value={8} defaultChecked>defaultChecked</MyRadio>
    <MyRadio value={9} defaultChecked={false}>defaultChecked-false</MyRadio>
    <MyRadio value={10} disabled>disabled</MyRadio>
    <MyRadio value={11} disabled={false}>disabled-false</MyRadio>
    <MyRadio value={2} onChange={() => console.log("change")}>onChange</MyRadio>
    <MyRadio value={2}>onChange1</MyRadio>
  </div>
```

