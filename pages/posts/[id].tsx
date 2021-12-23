import React, { useCallback } from 'react';
import { getPost, getPostIds } from '../../lib/posts';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { type } from 'os';
import { Post } from 'src/entity/Post';
import { json } from 'stream/consumers';
import { getDatabaseConnection } from 'lib/getDataBaseConnection';
import { marked } from 'marked';
import { withSession } from 'lib/withSession'

type User = {
  id:number
}
type Props = {
  // id:string,
  // title: string;
  // date: string;
  // content: string;
  post: Post,
  currentUser:User | null
}

const PostsShow: NextPage<Props> = (props) => {
  const { post,currentUser } = props
  const editBlog = useCallback(() => {
    window.location.href = `/posts/${post.id}/edit`
  }, [])

  return (
    <>
      <div className="markdown-body">
        <header>
          <h1 className="title">{post.title}</h1>
          {currentUser && <p><button onClick={editBlog}>编辑</button></p>}
        </header>
        
        <article dangerouslySetInnerHTML={{ __html: marked(post.content) }}></article>
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
        `}</style>
    </>
  );
};

export default PostsShow;

export const getServerSideProps: GetServerSideProps<any, { id: string }, any> = withSession(async (context:GetServerSidePropsContext) => {
  const connection = await getDatabaseConnection()  // 第一次连接不能用get
  const post = await connection.manager.findOne('Post', context.params.id);
  const currentUser = context.req.session.get('currentUser') || null;
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
      currentUser
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