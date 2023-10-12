# Vue响应式原理

## 1 目的

Vue 通过**数据劫持**获取数据变化，利用**发布-订阅模式**，在当数据发生改变时自动响应到界面上。

## 2 原理

1. **Obeserve 建立数据劫持（观察）。**通过js的Object.defineProperty（vue3使用Proxy）监听劫持数据对象的每一个属性的Getter和Setter（如果属性是对象，对于内部的修改将无法监听到，如何需要深度监听每一个对象可以使用递归遍历每一个对象类型的属性建立Getter和Setter，实现深度监听）。
2. **Compile 编译和解析 html 模板。**将界面引用的变量进行替换并通过添加订阅者Watcher与界面建立关系，将建立的Watcher添加到对于数据的Dep（属性订阅器：就是发布订阅模式的中间器代理，内部维护着所有绑定此属性所有的Watcher，当属性发生改变可以统一一起通知Watcher进行界面修改）。Watcher中必须有一个update函数用于通知更新界面。
3. **响应式过程。**当数据发生改变时，通过Obeserve 中Setter获取到改动动作和新数据，通过Dep属性订阅器通知每一个订阅者Watcher更新界面。Vue的MVVM模型便是包含Obeserve（观察的数据） 、Compile（解析模板将变量替换成数据） 、Watcher（建立Obeserve与Compile关系，实现依赖收集，统一更新）。



## 3 实现

### Obeserve  数据劫持

```js
/**
 * 实现数据监听
 * 使用Object.defineProperty实现响应式坏处：
 * 1.无法监听对象属性的添加、删除（可以使用vue中$set）
 * 2.对于数组无法监听下标变化，所以通过下标添加属性无法监听到（vue内部做了优化数组常用的操作函数如
 * push/pop/shift/unshift/splice/sort/reverse可以响应）
 * @param obj
 * @param deep 深度监听
 */
function observe(obj,deep=false) {
  if (obj==null||typeof obj !== 'object'){
    console.log('not is a object')
    return
  }
  for (let objKey in obj) {
    const value=obj[objKey]
    if (deep&&value!=null&&typeof value ==='object'){
      observe(value)
    }
    defineObserve(obj,objKey,value)
  }
}

function defineObserve(obj,key,val) {
  Object.defineProperty(obj,key,{
    get() {
      //可以在这里实现收集订阅者，因为Compile需要获取数据，必然需要调用Getter
      return val
    },
    set(v) {
      //新旧相同 pass
      if (val === v){
        return
      }
      //可以在这里调用Dep中所有Watcher的update通知所有订阅界面更新
      console.log('update view')
      //更新数据
      val = v
    }
  })
}

/**
 * vue3
 * 使用 ES6新特性 Proxy实现响应式：
 * 1.可以劫持对象、数组的元素的添加和删除；
 * 2.需要使用new操作符，并返回一个新的Proxy对象。
 * @param obj
 * @param deep
 */
function observeVue3(obj,deep=false) {
  if (obj==null||typeof obj !== 'object'){
    console.log('not is a object')
    return
  }
  if (deep){
    for (const objKey in obj) {
      const value=obj[objKey]
      if (value&&typeof value === 'object'){
        obj[objKey]=observeVue3(value,deep)
      }
    }
  }
  return new Proxy(obj,{
    get(target, p, receiver) {
      return Reflect.get(target,p,receiver)
    },
    set(target, p, newValue, receiver) {
      const old = Reflect.get(target,p,receiver)
      if (old===newValue){
        return
      }
      //更新
      Reflect.set(target,p,newValue,receiver)

      //通知
      console.log('update view',p)
    },
    defineProperty(target, property, attributes) {
      //监控删除
    }
  })
}


const obj={
  name:1,
  object:{
    test:1,
  }
}
function testVue2() {
  observe(obj,true)
  obj.object.test=2
}

function testVue3() {
  const objProxy = observeVue3(obj,true)
  objProxy.name=2
  objProxy.object.test=2
}

testVue3()
```

testVue3效果

![image-20231011231534420](https://raw.githubusercontent.com/GongYanYu/images/main/image-20231011231534420.png)



### Compile 解析

```js

class Compile{

  /**
   *
   * @param el 根元素
   * @param vm vue instance
   */
  constructor(el,vm) {
    this.$vm=vm
  }

  /**
   * 更新界面数据
   * @param el
   */
  compile(el=new HTMLElement){
    //使用伪代码写哈
    const childNodes = el.childNodes

    for (const node of childNodes) {
      //1. vue 通过 nodeType 判断节点类型 具体可以看看此文章 https://www.cnblogs.com/wyongz/p/11446477.html
      //2. 根据不同类型分开渲染的（例如html元素或纯文本节点）。
      //3. 无论经过怎样解析需要调用
      this.update()

    }

  }

  // 通用update方法
  update(node, exp, dir) {
    // 获取更新函数 this[dir + 'Updator']是vue源码操作
    let updator = this[dir + 'Updator'];
    // 初始化，首次页面赋值
    //...
    //...
    // 创建Watcher  obj   key    function
    new Watcher(this.$vm, exp, function(value) {
      updator && updator(node, value);
    })
  }

}

class Watcher{
  constructor($vm, key, updateFunc) {
    this.$vm=$vm
    this.key=key
    this.updateFunc=updateFunc
    //实现将key添加到对相应Dep中 可以使用多种办法这里使用Getter实现
    Reflect.set(Dep,'watcher',this)
    $vm[key]
    Reflect.set(Dep,'watcher',null)
  }

  update(){
    this.updateFunc.call(this.$vm,this.$vm[this.key])
  }
}
class Dep{
  watchers=[]
  constructor(name) {
    this.depName=name
  }

  add(w){
    this.watchers.push(w)
  }

  notify(){
    this.watchers.forEach(e=>{
      e.update()
    })
  }
}

```

也需要修改 obeseve，这里以vue2 举例

```js
function defineObserve(obj,key,val) {
  const dep=new Dep(key)
  Object.defineProperty(obj,key,{
    get() {
      //可以在这里实现收集订阅者，因为Compile需要获取数据，必然需要调用Getter
      if (Dep['watcher']){
        dep.add(Dep['watcher'])
      }
      return val
    },
    set(v) {
      //新旧相同 pass
      if (val === v){
        return
      }
      //可以在这里调用Dep中所有Watcher的update通知所有订阅界面更新
      console.log('update view')
      dep.notify()
      //更新数据
      val = v
    }
  })
}
```











