
function formatNumber(num) {
  if (typeof num!=='number'||num<1000){
    return num
  }
  let res=''
  while (num){
    let need=(num%1000).toString()
    if (num>=1000){
      while (need.length<3){
        need='0'+need
      }
      res=','+need+res
    }else {
      res=need+res
    }
    num=Math.floor(num/1000)
  }

  return res
}

console.log(formatNumber(1000000))
