
// const testUrl=`https://www.baidu.com/s?ie=UTF-8&wd=encodeURI()%20encodeURIComponent()+中文`
//
//
// console.log(encodeURI(testUrl))
//
//
// console.log(encodeURIComponent(testUrl))



// 分割
function divideUrl(url) {
  if (!url){
    return
  }
  url=url.trim()
  const res={}
  let index=url.indexOf(':')
  res.protocol=url.substring(0,index)
  url=url.substring(index+3)
  index=url.indexOf('/')
  res.host=url.substring(0,index)
  url=url.substring(index)
  index=url.indexOf('?')
  if (index!==-1){
    res.path=url.substring(0,index)
    res.params=url.substring(index)
  }else {
    res.path=url
  }

  return res
}

console.log(divideUrl('https://www.nowcoder.com/feed/main/detail/73f929ffed7b4896bfe02511a9b1e597?sourceSSR=search'))
