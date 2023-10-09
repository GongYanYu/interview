
Function.prototype.mBind=function (ctx,...args) {
  const target=this
  return function (){
    const argsAll=args.concat(arguments)
    let targetIt=target?target:this
    return targetIt.apply(ctx,argsAll)
  }
}

const obj={
  name:1,
  value:2,
  c:1,
  d:2
}
const {name,v,...rest}=obj

console.log(name,v,rest)

