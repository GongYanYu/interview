function fastPow(x,y,mod) {
  if (y===1){
    return x%mod
  }
  let res=(y%2?x:1)*fastPow((x*x)%mod,Math.floor(y/2),mod)
  return res%mod
}

console.log(fastPow(5,5,3000))
