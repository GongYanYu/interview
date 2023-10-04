/**
 * 快速幂
 * @param x 底数
 * @param n 幂数
 * @param m mod
 * @return {number}
 */
function fastMi(x, n, m){
  let res = 1
  while (n > 0){
    if (n % 2 === 1){
      res = res * x % m
    }
    x = x * x % m
    n /= 2
  }
  return res
}

console.log(fastMi(6,32,107))

