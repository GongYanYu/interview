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
    defineObserve(obj,objKey,value,deep)
  }
}

function defineObserve(obj,key,val,deep) {
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
      if (deep&&v!=null&&typeof v ==='object'){
        observe(v)
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

      if (deep&&newValue&&typeof newValue === 'object'){
        newValue=observeVue3(newValue,deep)
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
  obj.object={name:1}
  obj.object.name=2
}

function testVue3() {
  const objProxy = observeVue3(obj,true)
  objProxy.object2={name:1}
  objProxy.object2.name=2
}

testVue3()
