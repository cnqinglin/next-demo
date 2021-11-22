import React from 'react';
import {getPost, getPostIds} from '../../lib/posts';
import {NextPage} from 'next';
import { type } from 'os';

type Props = {
  post: Post
}
type Post = {
    title: string;
    date: string;
    content: string;
}
const postsShow: NextPage<Props> = (props) => {
  const {post} = props;
  return (
    <div>
      <h1>{post}</h1>
          {/* <article>{ post.content }</article> */}
    </div>
  );
};

export default postsShow;

export const getStaticPaths = async () => {
  const idList = await getPostIds();
  return {
    paths: idList.map(id => ({params: {id: id}})),
    fallback: true
  };
};

export const getStaticProps = async (x: any) => {
  const id = x.params.id;
  const post = await getPost(id);
  return {
    props: {
      post: post
    }
  };
};