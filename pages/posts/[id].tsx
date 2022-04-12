import React, { useCallback } from 'react';
import { getPost, getPostIds } from '../../lib/posts';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { Post } from 'src/entity/Post';
import { getDatabaseConnection } from 'lib/getDataBaseConnection';
import { marked } from 'marked';
import { withSession } from 'lib/withSession'
import { Comment } from 'src/entity/Comment';
import { log } from 'console';
import { Session} from 'next-iron-session'
declare module 'next' {
  interface NextApiRequest {
    session: Session
  }
}
type User = {
  id: number
}
type CommenProps = {
  id: number;
  content: string;
  createdAt: string | '';
  updatedAt: string | '';
}

type Props = {
  // id:string,
  // title: string;
  // date: string;
  // content: string;
  post: Post;
  currentUser: User | null;
  comments: CommenProps[];
}

const PostsShow: NextPage<Props> = (props) => {
  const { post, currentUser, comments } = props;
  const editBlog = useCallback(() => {
    window.location.href = `/posts/${post.id}/edit`
  }, [post.id])

  const commentBLog = useCallback(() => {
    window.location.href = `/comments/${post.id}/comment`
  }, [])

  return (
    <>
      <div className="markdown-body">
        <header>
          <h1 className="title">{post.title}</h1>
          {currentUser && <p><button className='btn' onClick={editBlog}>编辑</button></p>}
        </header>

        <article dangerouslySetInnerHTML={{ __html: marked(post.content) }}></article>
        {currentUser && <button className='btn' onClick={commentBLog}>评论</button>}

        {comments.map((item, index) => <div className='commentContent' key={index}>
          
          <div>{item.content}</div>
          
        </div>)}
        {/* <div>{currentUser}</div> */}


      </div>
      <style jsx>{`
          .markdown-body{
            box-sizing: border-box;
            min-width: 200px;
            max-width: 800px;
            margin: 16px auto;
            padding: 45px;
          }
          .title{
            margin: 0;
            margin-right: auto;
            text-align: center;
            padding-bottom: 16px;
          }
          .btn:hover {
            color: red;
          }
          .commentContent {
            line-height: 30px;
            font-size: 10px;
            vertical-align: middle;
            padding-bottom: 6px;
            padding-top: 6px;
            border-bottom: 1px solid rgba(10, 10, 20,0.5);
          }
        `}</style>
    </>
  );
};

export default PostsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }, any> = withSession(
  async (context: GetServerSidePropsContext) => {
    const connection = await getDatabaseConnection()  // 第一次连接不能用get
    const post = await connection.manager.findOne('Post', context.params.id);
    const currentUser = context.req.session.get('currentUser') || null;
    const comments = JSON.stringify(await connection.manager.find('Comment', { where: { post: context.params.id } }));
    debugger;
    const userId = JSON.stringify(await connection.manager.findOne('Comment',context.params.id));
    const id = userId;
    const userName = await connection.manager.findOne('User', id );
    return {
      props: {
        post: JSON.parse(JSON.stringify(post)),
        currentUser,
        comments: JSON.parse(comments),
        // username: JSON.parse(username),
      }
    }
  });




// export const getStaticPaths = async () => {
//   const idList = await getPostIds();
//   return {
//     paths: idList.map(id => ({params: {id: id}})),
//     fallback: true
//   };
// };

// export const getStaticProps = async (x: any) => {
//   const id = x.params.id;
//   const post = await getPost(id);
//   return {
//     props: {
//       post: post
//     }
//   };
// };