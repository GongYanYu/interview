

function klhFunc(func) {
  if (typeof func !=='function'){
    return
  }
  const argsLen=func.length
  const current=[]

  function klh (x) {
    current.push(x)
    if (argsLen<=current.length){
       return func.apply(this,current)
    }else {
      return klh
    }
  }

  return klh
}


//test

function test(a,b,c){
  console.log(a+b+c+this.d)
}

const func=klhFunc(test)

d=10000

func(1)(2)(3)

