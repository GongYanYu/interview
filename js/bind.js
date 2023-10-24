
Function.prototype.mBind=function (ctx,...args) {
  const target=this
  return function (){
    const argsAll=args.concat(Array.from(arguments))
    let targetIt=target?target:this
    return targetIt.apply(ctx,argsAll)
  }
}

function test(a,b) {
  console.log(a+b+this.c)
}


const obj={
  name:1,
  value:2,
  c:1,
  d:2
}
test.mBind(obj)()
