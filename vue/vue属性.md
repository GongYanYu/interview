###  Computed 和 Watch 的区别？

一般都在vue的created创建。

**作用不同**

- Computed 是计算属性，主要作用是用来缓存计算结果，为只读属性，只有所依赖的数据发生改变时才会重新计算。
- Watch 是监听器，主要用来监控数据变化，做出对应的逻辑操作。

**写法不同**

- Computed 写法是一个函数，返回最终计算结果，可以引用相应数据，如果响应式数据发生变化，Computed 将会重新计算缓存。
- Watch 写法是一个对象，对象的属性是需要监听的属性，属性对应的值是一个监听函数，函数参数依次为newValue、oldValue，也可以是一个对象里面有handler（函数参数为newValue、oldValue）、immediate（Boolean第一次初始化数据是否执行）、deep（是否深度监听）。

