const koa = require('koa')
const app = new koa()
const route = require('koa-route')


app.use(route.get('/test',async function(ctx){
  console.log(ctx.req)

  const obj={
    name:'koa node server',
    success:true
  }


  ctx.response.body = `
 callback(${JSON.stringify(obj)})
  `
}))

app.listen(8848)
