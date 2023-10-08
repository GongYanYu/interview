
const obj={
  name:1,
  log(){
    console.log(this.name)
  }
}
const func=obj.log
obj.log()

func()
