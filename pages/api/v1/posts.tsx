import {NextApiHandler} from 'next';
import {Post} from '../../../src/entity/Post';
import {withSession} from '../../../lib/withSession';
import { getDatabaseConnection } from 'lib/getDataBaseConnection';


const Posts: NextApiHandler = withSession(async (req, res) => {
  const connection = await getDatabaseConnection();

  if (req.method === 'POST') {
    const {title, content} = req.body;
    const post = new Post();
    post.title = title;
    post.content = content;
    const user = req.session.get('currentUser');
      if (!user) {
          res.statusCode = 401
          res.end()
          return;
      }
    post.author = user;
    await connection.manager.save(post);
    res.json(post);
  }
});
export default Posts