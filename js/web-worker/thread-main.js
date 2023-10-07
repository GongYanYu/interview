

const worker=new Worker('thread-worker.js',{
  name:'myWorker'
})
function postData() {
  worker.postMessage('test data')

  worker.addEventListener('message',ev=>{
    console.log('main get data = ',ev)
  },false)
}

postData()
