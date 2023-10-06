
const data={
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
  }else {

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

observe(data)

data.name=12121
data.value=12121*2
data.data.name=12121*2
data.data.name2=12121*2


console.log(data)
