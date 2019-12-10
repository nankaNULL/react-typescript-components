

## radio

#### 功能点

属性 | 说明 | 类型 | 默认值 
-|-|-|-
value | 值 | any | - |
autoFocus | 自动获取焦点 | boolean | false |
checked | 是否选中 | boolean | false |
defaultChecked | 初始选中状态 | boolean | false |
disabled | 禁止状态 | boolean | false |
onChange | 选中状态变化时触发的事件 | (event: MyRadioChangeEvent) => void | - |


## Group

#### 功能点

属性 | 说明 | 类型 | 默认值 
-|-|-|-
value | 当前选中的值 | any | - |
defalutValue | 初始时选中的值 | any | - |
disabled | 禁止状态 | boolean | false |
onChange | 选中状态变化时触发的事件 | (event: MyRadioChangeEvent) => void | - |


## 其他

RadioGroup 传递数据给 Radio 的时候 用到了 context, 父组件 -> 子组件传递数据可以用到这个

RadioGroup没有设置 value, defalutValue 时，如果子元素中存在checked = true 的项，则显示该项

RadioButton 感觉主要就是样式的改变，就不做了

## 待實現
```jsx
/*
 * Radio 的 ref 似乎是直接挂到 input 下的，没弄
 * onFocus(), onBlur()
 * Group options 配置子元素
 */
```

