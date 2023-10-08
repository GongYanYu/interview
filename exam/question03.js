const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.on('line', function (line) {
  const tokens = line.split(' ');
  console.log(parseInt(tokens[0]) + parseInt(tokens[1]));
});

// -1 -2 -3 代表炸了 -5表示不通  {time:0,boom:false}
function doFind(i, j, mapList, visitList, time = 0) {
  let n = mapList.length, m = mapList[0].length
  let ans = Math.min()
  let diff=[{x:-1,y:0},{x:0,y:-1},{x:1,y:0},{x:0,y:1}]
  for (let obj of diff) {
    let x=i+obj.x,y=j+obj.y
    if (x<0||x>=n||y<0||y>=m||visitList[x][y]){
      continue
    }
    visitList[x][y]=true
    let res=doFind(x,y,mapList,visitList,time+1)
    if(res.boom>0){

    }
    visitList[x][y]=false
  }
  return {
    //boom 2 1 true ; 0 no
    time:ans,boom:0
  }
}
