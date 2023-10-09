
const api=new Promise(resolve => {
  setTimeout(resolve,1000)
})

async function getData() {
  await api
  return [1,2,3]
}


async function getAll() {
  let count=0,allData=[]
  async function getOnce() {
    if (allData.length>=100||count>=6){
      return
    }
    count++
    const data=await getData()
    allData=allData.concat(data)
    count--
    if (allData.length<100){
      await getOnce()
    }
  }

  await new Promise(resolve => {
    for (let i = 0; i <6; i++) {
      getOnce().then(()=>{
        if (allData.length>=100){
          resolve()
        }
      })
    }
  })

  console.log(allData)
}

getAll()
