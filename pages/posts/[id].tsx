import React from 'react';
import {getPost, getPostIds} from '../../lib/posts';
import {GetServerSideProps, NextPage} from 'next';
import { type } from 'os';
import { Post } from 'src/entity/Post';
import { json } from 'stream/consumers';
import { getDatabaseConnection } from 'lib/getDataBaseConnection';
import { marked } from 'marked';


type Props = {
  // id:string,
  // title: string;
  // date: string;
  // content: string;
  post:Post
}

const postsShow: NextPage<Props> = (props) => {
  const { post } = props
  return (
    <>
    <div className="markdown-body">
      <h1 className="title">{post.title}</h1>
      <article dangerouslySetInnerHTML={{__html:marked(post.content)}}></article>
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
        margin: 0 auto;
        text-align: center;
        padding-bottom: 16px;
      }
        `}</style>
      </>
  );
};

export default postsShow;

export const getServerSideProps: GetServerSideProps<any, {id:string},any> = async (context) => {
  const connection = await getDatabaseConnection()  // 第一次连接不能用get
  const post = await connection.manager.findOne(Post,context.params.id)
  return {
    props: {
      post:JSON.parse(JSON.stringify(post))
    }
  }
}




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