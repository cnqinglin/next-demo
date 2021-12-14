import { getDatabaseConnection } from "lib/getDataBaseConnection"
import { withSession } from "lib/withSession"
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { Post } from "src/entity/Post"
const Posts: NextApiHandler = withSession(async (req, res) => {
    // markdown 形式获取文章列表
    // const posts = await getPosts()
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json,charset=utf-8');
    // res.write(JSON.stringify(posts));
    // res.end()

    // 获取数据库中的信息
    if (req.method === 'POST') {
        const user = req.session.get('currentUser');
        console.log('11111111111-1',user);
        const posts = new Post()
        const connection = await getDatabaseConnection()
        posts.author = user;
        connection.manager.save(posts)
        console.log('11111111111');
        res.json(posts)
        console.log('11111111111-2');
    }
});

export default Posts