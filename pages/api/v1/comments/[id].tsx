import { log } from "console";
import { getDatabaseConnection } from "lib/getDataBaseConnection";
import { NextApiHandler } from "next";
import { withSession } from '../../../../lib/withSession';
import {Comment} from '../../../../src/entity/Comment';



const Comments: NextApiHandler = withSession(async (req, res) => {
  const connection = await getDatabaseConnection();

  if (req.method === 'POST') {
    const {
      id,
      content,
      title,
      commentContent,
    } = req.body;
    const comment = new Comment();
    comment.content = commentContent;
    comment.id = id;
    comment.post = id;
    const user = req.session.get('currentUser');
    if (!user) {
      res.statusCode = 401
      res.end()
      return;
    }
    comment.user = user.id;
    const result = await connection.manager.save(comment);
    let resp = { comment }
    res.json(resp);
  }
});
export default Comments