
class Compile{

  /**
   *
   * @param el 根元素
   * @param vm vue instance
   */
  constructor(el,vm) {
    this.$vm=vm
  }

  /**
   * 更新界面数据
   * @param el
   */
  compile(el=new HTMLElement){
    //使用伪代码写哈
    const childNodes = el.childNodes

    for (const node of childNodes) {
      //1. vue 通过 nodeType 判断节点类型 具体可以看看此文章 https://www.cnblogs.com/wyongz/p/11446477.html
      //2. 根据不同类型分开渲染的（例如html元素或纯文本节点）。
      //3. 无论经过怎样解析需要调用
      this.update()

    }

  }

  // 通用update方法
  update(node, exp, dir) {
    // 获取更新函数 this[dir + 'Updator']是vue源码操作
    let updator = this[dir + 'Updator'];
    // 初始化，首次页面赋值
    //...
    //...
    // 创建Watcher  obj   key    function
    new Watcher(this.$vm, exp, function(value) {
      updator && updator(node, value);
    })
  }

}

class Watcher{
  constructor($vm, key, updateFunc) {
    this.$vm=$vm
    this.key=key
    this.updateFunc=updateFunc
    //实现将key添加到对相应Dep中 可以使用多种办法这里使用Getter实现
    Reflect.set(Dep,'watcher',this)
    $vm[key]
    Reflect.set(Dep,'watcher',null)
  }

  update(){
    this.updateFunc.call(this.$vm,this.$vm[this.key])
  }
}
class Dep{
  watchers=[]
  constructor(name) {
    this.depName=name
  }

  add(w){
    this.watchers.push(w)
  }

  notify(){
    this.watchers.forEach(e=>{
      e.update()
    })
  }
}

