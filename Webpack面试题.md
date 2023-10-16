> **Webpack面试题整理**

# 1.什么是loader？什么是plugin？

- loader 本质为一个函数，将文件编译成可执行文件。webpack完成的工作是将依赖分析与tree shinking对于类似.vue或.scss结尾的文件无法编译理解这就需要实现一个loader完成文件转译成js、html、css、json等可执行文件。
- plugin本质也为一个函数，通过订阅webpack串行流程上的事件，实现扩展webpack功能，改变webpack输出结果。

**区别：**

1. 执行时机不同。loader主要是倒序执行，从后往前将一个loader的输出作为它前一个loader的输入，直到运行完所有loader；plugin执行执行时机在与通过订阅webpack串行流程上的事件，当webpack运行到对应订阅事件时执行，可以运行在整个生命周期内。
2. 侧重功能不同。loader主要完成文件操作；plugin主要是实现除loader以外功能，扩展webpack功能。
3. 配置方式不同。loader配置到module.rules，rules是一个数组，每一个元素是一个对象，每个对象包含属性test（检验目标文件类型）、use:（loader数组，从后往前执行）、options（配置）；plugin放在plugins数组中通过new 关键字创建。
4. 书写方式不同。

​		loader编写伪代码如下

```js
/**
 * 定义一个loader
 * 1.不可为一个箭头函数，Webpack运行时需要指定运行this为Webpack，所以可以调用内置api
 * 2.可以异步返回使用this.callback
 * 3.配置的options可以使用this.query获取
 * @param source 模块文件源数据内容
 * @return {*}
 */
module.exports = function (source) {

  // 如果 loader 配置了 options 对象，那么this.query将指向 options
  const options = this.query;

  const doTask = async (source) => {
    //伪代码进行数据转换
    const content = await source2Something(source,options)
    /*
    * this.callback 参数：
    * error：Error | null，当 loader 出错时向外抛出一个 error
    * content：String | Buffer，经过 loader 编译后需要导出的内容
    * sourceMap：为方便调试生成的编译后内容的 source map
    * ast：本次编译生成的 AST 静态语法树，之后执行的 loader 可以直接使用这个 AST，进而省去重复生成 AST 的过程
    */
    this.callback(null, content)
  }

  //异步返回结果
  doTask()
  //同步返回
  return source2Something(source,options)
}
```

​		plugin编写伪代码如下

```js
/**
 * 定义一个plugin
 * 1.需要通过new创建可以使用class创建
 * 2.内部需要有一个方法apply调用运行插件功能
 * 
 * 具体可以看
 * https://webpack.docschina.org/contribute/writing-a-plugin/#basic-plugin-architecture
 */

class MyPlugin {
  //创建时可以传入参数
  constructor(options) {
    this.options = options;
  }

  /**
   * 通过compiler获取 webpack 内部的钩子，获取 webpack 打包过程中的各个阶段
   * 钩子分为同步和异步的钩子，异步钩子必须执行对应的回调
   * @param compiler
   */
  apply(compiler){
    //同步hook 最后调用tap
    //emit为hook事件名称
    compiler.hooks.emit.tap('MyPlugin',compilation=>{

      //do somethings
      //do somethings
      //do somethings

    })
    //异步hook 最后调用tapAsync、tapPromise
    //done为hook事件名称
    //tapAsync 异步钩子必须执行对应的回调
    //tapPromise 需要返回Promise
    compiler.hooks.done.tapAsync('MyPlugin', (compilation, callback) => {
      console.log("打包已完成");

      //do somethings
      //do somethings
      //do somethings

      callback();
    })
  }

}
```

# 2.webpack构建流程

![image-20231013103843304](https://raw.githubusercontent.com/GongYanYu/images/main/image-20231013103843304.png)

# 3.Webpack 代理Proxy 解决跨域原理？

## 1. 什么是跨域？

当网页请求非同源资源时便引起了跨域。

同源检测必须要是相同的协议、域名、端口的资源请求才不会引起跨域。

**特点：	**

- 跨域请求并非无法发送只是无法获取数据，浏览器拦截返回的数据；
- 除协议、域名、端口后面跟随的路径是可以任意的，不会引起跨域。
- 

## 2.为什么会有跨域？

防止网页请求非同源数据，避免一系列安全问题。



## 3.Webpack 代理Proxy 解决跨域原理





## 4.其他解决跨域方法？

- CORF：全称跨域资源共享，原理是将响应头`Access-Control-Allow-Origin`设置为*或目标域名，浏览器便可以通过此响应数据，分两种情况如下。
  - 简单请求：发起一个简单请求，只需要服务器将`Access-Control-Allow-Origin`设置为*或目标域名，便可以完成跨域请求。所以什么是简单请求？
    - 1.请求方式是` get/post/head`；
    - 2.请求头包含字段可以有：`Accept，Accept-Language，content-Language，Last-Event-ID，Content-Type`，其中Content-Type的值只能是` application/x-www-form-urlencoded，text/plain，multipart/form-data`。
    - 满足以上规则则是简单请求，否则为假。
  - 复杂请求：比简单请求要多一个预检请求（类型为options），根据服务器返回数据判断是否可以进行后续请求操作。预检请求判断请求方法是否被允许，请求头字段是否被允许，所以服务器不仅仅需要设置`Access-Control-Allow-Origin`还需要设置允许方法`Access-Control-Allow-Headers:PUT, POST, GET, DELETE, OPTIONS`  、允许请求头字段`Access-Control-Allow-Headers:Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild`
  - ps:对于复杂请求允许请求头字段可以不写只要是默认允许那几个字段即可。



- ngix或node等服务器开一个服务代理请求，浏览器将数据请求源换成代理服务器地址，浏览器发起请求数据，代理服务器再将请求地址换成真实地址再次发起请求获取数据，代理服务器通过CORF将数据转发给浏览器，因为服务器之间请求没有跨域限制。

- jsonp





# 参考

1. [「吐血整理」再来一打Webpack面试题 - 掘金 (juejin.cn)](https://juejin.cn/post/6844904094281236487)
2. [面试官：说说webpack proxy工作原理？为什么能解决跨域? | web前端面试 - 面试官系列 (vue3js.cn)](https://vue3js.cn/interview/webpack/proxy.html)



