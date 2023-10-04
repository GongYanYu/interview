/*
快排
快排是经典的 divide & conquer 问题，如下用于描述快排的思想、伪代码、代码、复杂度计算以及快排的变形。

快排的思想
如下的三步用于描述快排的流程：

在数组中随机取一个值作为标兵
对标兵左、右的区间进行划分(将比标兵大的数放在标兵的右面，比标兵小的数放在标兵的左面，如果倒序就反过来)
重复如上两个过程，直到选取了所有的标兵并划分(此时每个标兵决定的区间中只有一个值，故有序)

 */
function sort(arr,s=0,e) {
  if (s>=e){
    return
  }
  if (!e){
    e=arr.length-1
  }
  let center=arr[s]
  let i=s,j=e
  while (i<j){
    while (i<j&&arr[j]>center) j--
    arr[i]=arr[j]
    while (i<j&&arr[i]<=center) i++
    arr[j]=arr[i]

  }
  arr[i]=center
  sort(arr,s,i-1)
  sort(arr,i+1,e)
  return arr
}

function swap(arr,i,j){
  let t=arr[i]
  arr[i]=arr[j]
  arr[j]=t
}
function sort2(arr,s=0,e) {
  if (s>=e){
    return
  }
  if (!e){
    e=arr.length-1
  }
  let bigIndex=s+1
  for (let i = bigIndex; i <= e; i++) {
    if (arr[s]>arr[i]){
      swap(arr,i,bigIndex)
      bigIndex++
    }
  }
  let i=bigIndex-1
  swap(arr,s,i)
  sort(arr,s,i-1)
  sort(arr,i+1,e)
  return arr
}

console.log(sort2([3, 4, 5, 1, 115, 5, 4]))

