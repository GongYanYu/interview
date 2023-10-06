
function observe(obj) {
  for (const objKey in obj) {
    let data=obj[objKey]
    if (typeof data ==='object'&& data!=null){
      obj[objKey]=defineReactive(obj)
    }
  }
  return defineReactive(obj)
}

function defineReactive(obj) {
  return new Proxy(obj,{
    get(target, p, receiver) {
      return Reflect.get(target,p,receiver)
    },

    set(target, p, newValue, receiver) {
      if (typeof newValue ==='object'&& newValue!=null){
        newValue=defineReactive(newValue)
      }

      Reflect.set(target,p,newValue,receiver)

      console.log(p+' update ',newValue)
    }
  })
}

const obj= observe({
  name:'name1',
  value:1,
  data:{
    name:'name1',
    value:1,
  }
})

obj.name=12121
obj.nameNew=111
obj.value=12121*2
obj.data.name2=12121*2
obj.data2={name:1}
obj.data2.name=2


// console.log(obj)
