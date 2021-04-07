# TodoMVC

## Introduciton

This project is used for ByteDance front end interview. Web end is finished with React using state、hooks as well as Redux (actually not done with Redux) and local storage. Server end is implemented with Node.js and MongoDB.



## Start Project

1. Download the repository,`git clone https://github.com/ustc-q/todoMVC.git`

then you can find two folds—— todoServer and todoMVC. The former is the server end,  the latter is the web end.

2. Install dependencies，`cd todoMVC && npm i`. It's the same with todoServer.

3. Start the project. If you are in todoMVC, use `npm start`;  if you are in todoServer, use `node server.js`.

An easier way to start project is to open README.md in todoMVC, click http://localhost:3000.

As you see, it's running below.

<img src="C:\Users\zjq\AppData\Roaming\Typora\typora-user-images\image-20210407161130203.png" alt="image-20210407161130203" style="zoom:50%;" />





## todoWeb

This part implements todoMVC in three ways——state、hooks and Redux, and store data in local storage. Notice that only state implements all function, including adding, modifying, deleting, while hooks and Redux don't. And neither of these three ways implements user management except basic register and login operation.





## todoSever

This part fulfills register and login funcitons, and store User and TodoList data in mongoDB. Notice that without using Express or Koa, router has to be dealt with by separating url and parameter. And mongoose is used to make operations on mongodb more convenient. 



## API

API is mainly designed for dealing with todoList, not user, so there are only` '/register' and '/login' `for dealing with user operation. As for modifying password or others, it can be added later. Below are for todoList.

| 描述         | url     | method | params                               |
| ------------ | ------- | ------ | ------------------------------------ |
| 添加         | '/todo' | post   | 用户标识                             |
| 切换完成状态 | '/todo' | patch  | 用户标识，listItem识，完成状态       |
| 修改内容     | '/todo' | put    | 用户标识，listItem标识，listItem内容 |
| 删除         | '/todo' | delete | 用户标识，listItem标识               |

The data in response is formatted below：

```
{
   msg: '',
   code: ‘’,
   data: []
}
```

`msg` shows information of whether the operation succeeds or fails; `code` shows success or failure's code——1 represents success and 0 represent failure; `data`is the returned data after the operation.



## Deficiencies and Prospects

1. At first, storing data in the local storage is not finished when todoMVC is implemented with using Redux. Because of time constraints, storing data in the database is not finished when todoMVC is implemented with Hooks. And collecting data to evaluate the performance is not completed, which I hope will be done later.

2. Bugs that have been found and have not been solved still exist. The most significant one is that data will be lost if you refresh on the Todo path after you login the system. It can be solved using cache, which I hope will be improved.
3. RESTful API is not used because I don't understand the idea behind it, so I had to use the traditional API. Ant the design of API is my own idea, not necessarily following the design principles. Wish it can be replaced with RESTful API later.

翻译：

1. 首先，没有完全实现需求，Redux没有实现前端本地存储，由于时间关系，Hooks没有完成将数据存储到数据库，没有收集数据评估性能，后面可以跟进完成。
2. 已经发现且尚未解决的bug不少，最显著的就是登录后在Todo路径上刷新会丢失数据，可以使用缓存，待完善。
3. 因为不了解其设计思想，没有使用`RESTful API`，只好用传统的，这次API的设计也是自己想的，不一定遵循设计原则，后面可以使用`RESTful API`替换。



## Acknowledgement

At first, ByteDance is appreciated for giving me the chance to do this project,  from which I know basic principles behind React and know how to use mongodb. And my design and logical ability get improved somehow.  What's more, my teachers and calssmates and friends will be thanked, who has instructed me, helped me through troubles. Withou you, I wouldn't be who I am now. Finally, I feel grateful to my family, who have always been supporting me, trusting me, and protecting me from unnecessary trivia. But this time I lost one of you. I will miss you, grandpa. May you be happy in heaven.