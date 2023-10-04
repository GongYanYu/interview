
const obj={
  name:'name1',
  value:1,
  data:{
    name:'name1',
    value:1,
  }
}

function observe(obj) {
  if (obj&&typeof obj ==='object'){
    for (const objKey in obj) {
      defineReactive(obj,objKey,obj[objKey])
    }
  }
}

function defineReactive(obj,key,val) {
  Object.defineProperty(obj,key,{
    get() {
      return val
    },
    set(v) {
      val=v
      observe(v)
      console.log(key+' update ',v)
    }
  })
  observe(val)
}

observe(obj)

obj.name=12121
obj.value=12121*2
obj.data.name2=12121*2


console.log(obj)
