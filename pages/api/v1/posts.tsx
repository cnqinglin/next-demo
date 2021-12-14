import {NextApiHandler} from 'next';
import {Post} from '../../../src/entity/Post';
import {withSession} from '../../../lib/withSession';
import { getDatabaseConnection } from 'lib/getDataBaseConnection';


const Posts: NextApiHandler = withSession(async (req, res) => {
  if (req.method === 'POST') {
    console.log('1111111111');
    const {title, content} = req.body;
    console.log('22222222');
    const post = new Post();
    console.log('3333333333333333');
    post.title = title;
    console.log('4444444444444');
    post.content = content;
    console.log('55555555555555');
    const user = req.session.get('currentUser');
    console.log('user');
    console.log(user);
    post.author = user;
    const connection = await getDatabaseConnection();
    console.log('66666666666666666');
    await connection.manager.save(post);
    res.json(post);
  }
});
export default Posts;