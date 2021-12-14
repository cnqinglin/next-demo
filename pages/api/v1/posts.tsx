import { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import getPosts from "../../../lib/posts"
const Posts:NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const posts = await getPosts()
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json,charset=utf-8');
    res.write(JSON.stringify(posts));
    res.end()
}

export default Posts