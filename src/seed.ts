import "reflect-metadata";
import {createConnection} from "typeorm";
import { Post } from "./entity/Post";

createConnection().then(async connection => {
    const Posts = await connection.manager.find(Post)
  if (Posts.length === 0) {
    
    await connection.manager.save([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
      return new Post({title:`title${item}`,content:`这是我的弟${item}数据库`})
    }))
    // 这是第一种也是常规写法
    // p.id = 123;
    // p.title = "qinglin";
    // p.content = "我的数据库"
    
    // 这种第二种写法，对应Posts.ts 中的public写法
    // await connection.manager.save([
    //   new Post(this, { 'qinglin0', '我的数据库0'}),
    //   new Post('qinglin1', '我的数据库1'),
    //   new Post('qinglin2', '我的数据库2'),
    //   new Post('qinglin3', '我的数据库3'),
    // ]);
  } else {
    
  }
  connection.close()
}).catch(error => console.log(error));