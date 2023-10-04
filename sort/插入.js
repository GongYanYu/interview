/*
插入排序

 */

function sort(arr) {
  for (let i = 1; i < arr.length; i++) {
    while (arr[i-1]>arr[i]&&i>=1){
      let t=arr[i]
      arr[i]=arr[i-1]
      arr[i-1]=t
      i--
    }
  }
  return arr
}

console.log(sort([3, 4, 5, 1, 115, 5, 4]))
