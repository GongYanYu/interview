







## script 标签中 defer 和 async 的区别

[script 标签中 defer 和 async 的区别 - 掘金 (juejin.cn)](https://juejin.cn/post/7111693402579664932)





# 深拷贝



## js代码实现 考虑互相引用、自我引用问题

```js
function deepCopy(obj, map = new Map()) {

  if (!obj || typeof obj !== 'object') {
    return obj
  }

  if (map.has(obj)) {
    return map.get(obj)
  }

  let res = Object.create(Object.getPrototypeOf(obj))
  map.set(obj, res)
  if (obj instanceof Array){
    res = []
    map.set(obj, res)
    for (const key in obj) {
      res.push(deepCopy(obj[key], map))
    }
  }else if (obj instanceof Map){
    res = new Map()
    map.set(obj, res)
    for (const key of obj.keys()) {
      res.set(key, deepCopy(obj.get(key), map))
    }
  }else if (obj instanceof Set){
    res = new Set()
    map.set(obj, res)
    for (const v of obj) {
      res.add(deepCopy(v, map))
    }
  }else{
    //保留原型链关系
    res = Object.create(Object.getPrototypeOf(obj))
    map.set(obj, res)
    for (const key in obj) {
      res[key] = deepCopy(obj[key], map)
    }
  }
  return res
}

function Parent() {
  // this.q=1
  // this.b={name: 1}
  this.map=new Map
  this.arr=[1,2,32]
  this.map.set(1,1)
  this.set=new Set
  this.set.add(1)
}

Parent.prototype.log=function () {
  console.log(this.q)
}

const A = new Parent()
A.A = A
const AT = deepCopy(A)

console.log(A )
console.log(AT )

```



#  async/await generator底层原理

[JavaScript 引擎是如何实现 async/await 的-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1965452)



