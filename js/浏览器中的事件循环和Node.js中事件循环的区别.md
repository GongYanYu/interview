
- https://developer.aliyun.com/article/1312240
**区别：**
- 在浏览器事件循环中，每执行完一个宏任务，便要检查并执行微任务队列；而node事件循环中则是在“上一阶段”执行完，“下一阶段”开始前执行微任务队列中的任务。也就是说，node中的微任务是在两个阶段之间执行的。如果是node10及其之前版本：要看第一个定时器执行完，第二个定时器是否在完成队列中。
- 在浏览器事件循环中，process.nextTick()属于微任务，而且和其他微任务的优先级是一样的，不存在哪个微任务的优先级高就先执行谁。但是在node中，process.nextTick()的优先级要高于其他微任务，也就是说，在两个阶段之间执行微任务时，若存在process.nextTick()，则先执行它，然后再执行其他微任务。
