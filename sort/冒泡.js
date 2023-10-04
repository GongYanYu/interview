
/*
冒泡排序

 */

function sort(arr) {
  for (let i = 0 ; i < arr.length; i++) {
    //优化：在非最坏的情况下，冒泡排序过程中，可以检测到整个序列是否已经排序完成，进而可以避免掉后续的循环
    for (let j = last; j < arr.length - i - 1; j++) {
      if (arr[j]>arr[j+1]){
        let t=arr[j]
        arr[j]=arr[j+1]
        arr[j+1]=t
      }
    }
    if (last===0){
      break
    }
  }
  return arr
}

console.log(sort([3,4,5,1,115,5,4]))
