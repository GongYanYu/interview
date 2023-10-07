// workerThread1.js

let i = 1
function simpleCount() {
  i++
  self.postMessage(i)
  setTimeout(simpleCount, 1000)
}

simpleCount()

self.addEventListener('message', ev => {
  postMessage(ev.data + ' 呵呵~')
},false)
