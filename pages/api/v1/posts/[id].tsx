import { getDatabaseConnection } from "lib/getDataBaseConnection";
import { withSession } from "lib/withSession";
import { NextApiHandler } from "next";


const Posts: NextApiHandler = withSession(async (req, res) => {
  const connection = await getDatabaseConnection();
  if (req.method === 'PATCH') {
    const { title, content, id } = req.body
    const post = await connection.manager.findOne('Post', id)
    post.title = title;
    post.content = content;
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401;
      res.end();
      return;
    }
    await connection.manager.save(post);
    res.json(post);
  } else if (req.method === 'DELETE') {
    const id = req.query.id.toString();
    const result = await connection.manager.delete('Post', id);
    console.log('result', result);
    res.statusCode = result.affected >= 0 ? 200 : 400;
    res.end();
  }
});
export default Posts